'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Github, Mail } from 'lucide-react'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [showEmailLogin, setShowEmailLogin] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) {
        toast.error('Error al iniciar sesión con Google. Verifica la configuración OAuth.')
        console.error('Error:', error)
      }
    } catch (error) {
      toast.error('Error inesperado')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) {
        toast.error('Error al iniciar sesión con GitHub. Verifica la configuración OAuth.')
        console.error('Error:', error)
      }
    } catch (error) {
      toast.error('Error inesperado')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) {
        toast.error('Error al enviar el enlace de acceso')
        console.error('Error:', error)
      } else {
        toast.success('¡Revisa tu email! Te hemos enviado un enlace para iniciar sesión.')
      }
    } catch (error) {
      toast.error('Error inesperado')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {!showEmailLogin ? (
        <>
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 transition-colors duration-200 font-medium text-base"
            type="button"
          >
            <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </Button>

          <Button
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 transition-colors duration-200 font-medium text-base"
            type="button"
          >
            <Github className="h-5 w-5 mr-3" />
            Continuar con GitHub
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-gray-400 font-normal">
                O continúa con
              </span>
            </div>
          </div>

          <Button
            onClick={() => setShowEmailLogin(true)}
            variant="outline"
            className="w-full h-12 border-white/20 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 font-medium text-base"
            type="button"
          >
            <Mail className="h-5 w-5 mr-3" />
            Usar enlace por email
          </Button>
        </>
      ) : (
        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 bg-background/50 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40 focus:ring-0 transition-colors"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-12 bg-white text-black hover:bg-gray-100 transition-colors font-medium text-base"
          >
            {isLoading ? 'Enviando...' : 'Enviar enlace de acceso'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowEmailLogin(false)}
            className="w-full h-10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            ← Volver a opciones OAuth
          </Button>
        </form>
      )}

      <div className="text-center text-xs text-gray-500 pt-3">
        Al continuar, aceptas nuestros términos de servicio y política de privacidad.
      </div>
    </div>
  )
}
