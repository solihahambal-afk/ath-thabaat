-- Add updated_at column if it's missing (this might be why the trigger failed)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop the existing trigger and function just in case
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the updated function to assign Super Admin to the first user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_count INT;
  assigned_role TEXT;
  assigned_status TEXT;
BEGIN
  -- Check how many users exist in the profiles table
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  
  -- If this is the first user, make them Super Admin and Active
  IF user_count = 0 THEN
    assigned_role := 'Super Admin';
    assigned_status := 'Active';
  ELSE
    assigned_role := 'Pending User';
    assigned_status := 'Pending';
  END IF;

  INSERT INTO public.profiles (id, email, first_name, last_name, full_name, username, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    CONCAT(NEW.raw_user_meta_data->>'first_name', ' ', NEW.raw_user_meta_data->>'last_name'),
    NEW.raw_user_meta_data->>'username',
    assigned_role,
    assigned_status
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix the first user to be Super Admin
DO $$
DECLARE
  first_user_id UUID;
BEGIN
  -- Find the first created user
  SELECT id INTO first_user_id FROM public.profiles ORDER BY created_at ASC LIMIT 1;
  
  -- If found, update them to Super Admin and Active
  IF first_user_id IS NOT NULL THEN
    UPDATE public.profiles 
    SET role = 'Super Admin', status = 'Active', updated_at = NOW()
    WHERE id = first_user_id;
  END IF;
END $$;
