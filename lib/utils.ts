import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateShort(date: string | Date) {
  return new Intl.DateTimeFormat('es-EC', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function calculateWeightedAverage(
  gradingItems: Array<{
    weight: number
    max_grade: number
    grade_obtained: number | null
  }>
) {
  const itemsWithGrades = gradingItems.filter(item => item.grade_obtained !== null)
  
  if (itemsWithGrades.length === 0) {
    return null
  }

  const totalWeight = itemsWithGrades.reduce((sum, item) => sum + item.weight, 0)
  
  if (totalWeight === 0) {
    return null
  }

  const weightedSum = itemsWithGrades.reduce((sum, item) => {
    const normalizedGrade = (item.grade_obtained! / item.max_grade) * 20 // Normalizar a escala de 20
    return sum + (normalizedGrade * item.weight)
  }, 0)

  return weightedSum / totalWeight
}

export function calculateProjectedGrade(
  gradingItems: Array<{
    weight: number
    max_grade: number
    grade_obtained: number | null
  }>
) {
  const totalWeight = gradingItems.reduce((sum, item) => sum + item.weight, 0)
  
  if (totalWeight === 0) {
    return null
  }

  // Calcular el promedio actual con los elementos que tienen nota
  const itemsWithGrades = gradingItems.filter(item => item.grade_obtained !== null)
  const currentWeightedSum = itemsWithGrades.reduce((sum, item) => {
    const normalizedGrade = (item.grade_obtained! / item.max_grade) * 20
    return sum + (normalizedGrade * item.weight)
  }, 0)

  const currentWeight = itemsWithGrades.reduce((sum, item) => sum + item.weight, 0)
  
  if (currentWeight === 0) {
    return null
  }

  // Asumir que los elementos restantes tendrán el promedio actual
  const remainingWeight = totalWeight - currentWeight
  const currentAverage = currentWeightedSum / currentWeight
  const projectedSum = currentWeightedSum + (currentAverage * remainingWeight)

  return projectedSum / totalWeight
}

export function getGradeColor(grade: number) {
  if (grade >= 18) return 'text-green-600'
  if (grade >= 16) return 'text-blue-600'
  if (grade >= 14) return 'text-yellow-600'
  return 'text-red-600'
}

export function isOverdue(dueDate: string | null) {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}
