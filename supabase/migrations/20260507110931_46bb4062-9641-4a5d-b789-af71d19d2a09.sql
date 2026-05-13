
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Deposits
CREATE TABLE public.deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE,
  service TEXT,
  category TEXT,
  amount INTEGER NOT NULL DEFAULT 0,
  customer_name TEXT,
  customer_phone TEXT,
  payment_method TEXT NOT NULL DEFAULT 'transfer',
  proof_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  received_at TIMESTAMPTZ
);

ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous) can submit a deposit record
CREATE POLICY "Anyone can submit deposit" ON public.deposits
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Anyone can look up a deposit by knowing its reference (used for status check)
CREATE POLICY "Anyone can read deposits" ON public.deposits
  FOR SELECT TO anon, authenticated USING (true);

-- Only admins can update (mark received)
CREATE POLICY "Admins update deposits" ON public.deposits
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete deposits" ON public.deposits
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER deposits_touch BEFORE UPDATE ON public.deposits
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Storage bucket for proofs
INSERT INTO storage.buckets (id, name, public) VALUES ('deposit-proofs', 'deposit-proofs', true);

CREATE POLICY "Public read proofs" ON storage.objects
  FOR SELECT USING (bucket_id = 'deposit-proofs');

CREATE POLICY "Anyone upload proof" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'deposit-proofs');

CREATE POLICY "Admins manage proofs" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'deposit-proofs' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'deposit-proofs' AND public.has_role(auth.uid(), 'admin'));
