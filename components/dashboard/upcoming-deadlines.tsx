import { formatDateShort, isOverdue } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'

interface DeadlineItem {
  id: number
  name: string
  due_date: string | null
  subject_id: number
  subjects: {
    name: string
  }
}

interface UpcomingDeadlinesProps {
  deadlines: DeadlineItem[]
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  const validDeadlines = deadlines.filter(d => d.due_date !== null)
  
  if (validDeadlines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No tienes entregas próximas</h3>
        <p className="text-sm text-muted-foreground">
          ¡Perfecto! Parece que tienes todo al día.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {validDeadlines.map((deadline) => (
        <Card key={deadline.id} className="card-modern hover-lift border-l-4 border-l-primary/40">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="font-medium text-sm">{deadline.name}</p>
                <p className="text-xs text-muted-foreground">{deadline.subjects.name}</p>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <Clock className="h-3 w-3" />
                <span className={isOverdue(deadline.due_date!) ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                  {formatDateShort(deadline.due_date!)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
