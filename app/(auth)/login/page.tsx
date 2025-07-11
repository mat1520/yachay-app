import { LoginForm } from '@/components/auth/login-form-alternative'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingParticles } from '@/components/ui/floating-particles'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden px-4">
      {/* Partículas flotantes */}
      <FloatingParticles />
      
      {/* Grid futurista de fondo */}
      <div className="fixed inset-0 futuristic-grid opacity-20 pointer-events-none" />
      
      {/* Burbujas flotantes */}
      <div className="floating-bubbles pointer-events-none">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary opacity-10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-cool opacity-5 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo moderno */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center space-x-3 group">
            <Image 
              src="/Yachay_Logo.png" 
              alt="Yachay Logo" 
              width={48} 
              height={48} 
              className="transition-transform group-hover:scale-105 rounded-lg"
            />
            <span className="font-bold text-2xl text-white group-hover:text-gray-200 transition-colors">Yachay</span>
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            El poder de tu conocimiento, en tus manos
          </p>
        </div>

        {/* Login Card limpio */}
        <Card className="bg-card/80 border-white/10 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center space-y-3 pb-6">
            <CardTitle className="text-2xl font-bold text-white">Bienvenido</CardTitle>
            <CardDescription className="text-gray-300">
              Inicia sesión para acceder a tu dashboard académico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <LoginForm />
          </CardContent>
        </Card>

        {/* Footer simple */}
        <div className="text-center text-xs text-gray-500">
          Creado con ❤️ por{' '}
          <a 
            href="https://github.com/mat1520" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline text-gray-400 hover:text-white transition-colors"
          >
            mat1520
          </a>
        </div>
      </div>
    </div>
  )
}
