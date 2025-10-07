-- Create prospective_users table for form submissions
CREATE TABLE public.prospective_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  course_interest TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  converted_to_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  converted_at TIMESTAMP WITH TIME ZONE
);

-- Add first login tracking to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_login_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT;

-- Enable RLS on prospective_users
ALTER TABLE public.prospective_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prospective_users
CREATE POLICY "Admins and student_admins can view prospective users"
ON public.prospective_users FOR SELECT
USING (
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'student_admin')
);

CREATE POLICY "Anyone can insert prospective users"
ON public.prospective_users FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins and student_admins can update prospective users"
ON public.prospective_users FOR UPDATE
USING (
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'student_admin')
);