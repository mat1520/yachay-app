import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  console.log('🔄 Auth Callback - URL:', requestUrl.toString())
  console.log('🔑 Auth Callback - Code:', code)
  console.log('➡️ Auth Callback - Next:', next)

  if (code) {
    try {
      const cookieStore = await cookies()
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            },
          },
        }
      )
      
      console.log('🔄 Exchanging code for session...')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('❌ Auth error:', error.message)
        return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`)
      }

      if (data?.user) {
        console.log('✅ User authenticated:', data.user.email)
        const redirectUrl = `${requestUrl.origin}${next}`
        console.log('➡️ Redirecting to:', redirectUrl)
        return NextResponse.redirect(redirectUrl)
      } else {
        console.error('❌ No user data received')
        return NextResponse.redirect(`${requestUrl.origin}/login?error=no_user_data`)
      }
    } catch (error) {
      console.error('❌ Callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=callback_error`)
    }
  }

  console.log('❌ No code provided')
  return NextResponse.redirect(`${requestUrl.origin}/login?error=no_code`)
}
