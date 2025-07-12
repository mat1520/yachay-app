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
    <div className="min-h-screen space-y-4">
      
      {/* Stats Cards ultracompactos */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-gray-800/30 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:scale-102 transition-all duration-200 group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/3 to-blue-600/3 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 relative z-10">
            <CardTitle className="text-xs font-medium text-gray-400">
              Materias
            </CardTitle>
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500/50 to-purple-600/50 flex items-center justify-center">
              <BookOpen className="h-3 w-3 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10 p-3 pt-0">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-400/70 to-blue-400/70 bg-clip-text text-transparent">
              {totalSubjects || 0}
            </div>
            <p className="text-[10px] text-gray-500">
              Activas
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-gray-800/30 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:scale-102 transition-all duration-200 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 to-cyan-600/3 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 relative z-10">
            <CardTitle className="text-xs font-medium text-gray-400">
              Semestres
            </CardTitle>
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500/50 to-cyan-500/50 flex items-center justify-center">
              <GraduationCap className="h-3 w-3 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10 p-3 pt-0">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400/70 to-cyan-400/70 bg-clip-text text-transparent">
              {totalSemesters || 0}
            </div>
            <p className="text-[10px] text-gray-500">
              Registrados
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-gray-800/30 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:scale-102 transition-all duration-200 group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/3 to-emerald-600/3 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 relative z-10">
            <CardTitle className="text-xs font-medium text-gray-400">
              Entregas
            </CardTitle>
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-500/50 to-emerald-500/50 flex items-center justify-center">
              <Calendar className="h-3 w-3 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10 p-3 pt-0">
            <div className="text-xl font-bold bg-gradient-to-r from-green-400/70 to-emerald-400/70 bg-clip-text text-transparent">
              {upcomingDeadlines?.length || 0}
            </div>
            <p className="text-[10px] text-gray-500">
              Próximas
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-gray-800/30 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:scale-102 transition-all duration-200 group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/3 to-red-600/3 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 relative z-10">
            <CardTitle className="text-xs font-medium text-gray-400">
              Promedio
            </CardTitle>
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500/50 to-red-500/50 flex items-center justify-center">
              <TrendingUp className="h-3 w-3 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10 p-3 pt-0">
            <div className="text-xl font-bold bg-gradient-to-r from-orange-400/70 to-red-400/70 bg-clip-text text-transparent">
              --
            </div>
            <p className="text-[10px] text-gray-500">
              Próximamente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content mejorado */}
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-gray-800/30 bg-gradient-to-br from-gray-900/40 to-gray-800/40 hover:from-gray-900/50 hover:to-gray-800/50 transition-all duration-300">
          <CardHeader className="border-b border-gray-800/20 pb-3 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/70 to-blue-500/70 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-base font-semibold">Próximas Entregas</CardTitle>
                  <CardDescription className="text-gray-400 text-xs">
                    Tareas y exámenes próximos
                  </CardDescription>
                </div>
              </div>
              <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-md">
                {upcomingDeadlines?.length || 0} pendientes
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {upcomingDeadlines && upcomingDeadlines.length > 0 ? (
              <UpcomingDeadlines deadlines={upcomingDeadlines} />
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-white font-medium mb-1">¡Perfecto!</h3>
                <p className="text-gray-400 text-sm">No tienes entregas próximas</p>
                <p className="text-gray-500 text-xs mt-1">Parece que tienes todo al día</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/40 to-gray-800/40 hover:from-gray-900/50 hover:to-gray-800/50 transition-all duration-300">
          <CardHeader className="border-b border-gray-800/20 pb-3 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/70 to-cyan-500/70 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-base font-semibold">Materias Recientes</CardTitle>
                  <CardDescription className="text-gray-400 text-xs">
                    Últimas agregadas
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {recentSubjects && recentSubjects.length > 0 ? (
              <SubjectsOverview subjects={recentSubjects.map(subject => ({
                ...subject,
                created_at: subject.created_at || new Date().toISOString()
              }))} />
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-white font-medium mb-1">No hay materias aún</h3>
                <p className="text-gray-400 text-sm mb-3">Comienza agregando tu primera materia</p>
                <Link href="/subjects">
                  <button className="bg-gradient-to-r from-purple-500/70 to-blue-500/70 hover:from-purple-600/70 hover:to-blue-600/70 text-white text-xs px-3 py-2 rounded-md transition-all duration-200 flex items-center gap-2 mx-auto">
                    <span>+</span>
                    Agregar Materia
                  </button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions ultracompactos */}
      <div className="grid gap-2 md:grid-cols-3">
        <Link href="/subjects">
          <Card className="border-gray-800/30 bg-gradient-to-br from-purple-900/10 to-blue-900/10 hover:scale-102 transition-all duration-200 cursor-pointer group">
            <CardContent className="p-3 text-center">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500/60 to-blue-500/60 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1 text-xs">Gestionar Materias</h3>
              <p className="text-[10px] text-gray-400">Administra tus materias</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/semesters">
          <Card className="border-gray-800/30 bg-gradient-to-br from-blue-900/10 to-cyan-900/10 hover:scale-102 transition-all duration-200 cursor-pointer group">
            <CardContent className="p-3 text-center">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500/60 to-cyan-500/60 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1 text-xs">Organizar Semestres</h3>
              <p className="text-[10px] text-gray-400">Planifica tu carrera</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-gray-800/30 bg-gradient-to-br from-green-900/10 to-emerald-900/10 hover:scale-102 transition-all duration-200 cursor-pointer group">
          <CardContent className="p-3 text-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-green-500/60 to-emerald-500/60 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1 text-xs">Ver Estadísticas</h3>
            <p className="text-[10px] text-gray-400">Analiza tu rendimiento</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
