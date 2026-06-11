-- Row Level Security (RLS) policies for AI Trip Schedule App
-- Run this in the Supabase SQL editor after creating tables (or include with init script).

-- Protect `schedules` so users can only operate on their own rows
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Select own schedules"
  ON public.schedules
  FOR SELECT
  USING (auth.uid()::uuid = user_id);

CREATE POLICY "Insert own schedules"
  ON public.schedules
  FOR INSERT
  WITH CHECK (auth.uid()::uuid = user_id);

CREATE POLICY "Update own schedules"
  ON public.schedules
  FOR UPDATE
  USING (auth.uid()::uuid = user_id)
  WITH CHECK (auth.uid()::uuid = user_id);

CREATE POLICY "Delete own schedules"
  ON public.schedules
  FOR DELETE
  USING (auth.uid()::uuid = user_id);

-- Protect `users` so users can only access their own profile
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own profile"
  ON public.users
  FOR ALL
  USING (auth.uid()::uuid = id)
  WITH CHECK (auth.uid()::uuid = id);

-- Public resources: allow anonymous SELECT for presets, hotels, travel news
ALTER TABLE public.preset_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read preset_schedules"
  ON public.preset_schedules
  FOR SELECT
  USING (true);

ALTER TABLE public.travel_news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read travel_news"
  ON public.travel_news
  FOR SELECT
  USING (true);

ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hotels"
  ON public.hotels
  FOR SELECT
  USING (true);

-- Forum posts: public read, authenticated users may insert; owners can update/delete
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read forum_posts"
  ON public.forum_posts
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated insert forum_posts"
  ON public.forum_posts
  FOR INSERT
  WITH CHECK (auth.uid()::uuid = user_id);

CREATE POLICY "Update own forum_posts"
  ON public.forum_posts
  FOR UPDATE
  USING (auth.uid()::uuid = user_id)
  WITH CHECK (auth.uid()::uuid = user_id);

CREATE POLICY "Delete own forum_posts"
  ON public.forum_posts
  FOR DELETE
  USING (auth.uid()::uuid = user_id);

-- Note: The Supabase `service_role` key bypasses RLS. Keep service role keys server-side only.

-- End of policies.sql
