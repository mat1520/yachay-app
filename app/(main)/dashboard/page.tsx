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
    <div className="min-h-screen space-y-6">
      {/* Hero Header más compacto */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/70 via-purple-900/20 to-slate-900/70 p-6 border border-gray-800/30">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-cyan-600/5" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/70 to-blue-600/70 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Dashboard
              </h1>
              <p className="text-gray-400 text-sm">Tu centro de comando académico</p>
            </div>
          </div>
          <p className="text-gray-400 max-w-2xl text-sm">
            Gestiona tu vida universitaria de manera eficiente. Visualiza tu progreso y organiza tus materias.
          </p>
        </div>
      </div>
      
      {/* Stats Cards más compactos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60 hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Materias
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/60 to-purple-600/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400/80 to-blue-400/80 bg-clip-text text-transparent">
              {totalSubjects || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Materias activas
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60 hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-400">
              Semestres
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/60 to-cyan-500/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400/80 to-cyan-400/80 bg-clip-text text-transparent">
              {totalSemesters || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Semestres registrados
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60 hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-400">
              Próximas Entregas
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/60 to-emerald-500/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400/80 to-emerald-400/80 bg-clip-text text-transparent">
              {upcomingDeadlines?.length || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              En los próximos días
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60 hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-400">
              Promedio General
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/60 to-red-500/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400/80 to-red-400/80 bg-clip-text text-transparent">
              --
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Próximamente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content más compacto */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
          <CardHeader className="border-b border-gray-800/30 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500/70 to-blue-500/70 flex items-center justify-center">
                <Calendar className="h-3 w-3 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-base">Próximas Entregas</CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  Tus tareas y exámenes más próximos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <UpcomingDeadlines deadlines={upcomingDeadlines || []} />
          </CardContent>
        </Card>
        
        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
          <CardHeader className="border-b border-gray-800/30 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500/70 to-cyan-500/70 flex items-center justify-center">
                <BookOpen className="h-3 w-3 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-base">Materias Recientes</CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  Materias agregadas recientemente
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <SubjectsOverview subjects={(recentSubjects || []).map(subject => ({
              ...subject,
              created_at: subject.created_at || new Date().toISOString()
            }))} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions más pequeños */}
      <div className="grid gap-3 md:grid-cols-3">
        <Link href="/subjects">
          <Card className="border-gray-800/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1 text-sm">Gestionar Materias</h3>
              <p className="text-xs text-gray-400">Administra todas tus materias</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/semesters">
          <Card className="border-gray-800/50 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1 text-sm">Organizar Semestres</h3>
              <p className="text-xs text-gray-400">Planifica tu carrera académica</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-gray-800/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1 text-sm">Ver Estadísticas</h3>
            <p className="text-xs text-gray-400">Analiza tu rendimiento</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
