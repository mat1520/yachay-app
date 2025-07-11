'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Save, BookOpen, Calendar, Target } from 'lucide-react'

interface Props {
  subjectId: number
}

export function CreateAssignmentForm({ subjectId }: Props) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'tarea',
    max_points: 100,
    weight: 10,
    due_date: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('type', formData.type)
      formDataToSend.append('max_grade', formData.max_points.toString())
      formDataToSend.append('weight', formData.weight.toString())
      formDataToSend.append('due_date', formData.due_date)

      // Import the server action here
      const { createAssignment } = await import('@/lib/actions/assignment.actions')
      await createAssignment(subjectId, formDataToSend)

      toast.success('Asignación creada correctamente')
      router.push(`/subjects/${subjectId}/assignments`)
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al crear la asignación')
    } finally {
      setIsSubmitting(false)
    }
  }

  const assignmentTypes = [
    { value: 'tarea', label: 'Tarea' },
    { value: 'examen', label: 'Examen' },
    { value: 'proyecto', label: 'Proyecto' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'laboratorio', label: 'Laboratorio' },
    { value: 'presentacion', label: 'Presentación' }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Nombre de la Asignación
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ej: Primer Examen Parcial, Tarea 1..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Evaluación</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              {assignmentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="due_date" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Fecha de Entrega
          </Label>
          <Input
            id="due_date"
            type="date"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="max_points" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Puntos Máximos
          </Label>
          <Input
            id="max_points"
            type="number"
            min="1"
            max="1000"
            value={formData.max_points}
            onChange={(e) => setFormData({ ...formData, max_points: parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Peso en la Nota Final (%)</Label>
          <Input
            id="weight"
            type="number"
            min="0"
            max="100"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
            required
          />
          <p className="text-xs text-muted-foreground">
            Porcentaje que representa esta evaluación en la nota final
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción (Opcional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe los temas que cubre esta evaluación..."
          rows={3}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Vista Previa</h4>
        <div className="text-sm text-blue-800">
          <p><strong>Nombre:</strong> {formData.name || 'Sin nombre'}</p>
          <p><strong>Tipo:</strong> {assignmentTypes.find(t => t.value === formData.type)?.label}</p>
          <p><strong>Puntos:</strong> {formData.max_points} puntos máximos</p>
          <p><strong>Peso:</strong> {formData.weight}% de la nota final</p>
          {formData.due_date && <p><strong>Vencimiento:</strong> {new Date(formData.due_date).toLocaleDateString('es-ES')}</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Creando...' : 'Crear Asignación'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push(`/subjects/${subjectId}/assignments`)}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
