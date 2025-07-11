import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function SemestersPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get all semesters with subject count
  const { data: semesters } = await supabase
    .from('semesters')
    .select(`
      *,
      subjects(count)
    `)
    .eq('user_id', user.id)
    .order('start_date', { ascending: false })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Semestres</h2>
          <p className="text-muted-foreground">
            Organiza tus períodos académicos y materias por semestre
          </p>
        </div>
        <Button asChild>
          <Link href="/semesters/new">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Semestre
          </Link>
        </Button>
      </div>

      {!semesters || semesters.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tienes semestres registrados</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Crea tu primer semestre para comenzar a organizar tus materias por períodos académicos
            </p>
            <Button asChild>
              <Link href="/semesters/new">
                <Plus className="h-4 w-4 mr-2" />
                Crear Primer Semestre
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {semesters.map((semester) => {
            const isActive = new Date() >= new Date(semester.start_date) && 
                           new Date() <= new Date(semester.end_date)
            const subjectCount = semester.subjects ? (semester.subjects as any[]).length : 0

            return (
              <Card 
                key={semester.id} 
                className={`hover:shadow-md transition-shadow ${isActive ? 'ring-2 ring-primary' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {semester.name}
                        {isActive && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                            Actual
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {formatDate(semester.start_date)} - {formatDate(semester.end_date)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {subjectCount} {subjectCount === 1 ? 'materia' : 'materias'}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/semesters/${semester.id}`}>
                          Ver Detalles
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
