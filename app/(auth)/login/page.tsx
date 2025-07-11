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
            <div className="relative">
              <Image 
                src="/Yachay_Logo.png" 
                alt="Yachay Logo" 
                width={48} 
                height={48} 
                className="transition-transform group-hover:scale-110 group-hover:rotate-3 rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-primary opacity-10 blur-2xl group-hover:opacity-30 transition-opacity" />
            </div>
            <span className="font-bold text-2xl text-hologram group-hover:text-glow transition-all">Yachay</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            El poder de tu conocimiento, en tus manos
          </p>
        </div>

        {/* Login Card moderno */}
        <Card className="card-modern hover-lift neon-border bg-card/90 border-white/20 backdrop-blur-md shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-6">
            <CardTitle className="text-3xl font-bold text-white">Bienvenido</CardTitle>
            <CardDescription className="text-gray-200 text-base">
              Inicia sesión para acceder a tu dashboard académico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <LoginForm />
          </CardContent>
        </Card>

        {/* Footer moderno */}
        <div className="text-center text-xs text-muted-foreground">
          Creado con ❤️ por{' '}
          <a 
            href="https://github.com/mat1520" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:underline text-primary hover:text-glow transition-all"
          >
            mat1520
          </a>
        </div>
      </div>
    </div>
  )
}
