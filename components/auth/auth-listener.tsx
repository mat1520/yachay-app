'use client'

import { useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export function AuthListener({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const hasShownWelcome = useRef(false)
  const lastAuthEvent = useRef<string | null>(null)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state change:', event, 'pathname:', pathname)
      
      // Evitar procesar el mismo evento múltiples veces
      if (lastAuthEvent.current === event) {
        console.log('⏭️ Skipping duplicate event:', event)
        return
      }
      lastAuthEvent.current = event
      
      // Solo mostrar bienvenida en login exitoso inicial
      if (event === 'SIGNED_IN' && session && !hasShownWelcome.current) {
        // Solo mostrar bienvenida si viene de login o callback
        if (pathname === '/login' || pathname.startsWith('/auth/callback')) {
          console.log('✅ User signed in:', session.user.email)
          toast.success(`¡Bienvenido de vuelta!`)
          hasShownWelcome.current = true
          router.push('/dashboard')
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out')
        hasShownWelcome.current = false
        lastAuthEvent.current = null
        router.push('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase.auth, pathname])

  return <>{children}</>
}
