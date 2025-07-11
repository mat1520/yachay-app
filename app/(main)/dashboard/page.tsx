import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UpcomingDeadlines } from '@/components/dashboard/upcoming-deadlines'
import { SubjectsOverview } from '@/components/dashboard/subjects-overview'
import { GraduationCap, BookOpen, Calendar, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get dashboard stats
  const [
    { count: totalSubjects },
    { count: totalSemesters },
    { data: upcomingDeadlines },
    { data: recentSubjects }
  ] = await Promise.all([
    supabase
      .from('subjects')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id),
    
    supabase
      .from('semesters')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id),
    
    supabase
      .from('assignments')
      .select(`
        id,
        name,
        due_date,
        subject_id,
        subjects!inner(name)
      `)
      .eq('subjects.user_id', user.id)
      .not('due_date', 'is', null)
      .gte('due_date', new Date().toISOString().split('T')[0])
      .order('due_date', { ascending: true })
      .limit(5),
    
    supabase
      .from('subjects')
      .select(`
        id,
        name,
        professor,
        credits,
        color,
        created_at,
        semesters!inner(name)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(6)
  ])

  return (
    <div className="container-modern py-8 space-y-8">
      {/* Header con gradiente */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido de vuelta,{' '}
            <span className="text-gradient-primary">Estudiante</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Tu centro de comando académico. Visualiza tu progreso, gestiona tus materias 
            y mantén el control total de tu vida universitaria.
          </p>
        </div>
      </div>
      
      {/* Stats Cards modernos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-modern hover-lift group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Materias
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient-primary">{totalSubjects || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Materias activas
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-modern hover-lift group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Semestres
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient-secondary">{totalSemesters || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Semestres registrados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximas Entregas
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingDeadlines?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              En los próximos días
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Promedio General
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">
              Próximamente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Próximas Entregas</CardTitle>
            <CardDescription>
              Tus tareas y exámenes más próximos
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <UpcomingDeadlines deadlines={upcomingDeadlines || []} />
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Materias Recientes</CardTitle>
            <CardDescription>
              Materias agregadas recientemente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubjectsOverview subjects={recentSubjects || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
