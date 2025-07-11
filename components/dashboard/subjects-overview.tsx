import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Plus } from 'lucide-react'

interface Subject {
  id: number
  name: string
  professor: string | null
  credits: number
  color: string
  created_at: string
  semesters: {
    name: string
  }
}

interface SubjectsOverviewProps {
  subjects: Subject[]
}

export function SubjectsOverview({ subjects }: SubjectsOverviewProps) {
  if (subjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No tienes materias aún</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Comienza agregando tu primera materia
        </p>
        <Button asChild size="sm">
          <Link href="/subjects">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Materia
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {subjects.map((subject) => (
        <Card key={subject.id} className="border-l-4" style={{ borderLeftColor: subject.color }}>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <Link 
                    href={`/subject/${subject.id}`}
                    className="font-medium text-sm hover:underline"
                  >
                    {subject.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{subject.semesters.name}</p>
                </div>
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {subject.credits} créditos
                </span>
              </div>
              {subject.professor && (
                <p className="text-xs text-muted-foreground">
                  Prof. {subject.professor}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {subjects.length > 0 && (
        <div className="pt-2">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/subjects">
              Ver todas las materias
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
