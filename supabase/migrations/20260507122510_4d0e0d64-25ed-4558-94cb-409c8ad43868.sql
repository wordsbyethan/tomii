-- Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can read deposits" ON public.deposits;
DROP POLICY IF EXISTS "Anyone can submit deposit" ON public.deposits;

-- Only admins can read deposits
CREATE POLICY "Admins read deposits"
ON public.deposits
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Customers (anon or authenticated) can submit a deposit, but only with safe defaults
CREATE POLICY "Public can submit pending deposit"
ON public.deposits
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND received_at IS NULL
  AND reference IS NOT NULL
  AND length(reference) BETWEEN 4 AND 64
  AND amount >= 0
  AND amount <= 10000000
);
