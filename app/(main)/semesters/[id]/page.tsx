import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, BookOpen, Clock, Settings } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface Props {
  params: {
    id: string
  }
}

export default async function SemesterDetailPage({ params }: Props) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get semester details
  const { data: semester, error } = await supabase
    .from('semesters')
    .select('*')
    .eq('id', parseInt(params.id))
    .eq('user_id', user.id)
    .single()

  if (error || !semester) {
    notFound()
  }

  // Get subjects for this semester
  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .eq('semester_id', semester.id)
    .eq('user_id', user.id)

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/semesters">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Semestres
          </Link>
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{semester.name}</h1>
            <p className="text-muted-foreground mt-2">
              Detalles del semestre académico
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Gestionar Semestre
            </Button>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Semestre
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duración</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {semester.start_date && semester.end_date ? (
                <>
                  {formatDate(semester.start_date)}
                  <br />
                  <span className="text-sm text-muted-foreground">hasta</span>
                  <br />
                  {formatDate(semester.end_date)}
                </>
              ) : (
                'Fechas no definidas'
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materias</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              materias registradas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Materias del Semestre</CardTitle>
              <CardDescription>
                Gestiona las materias de este semestre
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/subjects/create">
                <BookOpen className="h-4 w-4 mr-2" />
                Agregar Materia
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!subjects || subjects.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay materias registradas</h3>
              <p className="text-muted-foreground mb-4">
                Comienza agregando materias a este semestre
              </p>
              <Button asChild>
                <Link href="/subjects/create">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Agregar Primera Materia
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <Card key={subject.id} className="relative">
                  <div 
                    className="absolute top-0 left-0 w-1 h-full rounded-l-lg"
                    style={{ backgroundColor: subject.color }}
                  />
                  <CardHeader className="pl-6">
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription>Materia del semestre</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Créditos:</span>
                        <span className="font-medium">{subject.credits}</span>
                      </div>
                      {subject.professor && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Profesor:</span>
                          <span className="font-medium">{subject.professor}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
