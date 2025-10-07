-- Fix search_path for generate_enrollment_id function
CREATE OR REPLACE FUNCTION public.generate_enrollment_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id TEXT;
  id_exists BOOLEAN;
BEGIN
  LOOP
    new_id := 'TE' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    
    SELECT EXISTS(SELECT 1 FROM public.enrollments WHERE enrollment_id = new_id) INTO id_exists;
    
    IF NOT id_exists THEN
      RETURN new_id;
    END IF;
  END LOOP;
END;
$$;

-- Fix search_path for set_enrollment_id function
CREATE OR REPLACE FUNCTION public.set_enrollment_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.enrollment_id IS NULL OR NEW.enrollment_id = '' THEN
    NEW.enrollment_id := public.generate_enrollment_id();
  END IF;
  RETURN NEW;
END;
$$;