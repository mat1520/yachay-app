'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatGrade, getGradeColor, isOverdue } from '@/lib/utils'
import { Calendar, Edit, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Assignment {
  id: number
  name: string
  type: string
  max_grade: number
  grade_obtained?: number | null
  weight: number
  due_date?: string | null
  description?: string | null
}

interface Props {
  subjectId: number
  assignments: Assignment[]
}

export function AssignmentsList({ subjectId, assignments }: Props) {
  if (!assignments || assignments.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No hay asignaciones</h3>
        <p className="text-muted-foreground mb-4">
          Comienza agregando tareas, exámenes o proyectos para esta materia
        </p>
        <Button asChild>
          <Link href={`/subjects/${subjectId}/assignments/create`}>
            <FileText className="h-4 w-4 mr-2" />
            Crear Primera Asignación
          </Link>
        </Button>
      </div>
    )
  }

  const getAssignmentStatus = (assignment: Assignment) => {
    if (assignment.is_completed) {
      return {
        icon: CheckCircle,
        label: 'Completada',
        color: 'bg-green-100 text-green-800'
      }
    }
    
    if (assignment.due_date && isOverdue(assignment.due_date)) {
      return {
        icon: AlertCircle,
        label: 'Vencida',
        color: 'bg-red-100 text-red-800'
      }
    }
    
    return {
      icon: Clock,
      label: 'Pendiente',
      color: 'bg-yellow-100 text-yellow-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'examen':
        return 'bg-red-100 text-red-800'
      case 'tarea':
        return 'bg-blue-100 text-blue-800'
      case 'proyecto':
        return 'bg-purple-100 text-purple-800'
      case 'quiz':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => {
        const status = getAssignmentStatus(assignment)
        const StatusIcon = status.icon
        const percentage = assignment.is_completed && assignment.earned_points
          ? (assignment.earned_points / assignment.max_points) * 100
          : null

        return (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <StatusIcon className="h-4 w-4" />
                    {assignment.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getTypeColor(assignment.type)}>
                      {assignment.type}
                    </Badge>
                    <Badge variant="outline" className={status.color}>
                      {status.label}
                    </Badge>
                    <Badge variant="outline">
                      Peso: {assignment.weight}%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {percentage !== null && (
                    <div className={`text-right ${getGradeColor(percentage)}`}>
                      <div className="text-lg font-bold">
                        {formatGrade(percentage)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {assignment.earned_points}/{assignment.max_points} pts
                      </div>
                    </div>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/subjects/${subjectId}/assignments/${assignment.id}/edit`}>
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {assignment.due_date 
                      ? `Vence: ${formatDate(assignment.due_date)}`
                      : 'Sin fecha límite'
                    }
                  </div>
                  <div>
                    Puntos máximos: {assignment.max_points}
                  </div>
                </div>
                {!assignment.is_completed && (
                  <Button size="sm" asChild>
                    <Link href={`/subjects/${subjectId}/assignments/${assignment.id}/submit`}>
                      Marcar como Completada
                    </Link>
                  </Button>
                )}
              </div>
              {assignment.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {assignment.description}
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
