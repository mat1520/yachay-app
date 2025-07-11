import { LoginForm } from '@/components/auth/login-form-alternative'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center">
            <GraduationCap className="h-8 w-8 mr-2 text-primary" />
            <span className="font-bold text-2xl">Yachay App</span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            El poder de tu conocimiento, en tus manos
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bienvenido</CardTitle>
            <CardDescription>
              Inicia sesión para acceder a tu dashboard académico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          Creado con ❤️ por{' '}
          <a 
            href="https://github.com/mat1520" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:underline text-primary"
          >
            mat1520
          </a>
        </div>
      </div>
    </div>
  )
}
