import Li    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
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
      </div>ink'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingParticles } from '@/components/ui/floating-particles'
import { GraduationCap, Calculator, Calendar, TrendingUp, Sparkles, Zap, Target, Star, Rocket, Brain } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Partículas flotantes */}
      <FloatingParticles />
      
      {/* Grid futurista de fondo */}
      <div className="fixed inset-0 futuristic-grid opacity-30 pointer-events-none" />
      
      {/* Burbujas flotantes */}
      <div className="floating-bubbles pointer-events-none">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      
      {/* Header moderno con efectos */}
      <header className="nav-modern relative z-50">
        <div className="container-modern">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center space-x-3 group" href="/">
              <div className="relative">
                <Image 
                  src="/Yachay_Logo.png" 
                  alt="Yachay Logo" 
                  width={56} 
                  height={56} 
                  className="transition-transform group-hover:scale-110 group-hover:rotate-3 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity animate-pulse" />
                <div className="absolute -inset-2 bg-gradient-primary opacity-10 blur-2xl group-hover:opacity-30 transition-opacity" />
              </div>
              <span className="font-bold text-2xl text-hologram group-hover:text-glow transition-all">Yachay</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" asChild className="hover:bg-primary/10 card-hover-effect">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity neon-border">
                <Link href="/login">Comenzar Gratis</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 lg:py-40 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950" />
        
        <div className="container-modern relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm">
                <Star className="w-5 h-5 mr-2 text-white" />
                <span className="text-sm font-medium text-white">Plataforma Académica del Futuro</span>
                <Rocket className="w-5 h-5 ml-2 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                El poder de tu{' '}
                <span className="text-blue-400">
                  conocimiento
                </span>
                <br />
                <span className="text-cyan-400">en tus manos</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Dashboard académico inteligente para estudiantes universitarios en Ecuador. 
                Organiza materias, calcula promedios ponderados en tiempo real y nunca pierdas 
                una fecha importante.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button asChild size="lg" className="btn-modern bg-gradient-primary text-white shadow-lg hover-glow neon-border card-hover-effect">
                <Link href="/login" className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 animate-pulse" />
                  <span>Comenzar Ahora</span>
                  <Brain className="w-5 h-5 animate-bounce" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="glass hover-lift card-hover-effect">
                <Link href="#features">Descubrir Más</Link>
              </Button>
            </div>
            
            {/* Stats modernos mejorados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-3xl">
              <div className="text-center space-y-2 card-hover-effect">
                <div className="text-4xl font-bold text-hologram animate-pulse">99%</div>
                <div className="text-sm text-muted-foreground">Precisión en cálculos</div>
              </div>
              <div className="text-center space-y-2 card-hover-effect">
                <div className="text-4xl font-bold text-hologram animate-pulse" style={{animationDelay: '0.5s'}}>24/7</div>
                <div className="text-sm text-muted-foreground">Disponibilidad</div>
              </div>
              <div className="text-center space-y-2 card-hover-effect">
                <div className="text-4xl font-bold text-hologram animate-pulse" style={{animationDelay: '1s'}}>0s</div>
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
            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Cálculo Inteligente</CardTitle>
                <CardDescription className="text-gray-400">
                  Promedios ponderados automáticos con proyecciones en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Sistema avanzado que calcula y proyecta tu nota final basado en el peso 
                  de cada evaluación. Nunca más calcules manualmente.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Gestión de Fechas</CardTitle>
                <CardDescription className="text-gray-400">
                  Control total de deadlines y fechas importantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Organiza fechas de entrega, exámenes y proyectos. Recibe notificaciones 
                  inteligentes para nunca perder una fecha crucial.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-600 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Analytics Académicos</CardTitle>
                <CardDescription className="text-gray-400">
                  Visualiza tu progreso con gráficos y estadísticas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Dashboards interactivos que muestran tu rendimiento académico, 
                  tendencias y áreas de mejora con visualizaciones modernas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-orange-600 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Metas Inteligentes</CardTitle>
                <CardDescription className="text-gray-400">
                  Establece y rastrea objetivos académicos automáticamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Define metas de notas y recibe recomendaciones personalizadas 
                  sobre qué necesitas para alcanzar tus objetivos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Interfaz Moderna</CardTitle>
                <CardDescription className="text-gray-400">
                  Diseño innovador y experiencia de usuario excepcional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Interfaz intuitiva con animaciones fluidas, tema oscuro/claro 
                  y diseño responsive que se adapta a todos tus dispositivos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Especializado Ecuador</CardTitle>
                <CardDescription className="text-gray-400">
                  Adaptado al sistema educativo universitario ecuatoriano
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Configurado específicamente para universidades de Ecuador, 
                  con escalas de calificación y sistemas de créditos locales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950" />
        
        <div className="container-modern text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              ¿Listo para{' '}
              <span className="text-blue-400">revolucionar</span>
              <br />
              <span className="text-cyan-400">tu vida académica?</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Únete a miles de estudiantes que ya están dominando sus estudios con Yachay
            </p>
            
            <div className="relative inline-block">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl relative z-10">
                <Link href="/login" className="flex items-center space-x-3">
                  <Zap className="w-6 h-6" />
                  <span className="text-lg font-semibold">Comenzar Gratis Ahora</span>
                  <Star className="w-6 h-6" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 flex justify-center items-center space-x-2 opacity-80">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold border-2 border-gray-900">
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400 ml-4">+1,000 estudiantes ya disfrutan Yachay</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 relative overflow-hidden">
        <div className="container-modern py-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Image 
                src="/Yachay_Logo.png" 
                alt="Yachay Logo" 
                width={40} 
                height={40} 
                className="rounded-lg"
              />
              <span className="font-bold text-xl text-white">Yachay</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 Yachay App. Transformando la educación universitaria en Ecuador.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

