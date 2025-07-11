import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GradeCalculator } from '@/components/subject/grade-calculator'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit } from 'lucide-react'
import Link from 'next/link'

interface SubjectPageProps {
  params: {
    id: string
  }
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const subjectId = parseInt(params.id)
  
  if (isNaN(subjectId)) {
    notFound()
  }

  // Get subject details
  const { data: subject, error: subjectError } = await supabase
    .from('subjects')
    .select(`
      *,
      semesters!inner(name)
    `)
    .eq('id', subjectId)
    .eq('user_id', user.id)
    .single()

  if (subjectError || !subject) {
    notFound()
  }

  // Get grading items for this subject
  const { data: gradingItems } = await supabase
    .from('grading_items')
    .select('*')
    .eq('subject_id', subjectId)
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">{subject.name}</h2>
          <p className="text-muted-foreground">
            {subject.semesters.name} • {subject.credits} créditos
            {subject.professor && ` • Prof. ${subject.professor}`}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>

      {/* Subject Info Card */}
      <Card style={{ borderTopColor: subject.color, borderTopWidth: '4px' }}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Información de la Materia
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: subject.color }}
            />
          </CardTitle>
          <CardDescription>
            Detalles y configuración de la materia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Semestre</p>
              <p className="text-sm text-muted-foreground">{subject.semesters.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Créditos</p>
              <p className="text-sm text-muted-foreground">{subject.credits}</p>
            </div>
            {subject.professor && (
              <div>
                <p className="text-sm font-medium">Profesor</p>
                <p className="text-sm text-muted-foreground">{subject.professor}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Grade Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Notas</CardTitle>
          <CardDescription>
            Gestiona tus evaluaciones y calcula tu promedio ponderado en tiempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GradeCalculator 
            subjectId={subject.id}
            gradingItems={gradingItems || []}
          />
        </CardContent>
      </Card>
    </div>
  )
}
