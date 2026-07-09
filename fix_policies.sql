-- Drop problematic policies
DROP POLICY IF EXISTS "Super Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can update all profiles" ON public.profiles;

-- Create a security definer function to get the current user's role
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Add policies using the new function
CREATE POLICY "Super Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        public.get_my_role() IN ('Super Admin', 'Administrator')
    );

CREATE POLICY "Super Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (
        public.get_my_role() IN ('Super Admin', 'Administrator')
    );

DROP POLICY IF EXISTS "Super Admins can view all logs" ON public.activity_logs;

CREATE POLICY "Super Admins can view all logs" ON public.activity_logs
    FOR SELECT USING (
        public.get_my_role() = 'Super Admin'
    );
