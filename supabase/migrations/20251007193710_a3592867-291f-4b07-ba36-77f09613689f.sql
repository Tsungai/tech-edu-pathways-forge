-- Drop and recreate RLS policies to restrict teacher access to their assigned subjects

-- Drop existing policies for enrollments
DROP POLICY IF EXISTS "Teachers and admins can view enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can delete enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can insert enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can update enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Students can view their enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Students can view their own enrollment" ON public.enrollments;

-- Recreate enrollment policies with proper restrictions
CREATE POLICY "Students can view their own enrollment"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view enrollments for their assigned subjects"
  ON public.enrollments FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin') OR
    EXISTS (
      SELECT 1 FROM public.teacher_assignments ta
      JOIN public.subjects s ON ta.subject_id = s.id
      WHERE ta.teacher_id = auth.uid()
      AND s.program_id = enrollments.program_id
    )
  );

CREATE POLICY "Admins can insert enrollments"
  ON public.enrollments FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update enrollments"
  ON public.enrollments FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete enrollments"
  ON public.enrollments FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Drop and recreate submission policies
DROP POLICY IF EXISTS "Students can view their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Students can create their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Students can update their own submissions" ON public.submissions;

CREATE POLICY "Students can view their own submissions"
  ON public.submissions FOR SELECT
  USING (
    auth.uid() = student_id OR
    public.has_role(auth.uid(), 'admin') OR
    (public.has_role(auth.uid(), 'teacher') AND EXISTS (
      SELECT 1 FROM public.tasks t
      JOIN public.weeks w ON t.week_id = w.id
      JOIN public.teacher_assignments ta ON w.subject_id = ta.subject_id
      WHERE t.id = submissions.task_id
      AND ta.teacher_id = auth.uid()
    )) OR
    (public.has_role(auth.uid(), 'teacher') AND EXISTS (
      SELECT 1 FROM public.capstones c
      JOIN public.weeks w ON c.week_id = w.id
      JOIN public.teacher_assignments ta ON w.subject_id = ta.subject_id
      WHERE c.id = submissions.capstone_id
      AND ta.teacher_id = auth.uid()
    ))
  );

CREATE POLICY "Students can create their own submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own submissions"
  ON public.submissions FOR UPDATE
  USING (auth.uid() = student_id);

-- Drop and recreate grades policies
DROP POLICY IF EXISTS "Students and teachers can view grades" ON public.grades;
DROP POLICY IF EXISTS "Teachers can manage grades" ON public.grades;
DROP POLICY IF EXISTS "Teachers can manage grades for their subjects" ON public.grades;

CREATE POLICY "Students and teachers can view grades"
  ON public.grades FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin') OR
    EXISTS (
      SELECT 1 FROM public.submissions
      WHERE submissions.id = grades.submission_id
      AND submissions.student_id = auth.uid()
    ) OR
    (public.has_role(auth.uid(), 'teacher') AND EXISTS (
      SELECT 1 FROM public.submissions s
      JOIN public.tasks t ON s.task_id = t.id
      JOIN public.weeks w ON t.week_id = w.id
      JOIN public.teacher_assignments ta ON w.subject_id = ta.subject_id
      WHERE s.id = grades.submission_id
      AND ta.teacher_id = auth.uid()
    )) OR
    (public.has_role(auth.uid(), 'teacher') AND EXISTS (
      SELECT 1 FROM public.submissions s
      JOIN public.capstones c ON s.capstone_id = c.id
      JOIN public.weeks w ON c.week_id = w.id
      JOIN public.teacher_assignments ta ON w.subject_id = ta.subject_id
      WHERE s.id = grades.submission_id
      AND ta.teacher_id = auth.uid()
    ))
  );

CREATE POLICY "Teachers can manage grades for their subjects"
  ON public.grades FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') OR
    (public.has_role(auth.uid(), 'teacher') AND EXISTS (
      SELECT 1 FROM public.submissions s
      JOIN public.tasks t ON s.task_id = t.id
      JOIN public.weeks w ON t.week_id = w.id
      JOIN public.teacher_assignments ta ON w.subject_id = ta.subject_id
      WHERE s.id = grades.submission_id
      AND ta.teacher_id = auth.uid()
    )) OR
    (public.has_role(auth.uid(), 'teacher') AND EXISTS (
      SELECT 1 FROM public.submissions s
      JOIN public.capstones c ON s.capstone_id = c.id
      JOIN public.weeks w ON c.week_id = w.id
      JOIN public.teacher_assignments ta ON w.subject_id = ta.subject_id
      WHERE s.id = grades.submission_id
      AND ta.teacher_id = auth.uid()
    ))
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR
    (public.has_role(auth.uid(), 'teacher') AND EXISTS (
      SELECT 1 FROM public.submissions s
      JOIN public.tasks t ON s.task_id = t.id
      JOIN public.weeks w ON t.week_id = w.id
      JOIN public.teacher_assignments ta ON w.subject_id = ta.subject_id
      WHERE s.id = grades.submission_id
      AND ta.teacher_id = auth.uid()
    )) OR
    (public.has_role(auth.uid(), 'teacher') AND EXISTS (
      SELECT 1 FROM public.submissions s
      JOIN public.capstones c ON s.capstone_id = c.id
      JOIN public.weeks w ON c.week_id = w.id
      JOIN public.teacher_assignments ta ON w.subject_id = ta.subject_id
      WHERE s.id = grades.submission_id
      AND ta.teacher_id = auth.uid()
    ))
  );