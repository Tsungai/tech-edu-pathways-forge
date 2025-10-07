-- Add subject_id column to enrollments table to track which cohort the student is in
ALTER TABLE public.enrollments ADD COLUMN subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE;

-- Update the RLS policy for teachers viewing enrollments to include subject-based access
DROP POLICY IF EXISTS "Teachers can view enrollments for their assigned subjects" ON public.enrollments;

CREATE POLICY "Teachers can view enrollments for their assigned subjects"
ON public.enrollments
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  (EXISTS (
    SELECT 1 FROM teacher_assignments ta
    WHERE ta.teacher_id = auth.uid() 
    AND ta.subject_id = enrollments.subject_id
  )) OR
  (EXISTS (
    SELECT 1
    FROM teacher_assignments ta
    JOIN subjects s ON ta.subject_id = s.id
    WHERE ta.teacher_id = auth.uid()
    AND s.program_id = enrollments.program_id
  ))
);