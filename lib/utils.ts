import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para formatear fechas en formato legible
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Función para formatear fechas en formato corto
export function formatDateShort(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric'
  })
}

// Función para verificar si una fecha está vencida
export function isOverdue(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj < new Date()
}

// Función para obtener el color del semestre según el estado
export function getSemesterStatusColor(isActive: boolean): string {
  return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
}

// Función para generar un color aleatorio para las materias
export function generateRandomColor(): string {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#06B6D4', '#F97316', '#84CC16',
    '#EC4899', '#6366F1', '#14B8A6', '#F59E0B'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Interfaz para elementos de calificación
export interface GradingItem {
  id: number
  name: string
  weight: number
  max_grade: number
  grade_obtained?: number | null
  due_date?: string
}

// Función para calcular promedio ponderado
export function calculateWeightedAverage(items: GradingItem[]): number {
  const completedItems = items.filter(item => item.grade_obtained !== null && item.grade_obtained !== undefined)
  if (completedItems.length === 0) return 0
  
  const totalWeightedScore = completedItems.reduce((sum, item) => {
    const percentage = (item.grade_obtained! / item.max_grade) * 100
    return sum + (percentage * item.weight / 100)
  }, 0)
  
  const totalWeight = completedItems.reduce((sum, item) => sum + item.weight, 0)
  
  return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0
}

// Función para calcular nota proyectada
export function calculateProjectedGrade(items: GradingItem[]): number {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  if (totalWeight === 0) return 0
  
  const currentWeightedScore = items.reduce((sum, item) => {
    if (item.grade_obtained !== null && item.grade_obtained !== undefined) {
      const percentage = (item.grade_obtained / item.max_grade) * 100
      return sum + (percentage * item.weight / 100)
    }
    return sum
  }, 0)
  
  return (currentWeightedScore / totalWeight) * 100
}

// Función para formatear calificaciones
export function formatGrade(grade: number): string {
  return grade.toFixed(1)
}

// Función para obtener el color de la calificación
export function getGradeColor(grade: number): string {
  if (grade >= 90) return 'text-green-600'
  if (grade >= 80) return 'text-blue-600'
  if (grade >= 70) return 'text-yellow-600'
  if (grade >= 60) return 'text-orange-600'
  return 'text-red-600'
}
