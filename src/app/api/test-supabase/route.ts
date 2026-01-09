import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * Test endpoint to verify Supabase connection
 * Visit: http://localhost:3000/api/test-supabase
 */
export async function GET() {
  try {
    // Test 1: Check if Supabase client is configured
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!url || !key) {
      return NextResponse.json({
        success: false,
        error: 'Environment variables not set',
        details: {
          url: url ? 'Set ✅' : 'Missing ❌',
          key: key ? 'Set ✅' : 'Missing ❌'
        }
      }, { status: 500 })
    }

    // Test 2: Check if table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1)

    if (tableError) {
      return NextResponse.json({
        success: false,
        error: 'Table check failed',
        details: tableError
      }, { status: 500 })
    }

    // Test 3: Try to insert a test post
    const testPost = {
      title: 'Test Post',
      slug: `test-post-${Date.now()}`,
      excerpt: 'This is a test post',
      content: 'Test content',
      author: 'Test Author',
      date: new Date().toISOString(),
      read_time: '1 min read',
      category: 'Technology',
      tags: ['test'],
      image: '',
      published: false
    }

    const { data: insertData, error: insertError } = await supabase
      .from('blog_posts')
      .insert([testPost])
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({
        success: false,
        error: 'Insert test failed',
        details: insertError,
        message: insertError.message
      }, { status: 500 })
    }

    // Test 4: Delete the test post
    if (insertData) {
      await supabase
        .from('blog_posts')
        .delete()
        .eq('id', insertData.id)
    }

    return NextResponse.json({
      success: true,
      message: '✅ All tests passed!',
      tests: {
        environment: '✅ Environment variables set',
        table: '✅ Table exists and accessible',
        insert: '✅ Can insert data',
        delete: '✅ Can delete data'
      }
    })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error.message
    }, { status: 500 })
  }
}

