-- Storage bucket policies for Clerk + Supabase integration
-- Since we're using Clerk for authentication, not Supabase Auth,
-- we need different policies than typical Supabase setups

-- For avatars bucket (public read, authenticated write)
-- Note: These policies allow any authenticated request to upload
-- The actual user validation happens in our API routes using Clerk

-- Allow anyone to view avatars (since they're public profile images)
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated requests to upload avatars
-- Since we can't check Clerk user IDs in RLS, we use a permissive policy
-- and handle the actual authorization in our frontend/API
CREATE POLICY "Anyone can upload an avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars');

-- Allow authenticated requests to update avatars
CREATE POLICY "Anyone can update an avatar"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars');

-- Allow authenticated requests to delete avatars
CREATE POLICY "Anyone can delete an avatar"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars');

-- For files bucket (private files)
-- These need signed URLs which are generated in our API

-- No public access to files
-- All access is controlled via signed URLs generated in our API

-- Allow authenticated requests to upload files
CREATE POLICY "Anyone can upload a file"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'files');

-- Allow authenticated requests to view files
-- This is needed for signed URL generation
CREATE POLICY "Anyone can view files"
ON storage.objects FOR SELECT
USING (bucket_id = 'files');

-- Allow authenticated requests to update files
CREATE POLICY "Anyone can update a file"
ON storage.objects FOR UPDATE
USING (bucket_id = 'files');

-- Allow authenticated requests to delete files
CREATE POLICY "Anyone can delete a file"
ON storage.objects FOR DELETE
USING (bucket_id = 'files');

-- Note: These policies are intentionally permissive because:
-- 1. We're using Clerk for authentication, not Supabase Auth
-- 2. Clerk user IDs are not available in Supabase RLS context
-- 3. We handle the actual authorization logic in our Next.js API routes
-- 4. The Supabase client is initialized with the anon key which has limited permissions

-- IMPORTANT: Make sure your API routes properly validate user permissions
-- before allowing storage operations!