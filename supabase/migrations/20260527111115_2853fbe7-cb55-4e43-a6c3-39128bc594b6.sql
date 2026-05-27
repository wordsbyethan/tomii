CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

UPDATE storage.buckets SET public = false WHERE id = 'deposit-proofs';

DROP POLICY IF EXISTS "Public read proofs" ON storage.objects;
DROP POLICY IF EXISTS "Anyone upload proof" ON storage.objects;

CREATE POLICY "Admins read proofs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'deposit-proofs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public upload proof restricted"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'deposit-proofs'
  AND lower(storage.extension(name)) IN ('jpg','jpeg','png','webp','heic','heif')
  AND length(name) BETWEEN 5 AND 200
  AND (metadata->>'size') IS NOT NULL
  AND (metadata->>'size')::bigint <= 10485760
);

CREATE POLICY "Block non-admin role inserts"
ON public.user_roles AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));