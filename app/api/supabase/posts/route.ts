import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createPost, getPosts, getPostsByUser } from '@/lib/supabase/database'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    const searchParams = req.nextUrl.searchParams
    const userOnly = searchParams.get('user') === 'true'
    
    if (userOnly && userId) {
      const posts = await getPostsByUser(userId, true)
      return NextResponse.json(posts)
    }
    
    const posts = await getPosts(true)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await req.json()
    const { title, content, published = false } = body
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }
    
    const post = await createPost({
      title,
      content,
      published,
      user_id: userId,
    }, true)
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 })
  }
}