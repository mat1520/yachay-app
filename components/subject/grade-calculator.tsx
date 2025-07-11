'use client'

import { useState, useEffect } from 'react'
import { GradingItem } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Calculator, BookOpen, Target, Award } from 'lucide-react'
import { formatDate, calculateWeightedAverage, formatGrade, getGradeColor } from '@/lib/utils'

interface GradeCalculatorProps {
  subjectId: number
  gradingItems: GradingItem[]
}

export function GradeCalculator({ subjectId, gradingItems }: GradeCalculatorProps) {
  const [items, setItems] = useState<GradingItem[]>(gradingItems)
  const [targetGrade, setTargetGrade] = useState<number>(85)

  // Calculate current weighted average
  const currentGrade = calculateWeightedAverage(items)
  const completedWeight = items
    .filter(item => item.grade_obtained !== null)
    .reduce((sum, item) => sum + item.weight, 0)

  // Calculate what grade is needed in remaining assignments
  const calculateNeededGrade = (target: number) => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
    const currentWeightedPoints = items
      .filter(item => item.grade_obtained !== null)
      .reduce((sum, item) => sum + (item.grade_obtained! / item.max_grade * 100 * item.weight / 100), 0)
    
    const remainingWeight = totalWeight - completedWeight
    
    if (remainingWeight === 0) return 0
    
    const neededWeightedPoints = (target / 100 * totalWeight) - currentWeightedPoints
    return Math.max(0, Math.min(100, (neededWeightedPoints / remainingWeight) * 100))
  }

  const neededGrade = calculateNeededGrade(targetGrade)

  // Update grade for an item
  const updateGrade = (id: number, grade: number | null) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, grade_obtained: grade } : item
    ))
  }

  return (
    <div className="space-y-6">
      {/* Current Grade Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nota Actual</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGradeColor(currentGrade)}`}>
              {formatGrade(currentGrade)}%
            </div>
            <Progress value={currentGrade} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Basado en {completedWeight}% del peso total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta de Nota</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="0"
                max="100"
                value={targetGrade}
                onChange={(e) => setTargetGrade(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm">%</span>
            </div>
            {neededGrade > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Necesitas {formatGrade(neededGrade)}% en las evaluaciones restantes
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Grade Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Evaluaciones
          </h3>
          <Badge variant="outline">
            {items.filter(item => item.grade_obtained !== null).length} de {items.length} completadas
          </Badge>
        </div>

        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {item.name}
                </CardTitle>
                <Badge variant="secondary">{item.weight}%</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Fecha límite: {formatDate(item.due_date)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label htmlFor={`grade-${item.id}`}>Nota Obtenida</Label>
                  <Input
                    id={`grade-${item.id}`}
                    type="number"
                    min="0"
                    max={item.max_grade}
                    value={item.grade_obtained || ''}
                    onChange={(e) => updateGrade(item.id, e.target.value ? Number(e.target.value) : null)}
                    placeholder="Ingresa tu nota"
                  />
                </div>
                <div>
                  <Label>Nota Máxima</Label>
                  <div className="h-10 flex items-center px-3 bg-muted rounded-md">
                    {item.max_grade}
                  </div>
                </div>
                <div>
                  <Label>Porcentaje</Label>
                  <div className="h-10 flex items-center px-3 bg-muted rounded-md">
                    {item.grade_obtained ? 
                      `${formatGrade((item.grade_obtained / item.max_grade) * 100)}%` :
                      '- %'
                    }
                  </div>
                </div>
              </div>

              {item.grade_obtained && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progreso</span>
                    <span>{formatGrade((item.grade_obtained / item.max_grade) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(item.grade_obtained / item.max_grade) * 100} 
                    className="h-2"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Grade Projection */}
      {completedWeight < 100 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Proyección de Nota Final</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Si obtienes 100% en todo lo restante:</span>
                <span className="font-semibold text-green-600">
                  {formatGrade(calculateWeightedAverage([
                    ...items.filter(item => item.grade_obtained !== null),
                    ...items.filter(item => item.grade_obtained === null).map(item => ({
                      ...item,
                      grade_obtained: item.max_grade
                    }))
                  ]))}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Si obtienes 60% en todo lo restante:</span>
                <span className="font-semibold text-orange-600">
                  {formatGrade(calculateWeightedAverage([
                    ...items.filter(item => item.grade_obtained !== null),
                    ...items.filter(item => item.grade_obtained === null).map(item => ({
                      ...item,
                      grade_obtained: item.max_grade * 0.6
                    }))
                  ]))}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Si obtienes 0% en todo lo restante:</span>
                <span className="font-semibold text-red-600">
                  {formatGrade(currentGrade)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
