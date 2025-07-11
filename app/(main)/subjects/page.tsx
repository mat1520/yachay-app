import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, BookOpen, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

export default async function SubjectsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get all subjects with their semester info
  const { data: subjects } = await supabase
    .from('subjects')
    .select(`
      *,
      semesters!inner(name, start_date, end_date)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Materias</h2>
          <p className="text-muted-foreground">
            Gestiona todas tus materias y su información académica
          </p>
        </div>
        <Button asChild>
          <Link href="/subjects/new">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Materia
          </Link>
        </Button>
      </div>

      {!subjects || subjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tienes materias registradas</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Comienza agregando tu primera materia para organizar tu información académica
            </p>
            <Button asChild>
              <Link href="/subjects/new">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primera Materia
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="border-l-4 hover:shadow-md transition-shadow cursor-pointer"
              style={{ borderLeftColor: subject.color }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      <Link 
                        href={`/subject/${subject.id}`}
                        className="hover:underline"
                      >
                        {subject.name}
                      </Link>
                    </CardTitle>
                    <CardDescription>{subject.semesters.name}</CardDescription>
                  </div>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {subject.professor || 'Sin profesor asignado'}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {subject.credits} créditos
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/subject/${subject.id}`}>
                      Ver Detalles
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
