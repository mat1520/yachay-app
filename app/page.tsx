import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Calculator, Calendar, TrendingUp, Sparkles, Zap, Target } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header moderno */}
      <header className="nav-modern">
        <div className="container-modern">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center space-x-2 group" href="/">
              <div className="relative">
                <GraduationCap className="h-8 w-8 text-gradient-primary transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
              </div>
              <span className="font-bold text-2xl text-gradient-primary">Yachay</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" asChild className="hover:bg-primary/10">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity">
                <Link href="/login">Comenzar Gratis</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section con animaciones modernas */}
      <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary opacity-20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary opacity-20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-cool opacity-10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="container-modern relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-primary">Plataforma Académica del Futuro</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                El poder de tu{' '}
                <span className="text-gradient-primary animate-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
                  conocimiento
                </span>
                <br />
                en tus manos
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Dashboard académico inteligente para estudiantes universitarios en Ecuador. 
                Organiza materias, calcula promedios ponderados en tiempo real y nunca pierdas 
                una fecha importante.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" className="btn-modern bg-gradient-primary text-white shadow-lg hover-glow">
                <Link href="/login" className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Comenzar Ahora</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="glass hover-lift">
                <Link href="#features">Descubrir Más</Link>
              </Button>
            </div>
            
            {/* Stats modernos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-3xl">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gradient-primary">99%</div>
                <div className="text-sm text-muted-foreground">Precisión en cálculos</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gradient-secondary">24/7</div>
                <div className="text-sm text-muted-foreground">Disponibilidad</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gradient-cool">0s</div>
                <div className="text-sm text-muted-foreground">Tiempo de configuración</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section renovado */}
      <section id="features" className="py-20 md:py-32 relative">
        <div className="container-modern">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              Características{' '}
              <span className="text-gradient-secondary">Innovadoras</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para dominar tu vida académica en una sola plataforma
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-modern hover-lift group">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Cálculo Inteligente</CardTitle>
                <CardDescription>
                  Promedios ponderados automáticos con proyecciones en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sistema avanzado que calcula y proyecta tu nota final basado en el peso 
                  de cada evaluación. Nunca más calcules manualmente.
                </p>
              </CardContent>
            </Card>

            <Card className="card-modern hover-lift group">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Gestión de Fechas</CardTitle>
                <CardDescription>
                  Control total de deadlines y fechas importantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Organiza fechas de entrega, exámenes y proyectos. Recibe notificaciones 
                  inteligentes para nunca perder una fecha crucial.
                </p>
              </CardContent>
            </Card>

            <Card className="card-modern hover-lift group">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-cool flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Analytics Académicos</CardTitle>
                <CardDescription>
                  Visualiza tu progreso con gráficos y estadísticas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dashboards interactivos que muestran tu rendimiento académico, 
                  tendencias y áreas de mejora con visualizaciones modernas.
                </p>
              </CardContent>
            </Card>

            <Card className="card-modern hover-lift group">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Metas Inteligentes</CardTitle>
                <CardDescription>
                  Establece y rastrea objetivos académicos automáticamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Define metas de notas y recibe recomendaciones personalizadas 
                  sobre qué necesitas para alcanzar tus objetivos.
                </p>
              </CardContent>
            </Card>

            <Card className="card-modern hover-lift group">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-danger flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Interfaz Moderna</CardTitle>
                <CardDescription>
                  Diseño innovador y experiencia de usuario excepcional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Interfaz intuitiva con animaciones fluidas, tema oscuro/claro 
                  y diseño responsive que se adapta a todos tus dispositivos.
                </p>
              </CardContent>
            </Card>

            <Card className="card-modern hover-lift group">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Especializado Ecuador</CardTitle>
                <CardDescription>
                  Adaptado al sistema educativo universitario ecuatoriano
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configurado específicamente para universidades de Ecuador, 
                  con escalas de calificación y sistemas de créditos locales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10">
        <div className="container-modern text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              ¿Listo para{' '}
              <span className="text-gradient-primary">revolucionar</span>
              <br />
              tu vida académica?
            </h2>
            <p className="text-lg text-muted-foreground">
              Únete a miles de estudiantes que ya están dominando sus estudios con Yachay
            </p>
            <Button asChild size="lg" className="btn-modern bg-gradient-primary text-white shadow-xl hover-glow">
              <Link href="/login" className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Comenzar Gratis Ahora</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer moderno */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container-modern py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-gradient-primary">Yachay</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Yachay App. Transformando la educación universitaria en Ecuador.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

