import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { EditSemesterForm } from '@/components/semester/edit-semester-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditSemesterPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get semester details
  const { data: semester, error } = await supabase
    .from('semesters')
    .select('*')
    .eq('id', parseInt(id))
    .eq('user_id', user.id)
    .single()

  if (error || !semester) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/semesters/${semester.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a {semester.name}
          </Link>
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold">Editar Semestre</h1>
          <p className="text-muted-foreground mt-2">
            Modifica la información de {semester.name}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Semestre</CardTitle>
          <CardDescription>
            Actualiza los detalles de tu semestre académico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditSemesterForm semester={{
            ...semester,
            is_active: (semester as any).is_active ?? false
          }} />
        </CardContent>
      </Card>
    </div>
  )
}
