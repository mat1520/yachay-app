'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  useEffect(() => {
    const handleCallback = async () => {
      console.log('🔄 Callback Page - Code:', code)
      console.log('🔄 Callback Page - Error:', error)

      if (error) {
        console.error('❌ OAuth Error:', error)
        toast.error(`Error de autenticación: ${error}`)
        router.push('/login')
        return
      }

      if (code) {
        try {
          const supabase = createClient()
          console.log('🔄 Exchanging code for session...')
          
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
          
          if (exchangeError) {
            console.error('❌ Exchange Error:', exchangeError.message)
            toast.error(`Error de intercambio: ${exchangeError.message}`)
            router.push('/login')
            return
          }

          if (data?.user) {
            console.log('✅ User authenticated:', data.user.email)
            toast.success(`¡Bienvenido ${data.user.email}!`)
            router.push('/dashboard')
          } else {
            console.error('❌ No user data received')
            toast.error('No se recibieron datos del usuario')
            router.push('/login')
          }
        } catch (error) {
          console.error('❌ Callback error:', error)
          toast.error('Error inesperado en callback')
          router.push('/login')
        }
      } else {
        console.log('❌ No code provided')
        router.push('/login')
      }
    }

    handleCallback()
  }, [code, error, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-sm text-muted-foreground">
          Procesando autenticación...
        </p>
      </div>
    </div>
  )
}
