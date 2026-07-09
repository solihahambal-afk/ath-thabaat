ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('Super Admin', 'Administrator', 'Editor', 'Teacher / Instructor', 'Student', 'Parent', 'Pending User', 'Pending'));
