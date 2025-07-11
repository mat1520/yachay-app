import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CreateAssignmentForm } from '@/components/subject/create-assignment-form'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function CreateAssignmentPage({ params }: Props) {
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

  return (
    <div className="container mx-auto py-6 px-4 max-w-2xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/subjects/${subject.id}/assignments`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Asignaciones
          </Link>
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold">Nueva Asignación</h1>
          <p className="text-muted-foreground mt-2">
            Crea una nueva evaluación para {subject.name}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Asignación</CardTitle>
          <CardDescription>
            Completa la información de la nueva evaluación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateAssignmentForm subjectId={subject.id} />
        </CardContent>
      </Card>
    </div>
  )
}
