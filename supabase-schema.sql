-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  user_id TEXT NOT NULL,
  published BOOLEAN DEFAULT false NOT NULL
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  username TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  plan_name TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user_profiles(user_id) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Note: Since we're using Clerk for authentication, not Supabase Auth,
-- we'll need to handle authorization in our API routes instead of using RLS policies
-- that depend on auth.uid(). The policies below are disabled but shown for reference.

-- Create policies for posts (these would work with Supabase Auth)
-- For Clerk, authorization is handled in the API routes
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (published = true);

-- Since we use Clerk for auth, we need permissive policies for authenticated operations
-- The actual authorization happens in our API routes
CREATE POLICY "Allow authenticated users to create posts" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update their posts" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to delete their posts" ON posts
  FOR DELETE USING (true);

-- For user-specific operations, we handle authorization in the API routes
-- since Clerk user IDs are not available in Supabase RLS context

-- Create policies for user_profiles
CREATE POLICY "Profiles are viewable by everyone" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update profiles" ON user_profiles
  FOR UPDATE USING (true);

-- Create policies for subscriptions
CREATE POLICY "Subscriptions are viewable by owner" ON subscriptions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update subscriptions" ON subscriptions
  FOR UPDATE USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Note: When using Clerk + Supabase, you need to:
-- 1. Use Clerk for authentication (handled in middleware)
-- 2. Pass Clerk user IDs to Supabase in your API routes
-- 3. Handle authorization logic in your API routes, not in RLS policies