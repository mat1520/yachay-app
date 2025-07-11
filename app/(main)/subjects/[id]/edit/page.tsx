import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { EditSubjectForm } from '@/components/subjects/edit-subject-form'

interface Props {
  params: {
    id: string
  }
}

export default async function EditSubjectPage({ params }: Props) {
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
        id,
        name
      )
    `)
    .eq('id', parseInt(params.id))
    .eq('user_id', user.id)
    .single()

  if (error || !subject) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-2xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/subjects/${subject.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Detalles
          </Link>
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold">Editar Materia</h1>
          <p className="text-muted-foreground mt-2">
            Modifica la información de {subject.name}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de la Materia</CardTitle>
          <CardDescription>
            Actualiza los detalles de tu materia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditSubjectForm subject={subject} />
        </CardContent>
      </Card>
    </div>
  )
}
