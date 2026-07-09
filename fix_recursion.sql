-- Drop problematic policies
DROP POLICY IF EXISTS "Super Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can view all logs" ON public.activity_logs;

-- Replace get_my_role with plpgsql to prevent inlining and recursion
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

-- Recreate policies
CREATE POLICY "Super Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        public.get_my_role() IN ('Super Admin', 'Administrator')
    );

CREATE POLICY "Super Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (
        public.get_my_role() IN ('Super Admin', 'Administrator')
    );

CREATE POLICY "Super Admins can view all logs" ON public.activity_logs
    FOR SELECT USING (
        public.get_my_role() = 'Super Admin'
    );
