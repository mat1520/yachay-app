import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Calculator, Calendar, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <GraduationCap className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold text-xl">Yachay App</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/login"
          >
            Iniciar Sesión
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                El poder de tu conocimiento,{' '}
                <span className="text-primary">en tus manos</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Un dashboard académico personal para estudiantes universitarios en Ecuador. 
                Organiza tus materias, calcula tus promedios ponderados en tiempo real y 
                gestiona tus fechas de entrega.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/login">Comenzar Gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <Calculator className="h-10 w-10 text-primary" />
                <CardTitle>Cálculo Automático</CardTitle>
                <CardDescription>
                  Calcula tus promedios ponderados automáticamente mientras ingresas tus notas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sistema inteligente que proyecta tu nota final basado en el peso de cada evaluación.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary" />
                <CardTitle>Gestión de Fechas</CardTitle>
                <CardDescription>
                  Nunca pierdas una fecha de entrega importante. Mantén todo organizado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dashboard con próximas entregas y alertas para que nunca te quedes atrás.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary" />
                <CardTitle>Análisis de Rendimiento</CardTitle>
                <CardDescription>
                  Visualiza tu progreso académico y identifica áreas de mejora.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Estadísticas detalladas por materia y semestre para optimizar tu rendimiento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 Yachay App. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Creado con ❤️ por{' '}
            <a 
              href="https://github.com/mat1520" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:underline text-primary"
            >
              mat1520
            </a>
          </p>
        </nav>
      </footer>
    </div>
  )
}
