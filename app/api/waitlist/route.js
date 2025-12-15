import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// ✅ Read environment variables (SERVER-SIDE ONLY)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

// 🚨 Hard fail at build time if missing (prevents silent bugs)
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing')
}

// ✅ Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ✅ POST /api/waitlist
export async function POST(req) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
