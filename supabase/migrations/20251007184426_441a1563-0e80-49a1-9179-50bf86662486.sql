-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('student', 'teacher', 'admin');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create programs table
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('evening', 'daytime')),
  duration_weeks INTEGER NOT NULL DEFAULT 20,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for programs
CREATE POLICY "Everyone can view programs"
  ON public.programs FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert programs"
  ON public.programs FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update programs"
  ON public.programs FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete programs"
  ON public.programs FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Insert default programs
INSERT INTO public.programs (name, type, description) VALUES
  ('Data Analytics', 'evening', '5-month evening program with 1-hour daily lectures'),
  ('Social Media Management for Marketers', 'evening', '5-month evening program with 1-hour daily lectures'),
  ('Full Stack Web Development (MERN)', 'evening', '5-month evening program with 1-hour daily lectures'),
  ('Digital Marketing & SEO', 'evening', '5-month evening program with 1-hour daily lectures'),
  ('Project Management (Agile & Scrum)', 'evening', '5-month evening program with 1-hour daily lectures'),
  ('Business Analysis & Process Improvement', 'evening', '5-month evening program with 1-hour daily lectures'),
  ('Intro to Tech', 'daytime', '5-month full-time program with 1-hour lecture + 8-hour support'),
  ('Software Engineering', 'daytime', '5-month full-time program with 1-hour lecture + 8-hour support'),
  ('Web Development for Marketers', 'daytime', '5-month full-time program with 1-hour lecture + 8-hour support'),
  ('IT Support', 'daytime', '5-month full-time program with 1-hour lecture + 8-hour support'),
  ('CodeStars', 'daytime', '5-month full-time program with 1-hour lecture + 8-hour support');