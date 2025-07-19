import { createClient } from './client'
import { createServerSupabaseClient } from './server'
import type { Database } from './types'

type Tables = Database['public']['Tables']
type Post = Tables['posts']['Row']
type PostInsert = Tables['posts']['Insert']
type PostUpdate = Tables['posts']['Update']
type UserProfile = Tables['user_profiles']['Row']
type UserProfileInsert = Tables['user_profiles']['Insert']
type UserProfileUpdate = Tables['user_profiles']['Update']

// Posts operations
export async function getPosts(isServer = false) {
  const supabase = isServer ? createServerSupabaseClient() : createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getPostsByUser(userId: string, isServer = false) {
  const supabase = isServer ? createServerSupabaseClient() : createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getPost(id: string, isServer = false) {
  const supabase = isServer ? createServerSupabaseClient() : createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function createPost(post: PostInsert, isServer = false) {
  const supabase = isServer ? createServerSupabaseClient() : createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updatePost(id: string, updates: PostUpdate, isServer = false) {
  const supabase = isServer ? createServerSupabaseClient() : createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deletePost(id: string, isServer = false) {
  const supabase = isServer ? createServerSupabaseClient() : createClient()
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// User profile operations
export async function getUserProfile(userId: string, isServer = false) {
  const supabase = isServer ? createServerSupabaseClient() : createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows found
  return data
}

export async function createUserProfile(profile: UserProfileInsert, isServer = false) {
  const supabase = isServer ? createServerSupabaseClient() : createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: UserProfileUpdate, isServer = false) {
  const supabase = isServer ? createServerSupabaseClient() : createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}