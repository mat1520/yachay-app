import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Calendar, Edit, Plus, Target, Users } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function SubjectDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get subject details
  const { data: subject, error } = await supabase
    .from('subjects')
    .select(`
      *,
      semesters (
        name,
        start_date,
        end_date
      )
    `)
    .eq('id', parseInt(id))
    .eq('user_id', user.id)
    .single()

  if (error || !subject) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/subjects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Materias
          </Link>
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div 
                className="w-4 h-8 rounded"
                style={{ backgroundColor: subject.color }}
              />
              {subject.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              {subject.semesters?.name || 'Semestre'} • {subject.credits} créditos
              {subject.professor && ` • Prof. ${subject.professor}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/subjects/${subject.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Editar Materia
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Créditos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subject.credits}</div>
            <p className="text-xs text-muted-foreground">
              créditos académicos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profesor</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {subject.professor || 'No asignado'}
            </div>
            <p className="text-xs text-muted-foreground">
              instructor de la materia
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">
              Activa
            </div>
            <p className="text-xs text-muted-foreground">
              materia en curso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Asignaciones y Tareas
            </CardTitle>
            <CardDescription>
              Gestiona exámenes, tareas y proyectos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Aquí podrás gestionar todas las asignaciones de esta materia, 
                llevar registro de calificaciones y calcular tu promedio.
              </p>
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/subjects/${subject.id}/assignments`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Ver Asignaciones
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/subjects/${subject.id}/assignments/create`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Calificaciones
            </CardTitle>
            <CardDescription>
              Seguimiento de notas y promedio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Registra y monitorea tus calificaciones para mantener 
                un seguimiento de tu rendimiento académico.
              </p>
              <Button asChild className="w-full">
                <Link href={`/subjects/${subject.id}/grades`}>
                  <Target className="h-4 w-4 mr-2" />
                  Ver Calificaciones
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
