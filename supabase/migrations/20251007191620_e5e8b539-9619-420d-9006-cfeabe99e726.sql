-- Create weeks table for weekly content
CREATE TABLE public.weeks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  week_number INTEGER NOT NULL CHECK (week_number >= 1 AND week_number <= 20),
  title TEXT NOT NULL,
  objectives TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(subject_id, week_number)
);

ALTER TABLE public.weeks ENABLE ROW LEVEL SECURITY;

-- Create resources table for learning materials
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id UUID REFERENCES public.weeks(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('slides', 'pdf', 'video', 'link')),
  url TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id UUID REFERENCES public.weeks(id) ON DELETE CASCADE NOT NULL,
  day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 5),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT,
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(week_id, day_number)
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create capstones table
CREATE TABLE public.capstones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id UUID REFERENCES public.weeks(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT,
  requirements TEXT,
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(week_id)
);

ALTER TABLE public.capstones ENABLE ROW LEVEL SECURITY;

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  capstone_id UUID REFERENCES public.capstones(id) ON DELETE CASCADE,
  github_url TEXT NOT NULL,
  notes TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (
    (task_id IS NOT NULL AND capstone_id IS NULL) OR
    (task_id IS NULL AND capstone_id IS NOT NULL)
  )
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Create grades table
CREATE TABLE public.grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  score DECIMAL(5,2) CHECK (score >= 0 AND score <= 100),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'passed', 'failed', 'needs_revision')),
  feedback TEXT,
  graded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;

-- RLS Policies for weeks
CREATE POLICY "Everyone can view published weeks"
  ON public.weeks FOR SELECT
  USING (is_published = true OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers can insert weeks"
  ON public.weeks FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can update weeks"
  ON public.weeks FOR UPDATE
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can delete weeks"
  ON public.weeks FOR DELETE
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for resources
CREATE POLICY "Everyone can view resources of published weeks"
  ON public.resources FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.weeks 
      WHERE weeks.id = resources.week_id 
      AND (weeks.is_published = true OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
    )
  );

CREATE POLICY "Teachers can manage resources"
  ON public.resources FOR ALL
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for tasks
CREATE POLICY "Students can view tasks of published weeks"
  ON public.tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.weeks 
      WHERE weeks.id = tasks.week_id 
      AND (weeks.is_published = true OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
    )
  );

CREATE POLICY "Teachers can manage tasks"
  ON public.tasks FOR ALL
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for capstones
CREATE POLICY "Students can view capstones of published weeks"
  ON public.capstones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.weeks 
      WHERE weeks.id = capstones.week_id 
      AND (weeks.is_published = true OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
    )
  );

CREATE POLICY "Teachers can manage capstones"
  ON public.capstones FOR ALL
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for submissions
CREATE POLICY "Students can view their own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = student_id OR public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Students can create their own submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own submissions"
  ON public.submissions FOR UPDATE
  USING (auth.uid() = student_id);

-- RLS Policies for grades
CREATE POLICY "Students and teachers can view grades"
  ON public.grades FOR SELECT
  USING (
    public.has_role(auth.uid(), 'teacher') OR 
    public.has_role(auth.uid(), 'admin') OR
    EXISTS (
      SELECT 1 FROM public.submissions 
      WHERE submissions.id = grades.submission_id 
      AND submissions.student_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can manage grades"
  ON public.grades FOR ALL
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));