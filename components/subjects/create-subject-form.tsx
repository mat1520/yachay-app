'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { createSubjectAction } from '@/lib/actions/subject-actions'

export function CreateSubjectForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: '',
    professor: '',
    description: '',
    color: '#3b82f6'
  })

  const colors = [
    { value: '#3b82f6', name: 'Azul', class: 'bg-blue-500' },
    { value: '#ef4444', name: 'Rojo', class: 'bg-red-500' },
    { value: '#22c55e', name: 'Verde', class: 'bg-green-500' },
    { value: '#f59e0b', name: 'Amarillo', class: 'bg-yellow-500' },
    { value: '#8b5cf6', name: 'Morado', class: 'bg-purple-500' },
    { value: '#06b6d4', name: 'Cian', class: 'bg-cyan-500' },
    { value: '#ec4899', name: 'Rosa', class: 'bg-pink-500' },
    { value: '#64748b', name: 'Gris', class: 'bg-slate-500' },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await createSubjectAction({
        name: formData.name,
        code: formData.code,
        credits: parseInt(formData.credits),
        professor: formData.professor,
        description: formData.description,
        color: formData.color
      })

      if (result.success) {
        toast.success('Materia creada exitosamente')
        router.push('/subjects')
      } else {
        toast.error(result.error || 'Error al crear la materia')
      }
    } catch (error) {
      toast.error('Error inesperado al crear la materia')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la Materia *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="ej. Cálculo Diferencial"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="code">Código de la Materia</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => handleInputChange('code', e.target.value)}
            placeholder="ej. MAT101"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="credits">Créditos *</Label>
          <Input
            id="credits"
            type="number"
            min="1"
            max="10"
            value={formData.credits}
            onChange={(e) => handleInputChange('credits', e.target.value)}
            placeholder="ej. 4"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="professor">Profesor</Label>
          <Input
            id="professor"
            value={formData.professor}
            onChange={(e) => handleInputChange('professor', e.target.value)}
            placeholder="ej. Dr. Juan Pérez"
          />
        </div>
      </div>

      {/* Color */}
      <div className="space-y-2">
        <Label>Color de la Materia</Label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleInputChange('color', color.value)}
              className={`
                h-12 w-full rounded-lg border-2 transition-all
                ${formData.color === color.value 
                  ? 'border-foreground scale-110' 
                  : 'border-border hover:border-foreground/50'
                }
                ${color.class}
              `}
              title={color.name}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Selecciona un color para identificar visualmente esta materia
        </p>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="description">Descripción (opcional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe brevemente el contenido de la materia..."
          rows={3}
        />
      </div>

      {/* Preview */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-16 rounded-sm"
              style={{ backgroundColor: formData.color }}
            />
            <div className="flex-1">
              <h3 className="font-semibold">
                {formData.name || 'Nombre de la Materia'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formData.code && `${formData.code} • `}
                {formData.credits && `${formData.credits} créditos`}
                {formData.professor && ` • ${formData.professor}`}
              </p>
              {formData.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

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
          disabled={isLoading || !formData.name || !formData.credits}
          className="flex-1"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Crear Materia
        </Button>
      </div>
    </form>
  )
}
