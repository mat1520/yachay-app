'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { calculateWeightedAverage, calculateProjectedGrade, getGradeColor } from '@/lib/utils'
import { updateGrade, createGradingItem, deleteGradingItem } from '@/lib/actions/grade.actions'
import { Plus, Trash2, Calculator, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

interface GradingItem {
  id: number
  name: string
  weight: number
  max_grade: number
  grade_obtained: number | null
  due_date: string | null
}

interface GradeCalculatorProps {
  subjectId: number
  gradingItems: GradingItem[]
}

export function GradeCalculator({ subjectId, gradingItems: initialItems }: GradeCalculatorProps) {
  const [items, setItems] = useState(initialItems)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)

  // Calculate current average and projected grade
  const currentAverage = calculateWeightedAverage(items)
  const projectedGrade = calculateProjectedGrade(items)
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)

  const handleGradeUpdate = async (itemId: number, newGrade: string) => {
    const gradeValue = newGrade === '' ? null : parseFloat(newGrade)
    
    if (gradeValue !== null && (gradeValue < 0 || gradeValue > 20)) {
      toast.error('La nota debe estar entre 0 y 20')
      return
    }

    setIsUpdating(itemId)
    
    try {
      await updateGrade(itemId, gradeValue)
      
      // Update local state
      setItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, grade_obtained: gradeValue }
          : item
      ))
      
      toast.success('Nota actualizada')
    } catch (error) {
      toast.error('Error al actualizar la nota')
      console.error(error)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleDeleteItem = async (itemId: number) => {
    try {
      await deleteGradingItem(itemId)
      setItems(prev => prev.filter(item => item.id !== itemId))
      toast.success('Elemento eliminado')
    } catch (error) {
      toast.error('Error al eliminar el elemento')
      console.error(error)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No tienes evaluaciones registradas</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Comienza agregando tus primeras evaluaciones para calcular tu promedio
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Evaluación
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Promedio Actual</p>
              <p className={`text-2xl font-bold ${currentAverage ? getGradeColor(currentAverage) : 'text-muted-foreground'}`}>
                {currentAverage ? currentAverage.toFixed(2) : '--'}
              </p>
            </div>
            <Calculator className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Proyección</p>
              <p className={`text-2xl font-bold ${projectedGrade ? getGradeColor(projectedGrade) : 'text-muted-foreground'}`}>
                {projectedGrade ? projectedGrade.toFixed(2) : '--'}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Peso Total</p>
              <p className="text-2xl font-bold">
                {totalWeight}%
              </p>
            </div>
            <Badge variant={totalWeight === 100 ? "default" : "secondary"}>
              {totalWeight === 100 ? "Completo" : "Pendiente"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Grading Items Table */}
      <div className="border rounded-lg">
        <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 font-medium text-sm">
          <div>Evaluación</div>
          <div>Peso (%)</div>
          <div>Nota Máxima</div>
          <div>Nota Obtenida</div>
          <div>Acciones</div>
        </div>
        
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-5 gap-4 p-4 items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                {item.due_date && (
                  <p className="text-xs text-muted-foreground">
                    Entrega: {new Date(item.due_date).toLocaleDateString('es-EC')}
                  </p>
                )}
              </div>
              
              <div>{item.weight}%</div>
              
              <div>{item.max_grade}</div>
              
              <div>
                <Input
                  type="number"
                  min="0"
                  max={item.max_grade}
                  step="0.1"
                  placeholder="--"
                  value={item.grade_obtained || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleGradeUpdate(item.id, e.target.value)}
                  disabled={isUpdating === item.id}
                  className="w-20"
                />
              </div>
              
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Item Button */}
      <div className="flex justify-center">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Evaluación
        </Button>
      </div>
    </div>
  )
}
