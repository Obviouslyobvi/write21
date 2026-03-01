-- ===================================
-- Nonfiction Blueprint - Supabase Database Schema
-- Run this in Supabase SQL Editor to set up your database
-- ===================================

-- 1. User Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  is_paid BOOLEAN DEFAULT false,
  stripe_customer_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. User Progress (tracks task completion and writing content)
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day_number INTEGER NOT NULL,
  task_index INTEGER,  -- NULL means this row stores writing_content/notes for the day
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  writing_content TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, day_number, task_index)
);

-- 3. Email Leads (for users who submit email on landing page but haven't signed up)
CREATE TABLE IF NOT EXISTS email_leads (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'landing_page',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================================
-- Row Level Security (RLS)
-- ===================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_leads ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "users_read_own_profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (but NOT is_paid - that's set by webhook)
CREATE POLICY "users_update_own_profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can read/write their own progress
CREATE POLICY "users_own_progress_select"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users_own_progress_insert"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_progress_update"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "users_own_progress_delete"
  ON user_progress FOR DELETE
  USING (auth.uid() = user_id);

-- Email leads: anyone can insert (for the landing page form)
-- But only service role can read (for admin/webhook use)
CREATE POLICY "anyone_can_insert_leads"
  ON email_leads FOR INSERT
  WITH CHECK (true);

-- ===================================
-- Auto-create user profile on signup
-- ===================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ===================================
-- Indexes for performance
-- ===================================

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_day ON user_progress(user_id, day_number);
CREATE INDEX IF NOT EXISTS idx_user_profiles_paid ON user_profiles(is_paid);
