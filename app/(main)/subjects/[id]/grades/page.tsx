import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, TrendingUp, Target, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { GradeCalculator } from '@/components/subject/grade-calculator'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function SubjectGradesPage({ params }: Props) {
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

  // Mock grading items (hasta que se ejecute el SQL)
  const mockGradingItems = [
    {
      id: 1,
      name: 'Tareas',
      weight: 30,
      maxPoints: 100,
      earnedPoints: 85,
      isCompleted: true,
      dueDate: '2025-07-15'
    },
    {
      id: 2,
      name: 'Exámenes Parciales',
      weight: 40,
      maxPoints: 100,
      earnedPoints: undefined,
      isCompleted: false,
      dueDate: '2025-07-25'
    },
    {
      id: 3,
      name: 'Proyecto Final',
      weight: 30,
      maxPoints: 100,
      earnedPoints: undefined,
      isCompleted: false,
      dueDate: '2025-08-01'
    }
  ]

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
              Calificaciones - {subject.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitorea tu progreso y calcula tu nota final
            </p>
          </div>
        </div>
      </div>

      {/* Grade Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nota Actual</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">85.0%</div>
            <p className="text-xs text-muted-foreground">
              Basado en evaluaciones completadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30%</div>
            <p className="text-xs text-muted-foreground">
              Del total de evaluaciones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evaluaciones</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1/3</div>
            <p className="text-xs text-muted-foreground">
              completadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grade Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Calificaciones</CardTitle>
          <CardDescription>
            Gestiona tus notas y simula diferentes escenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GradeCalculator 
            subjectId={subject.id}
            gradingItems={mockGradingItems}
          />
        </CardContent>
      </Card>
    </div>
  )
}
