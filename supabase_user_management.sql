-- =================================================================================
-- SUPER ADMIN USER MANAGEMENT SQL SCRIPT
-- Run this script in the Supabase SQL Editor to apply the required setup
-- =================================================================================

-- 1. Ensure profiles table has the required fields
-- This is already done in the previous script but added here for completeness
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT,
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS username TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'Pending User',
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending',
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Ensure roles constraint is strictly enforced
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (
  role IN (
    'Super Admin', 
    'Administrator', 
    'Editor', 
    'Teacher / Instructor', 
    'Student', 
    'Parent', 
    'Pending User'
  )
);

-- Ensure status constraint is strictly enforced
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_status_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_status_check CHECK (
  status IN (
    'Active', 
    'Pending', 
    'Suspended'
  )
);

-- 3. Create indexes for efficient filtering and searching
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_full_name ON public.profiles(full_name);

-- 4. Enable RLS on profiles if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing recursive or problematic policies to prevent infinite recursion
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can view all logs" ON public.activity_logs;

-- 6. Create a Security Definer function to safely get the current user's role 
-- without causing infinite recursion in RLS policies.
-- MUST BE plpgsql TO PREVENT INLINING WHICH CAUSES RECURSION
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT role INTO v_role FROM public.profiles WHERE id = auth.uid();
  RETURN v_role;
END;
$$;

-- 7. Define production-ready RLS Policies

-- Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update their own profile details (excluding role and status)
CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policy: Super Admins and Administrators can view ALL profiles
CREATE POLICY "Super Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        public.get_my_role() IN ('Super Admin', 'Administrator')
    );

-- Policy: Only Super Admins can update ANY profile (including changing roles/status)
CREATE POLICY "Super Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (
        public.get_my_role() = 'Super Admin'
    );
    
-- Policy: Super Admins can view all logs
CREATE POLICY "Super Admins can view all logs" ON public.activity_logs
    FOR SELECT USING (
        public.get_my_role() = 'Super Admin'
    );

-- 8. Prevent privilege escalation via Trigger
-- Users shouldn't be able to change their own role or status unless they are Super Admin
CREATE OR REPLACE FUNCTION public.prevent_privilege_escalation()
RETURNS TRIGGER AS $$
BEGIN
    -- If the user modifying the record is not a Super Admin, they cannot change role or status
    IF public.get_my_role() != 'Super Admin' THEN
        -- If they try to change the role
        IF NEW.role IS DISTINCT FROM OLD.role THEN
            RAISE EXCEPTION 'You do not have permission to change roles.';
        END IF;
        
        -- If they try to change the status
        IF NEW.status IS DISTINCT FROM OLD.status THEN
            RAISE EXCEPTION 'You do not have permission to change account status.';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS ensure_no_privilege_escalation ON public.profiles;
CREATE TRIGGER ensure_no_privilege_escalation
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_privilege_escalation();

-- =================================================================================
-- DONE
-- =================================================================================
