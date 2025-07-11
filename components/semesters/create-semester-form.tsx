'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Save, ArrowLeft, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { createSemesterAction } from '@/lib/actions/semester-actions'

export function CreateSemesterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear().toString(),
    period: '',
    start_date: '',
    end_date: '',
    description: ''
  })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  const periods = [
    { value: '1', name: 'Primer Semestre' },
    { value: '2', name: 'Segundo Semestre' },
    { value: 'verano', name: 'Semestre de Verano' },
    { value: 'intersemestral', name: 'Intersemestral' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Auto-generate name when year and period change
      if (field === 'year' || field === 'period') {
        if (newData.year && newData.period) {
          const periodName = periods.find(p => p.value === newData.period)?.name || newData.period
          newData.name = `${periodName} ${newData.year}`
        }
      }
      
      return newData
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await createSemesterAction({
        name: formData.name,
        year: parseInt(formData.year),
        period: formData.period,
        start_date: formData.start_date,
        end_date: formData.end_date,
        description: formData.description
      })

      if (result.success) {
        toast.success('Semestre creado exitosamente')
        router.push('/semesters')
      } else {
        toast.error(result.error || 'Error al crear el semestre')
      }
    } catch (error) {
      toast.error('Error inesperado al crear el semestre')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Año *</Label>
          <Select 
            value={formData.year} 
            onValueChange={(value) => handleInputChange('year', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el año" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="period">Período *</Label>
          <Select 
            value={formData.period} 
            onValueChange={(value) => handleInputChange('period', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el período" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nombre del Semestre *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="ej. Primer Semestre 2025"
          required
        />
        <p className="text-sm text-muted-foreground">
          Se genera automáticamente pero puedes editarlo
        </p>
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">Fecha de Inicio</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">Fecha de Fin</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => handleInputChange('end_date', e.target.value)}
            min={formData.start_date}
          />
        </div>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="description">Descripción (opcional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
          placeholder="Describe brevemente este semestre..."
          rows={3}
        />
      </div>

      {/* Preview */}
      <div className="p-4 border rounded-lg bg-muted/50">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-semibold">
              {formData.name || 'Nombre del Semestre'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formData.start_date && formData.end_date 
                ? `${new Date(formData.start_date).toLocaleDateString()} - ${new Date(formData.end_date).toLocaleDateString()}`
                : 'Sin fechas definidas'
              }
            </p>
            {formData.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {formData.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !formData.name || !formData.year || !formData.period}
          className="flex-1"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Crear Semestre
        </Button>
      </div>
    </form>
  )
}
