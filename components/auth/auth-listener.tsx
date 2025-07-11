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
  const isInitialized = useRef(false)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state change:', event, 'pathname:', pathname)
      
      // Solo mostrar bienvenida en login real, no en navegación
      if (event === 'SIGNED_IN' && session && !hasShownWelcome.current && !isInitialized.current) {
        console.log('✅ User signed in:', session.user.email)
        toast.success(`¡Bienvenido de vuelta!`)
        hasShownWelcome.current = true
        
        // Solo redirigir si estamos en login o auth callback
        if (pathname === '/login' || pathname.startsWith('/auth/callback')) {
          router.push('/dashboard')
        }
        router.refresh()
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out')
        hasShownWelcome.current = false
        isInitialized.current = false
        router.push('/login')
        router.refresh()
      }
      
      // Marcar como inicializado después del primer evento
      if (!isInitialized.current) {
        isInitialized.current = true
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase.auth, pathname])

  return <>{children}</>
}
