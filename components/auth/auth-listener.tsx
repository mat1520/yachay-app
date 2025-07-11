'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export function AuthListener({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state change:', event)
      
      if (event === 'SIGNED_IN' && session) {
        console.log('✅ User signed in:', session.user.email)
        toast.success(`¡Bienvenido ${session.user.email}!`)
        router.push('/dashboard')
        router.refresh()
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out')
        router.push('/login')
        router.refresh()
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase.auth])

  return <>{children}</>
}
