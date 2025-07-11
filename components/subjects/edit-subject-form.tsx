'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateSubjectAction } from '@/lib/actions/subject-actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Save, Palette } from 'lucide-react'

interface Subject {
  id: number
  name: string
  credits: number
  professor?: string
  color: string
  semester_id: number
}

interface Props {
  subject: Subject
}

const colors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
  '#8B5CF6', '#06B6D4', '#F97316', '#84CC16',
  '#EC4899', '#6366F1', '#14B8A6', '#F59E0B'
]

export function EditSubjectForm({ subject }: Props) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: subject.name,
    credits: subject.credits,
    professor: subject.professor || '',
    color: subject.color
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await updateSubjectAction(subject.id, formData)
      
      if (result.success) {
        toast.success('Materia actualizada correctamente')
        router.push(`/subjects/${subject.id}`)
        router.refresh()
      } else {
        toast.error(result.error || 'Error al actualizar la materia')
      }
    } catch (error) {
      toast.error('Error inesperado al actualizar la materia')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre de la Materia</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ej: Cálculo I, Historia Universal..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="credits">Créditos</Label>
        <Select 
          value={formData.credits.toString()} 
          onValueChange={(value) => setFormData({ ...formData, credits: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar créditos" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6].map((credit) => (
              <SelectItem key={credit} value={credit.toString()}>
                {credit} {credit === 1 ? 'crédito' : 'créditos'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="professor">Profesor (Opcional)</Label>
        <Input
          id="professor"
          value={formData.professor}
          onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
          placeholder="Ej: Dr. Juan Pérez"
        />
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Color de la Materia
        </Label>
        <div className="grid grid-cols-6 gap-3">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-8 h-8 rounded-lg border-2 transition-all ${
                formData.color === color
                  ? 'border-gray-900 scale-110 shadow-lg'
                  : 'border-gray-300 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setFormData({ ...formData, color })}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div 
            className="w-6 h-6 rounded"
            style={{ backgroundColor: formData.color }}
          />
          <span className="text-sm font-medium">{formData.name || 'Vista previa'}</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push(`/subjects/${subject.id}`)}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
