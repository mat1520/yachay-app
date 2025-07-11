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
