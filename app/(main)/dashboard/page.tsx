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
    <div className="min-h-screen space-y-8">
      {/* Hero Header mejorado */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-8 md:p-12 border border-gray-800/50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-gray-300">Tu centro de comando académico</p>
            </div>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl">
            Gestiona tu vida universitaria de manera eficiente. 
            Visualiza tu progreso, organiza tus materias y mantente al día con todas tus actividades académicas.
          </p>
        </div>
      </div>
      
      {/* Stats Cards ultra modernos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Materias
            </CardTitle>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {totalSubjects || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Materias activas este semestre
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-400">
              Semestres
            </CardTitle>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {totalSemesters || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Semestres registrados
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-400">
              Próximas Entregas
            </CardTitle>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {upcomingDeadlines?.length || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              En los próximos días
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-105 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-400">
              Promedio General
            </CardTitle>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              --
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Próximamente disponible
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content mejorado */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-800">
          <CardHeader className="border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">Próximas Entregas</CardTitle>
                <CardDescription className="text-gray-400">
                  Tus tareas y exámenes más próximos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <UpcomingDeadlines deadlines={upcomingDeadlines || []} />
          </CardContent>
        </Card>
        
        <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-800">
          <CardHeader className="border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">Materias Recientes</CardTitle>
                <CardDescription className="text-gray-400">
                  Materias agregadas recientemente
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <SubjectsOverview subjects={(recentSubjects || []).map(subject => ({
              ...subject,
              created_at: subject.created_at || new Date().toISOString()
            }))} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/subjects">
          <Card className="border-gray-800/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Gestionar Materias</h3>
              <p className="text-sm text-gray-400">Administra todas tus materias</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/semesters">
          <Card className="border-gray-800/50 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Organizar Semestres</h3>
              <p className="text-sm text-gray-400">Planifica tu carrera académica</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-gray-800/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Ver Estadísticas</h3>
            <p className="text-sm text-gray-400">Analiza tu rendimiento</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
