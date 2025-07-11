import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import { AssignmentsList } from '@/components/subject/assignments-list'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function SubjectAssignmentsPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get subject details
  const { data: subject, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('id', parseInt(id))
    .eq('user_id', user.id)
    .single()

  if (error || !subject) {
    notFound()
  }

  // Get assignments from database
  const { data: assignments, error: assignmentsError } = await supabase
    .from('assignments')
    .select('*')
    .eq('subject_id', parseInt(id))
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (assignmentsError) {
    console.error('Error fetching assignments:', assignmentsError)
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/subjects/${subject.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a {subject.name}
          </Link>
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div 
                className="w-4 h-8 rounded"
                style={{ backgroundColor: subject.color }}
              />
              Asignaciones - {subject.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestiona las tareas, exámenes y proyectos de esta materia
            </p>
          </div>
          <Button asChild>
            <Link href={`/subjects/${subject.id}/assignments/create`}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Asignación
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Asignaciones</CardTitle>
          <CardDescription>
            Todas las evaluaciones y tareas de {subject.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssignmentsList 
            subjectId={subject.id}
            assignments={assignments || []}
          />
        </CardContent>
      </Card>
    </div>
  )
}
