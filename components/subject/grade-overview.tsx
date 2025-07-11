'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatGrade, getGradeColor } from '@/lib/utils'
import { TrendingUp, Target, Calendar } from 'lucide-react'

interface Assignment {
  id: number
  name: string
  type: string
  max_points: number
  earned_points?: number
  weight: number
  due_date?: string
  is_completed: boolean
}

interface Props {
  subjectId: number
  assignments: Assignment[]
  currentGrade: number
}

export function GradeOverview({ subjectId, assignments, currentGrade }: Props) {
  const completedAssignments = assignments.filter(a => a.is_completed)
  const upcomingAssignments = assignments.filter(a => !a.is_completed)
  
  const progressPercentage = assignments.length > 0 
    ? (completedAssignments.length / assignments.length) * 100 
    : 0

  // Calculate potential grade if all remaining assignments are completed perfectly
  const totalPossiblePoints = assignments.reduce((sum, a) => sum + a.max_points, 0)
  const currentEarnedPoints = completedAssignments.reduce((sum, a) => sum + (a.earned_points || 0), 0)
  const potentialGrade = totalPossiblePoints > 0 ? 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Progreso del Curso</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completado:</span>
              <span className="font-medium">{completedAssignments.length}/{assignments.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {formatGrade(progressPercentage)}% de asignaciones completadas
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Calificación Actual</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getGradeColor(currentGrade)}`}>
            {formatGrade(currentGrade)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Basado en {completedAssignments.length} asignaciones
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Próximas Entregas</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingAssignments.length}</div>
          <p className="text-xs text-muted-foreground">
            asignaciones pendientes
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
