-- Run this in your Supabase SQL Editor to fix the "Error fetching profile" infinite recursion.

-- 1. Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can view all logs" ON public.activity_logs;

-- 2. Create a secure function to get user roles without triggering RLS (SECURITY DEFINER bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM profiles WHERE id = user_id;
$$;

-- 3. Recreate Policies for Profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING ( auth.uid() = id );

CREATE POLICY "Super Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING ( public.get_user_role(auth.uid()) IN ('Super Admin', 'Administrator') );

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING ( auth.uid() = id );

CREATE POLICY "Super Admins can update all profiles" 
ON public.profiles FOR UPDATE 
USING ( public.get_user_role(auth.uid()) = 'Super Admin' );

-- 4. Recreate Policies for Activity Logs
CREATE POLICY "Super Admins can view all logs" 
ON public.activity_logs FOR SELECT 
USING ( public.get_user_role(auth.uid()) = 'Super Admin' );
