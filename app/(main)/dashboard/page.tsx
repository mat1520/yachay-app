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
      {/* Hero Header ultracompacto */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/70 via-purple-900/15 to-slate-900/70 p-4 border border-gray-800/30">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-3" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/3 via-blue-600/3 to-cyan-600/3" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/60 to-blue-600/60 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Dashboard
              </h1>
              <p className="text-gray-400 text-xs">Tu centro académico</p>
            </div>
          </div>
        </div>
      </div>
      
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

      {/* Main Content ultracompacto */}
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-gray-800/30 bg-gradient-to-br from-gray-900/50 to-gray-800/50">
          <CardHeader className="border-b border-gray-800/20 pb-2 p-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-500/60 to-blue-500/60 flex items-center justify-center">
                <Calendar className="h-3 w-3 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-sm">Próximas Entregas</CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  Tareas y exámenes próximos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <UpcomingDeadlines deadlines={upcomingDeadlines || []} />
          </CardContent>
        </Card>
        
        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/50 to-gray-800/50">
          <CardHeader className="border-b border-gray-800/20 pb-2 p-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500/60 to-cyan-500/60 flex items-center justify-center">
                <BookOpen className="h-3 w-3 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-sm">Materias Recientes</CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  Materias agregadas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <SubjectsOverview subjects={(recentSubjects || []).map(subject => ({
              ...subject,
              created_at: subject.created_at || new Date().toISOString()
            }))} />
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
