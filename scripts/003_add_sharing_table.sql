-- Create portfolio shares table for tracking shared portfolios
CREATE TABLE IF NOT EXISTS public.portfolio_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
  share_token TEXT NOT NULL UNIQUE,
  share_type TEXT NOT NULL DEFAULT 'public', -- public, link, email
  expires_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.portfolio_shares ENABLE ROW LEVEL SECURITY;

-- Shares RLS Policies
CREATE POLICY "shares_select_own" ON public.portfolio_shares FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE id = portfolio_id AND user_id = auth.uid())
);
CREATE POLICY "shares_insert_own" ON public.portfolio_shares FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.portfolios WHERE id = portfolio_id AND user_id = auth.uid())
);
CREATE POLICY "shares_update_own" ON public.portfolio_shares FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE id = portfolio_id AND user_id = auth.uid())
);
CREATE POLICY "shares_delete_own" ON public.portfolio_shares FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.portfolios WHERE id = portfolio_id AND user_id = auth.uid())
);
