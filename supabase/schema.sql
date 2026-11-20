-- ==============================================================
-- SCHEMA DO BANCO DE DADOS - RADAR DE CLIENTES (SUPABASE)
-- ==============================================================

-- 1. Tabela de Perfis de Usuários (Integrado com Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  credits_total INT DEFAULT 5,
  credits_used INT DEFAULT 0,
  plan TEXT DEFAULT 'free', -- 'free', 'pro', 'agency'
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem visualizar seu próprio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Tabela de Leads Salvos
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  google_place_id TEXT,
  name TEXT NOT NULL,
  niche TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  rating NUMERIC(2, 1),
  reviews_count INT DEFAULT 0,
  phone TEXT,
  opportunity_reason TEXT,
  suggested_message TEXT,
  status TEXT DEFAULT 'novo', -- 'novo', 'contatado', 'negociacao', 'fechado'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, google_place_id) -- Impede gasto duplo com a mesma empresa
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários têm acesso total aos seus próprios leads"
  ON public.leads FOR ALL
  USING (auth.uid() = user_id);

-- 3. Trigger para criar perfil automaticamente no cadastro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, credits_total, plan)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 5, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

