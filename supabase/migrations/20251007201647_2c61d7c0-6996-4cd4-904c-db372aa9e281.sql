-- Allow student_admins to view and update student profiles
CREATE POLICY "Student admins can view student profiles"
ON public.profiles FOR SELECT
USING (
  has_role(auth.uid(), 'student_admin') OR 
  has_role(auth.uid(), 'admin') OR
  auth.uid() = id
);

CREATE POLICY "Student admins can update student profiles"
ON public.profiles FOR UPDATE
USING (
  has_role(auth.uid(), 'student_admin') OR 
  has_role(auth.uid(), 'admin') OR
  auth.uid() = id
);

-- Allow student_admins to view student roles
CREATE POLICY "Student admins can view student roles"
ON public.user_roles FOR SELECT
USING (
  has_role(auth.uid(), 'student_admin') OR
  has_role(auth.uid(), 'admin') OR
  auth.uid() = user_id
);