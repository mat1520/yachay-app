'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Save, BookOpen, Calendar, Target, Sparkles } from 'lucide-react'

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
    <div className="card-modern p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-base font-medium">
            <div className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center">
              <BookOpen className="h-3 w-3 text-white" />
            </div>
            Nombre de la Asignación
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: Primer Examen Parcial, Tarea 1..."
            className="glass border-primary/20 focus:border-primary/40 focus:ring-primary/20"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-base font-medium">Tipo de Evaluación</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="glass border-primary/20 focus:border-primary/40">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent className="glass backdrop-blur-md">
                {assignmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="hover:bg-primary/10">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date" className="flex items-center gap-2 text-base font-medium">
              <div className="w-6 h-6 rounded-md bg-gradient-secondary flex items-center justify-center">
                <Calendar className="h-3 w-3 text-white" />
              </div>
              Fecha de Entrega
            </Label>
            <Input
              id="due_date"
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="glass border-primary/20 focus:border-primary/40 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="max_points" className="flex items-center gap-2 text-base font-medium">
              <div className="w-6 h-6 rounded-md bg-gradient-warm flex items-center justify-center">
                <Target className="h-3 w-3 text-white" />
              </div>
              Puntos Máximos
            </Label>
            <Input
              id="max_points"
              type="number"
              min="1"
              max="1000"
              value={formData.max_points}
              onChange={(e) => setFormData({ ...formData, max_points: parseInt(e.target.value) })}
              className="glass border-primary/20 focus:border-primary/40 focus:ring-primary/20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-base font-medium">Peso en la Nota Final (%)</Label>
            <Input
              id="weight"
              type="number"
              min="0"
              max="100"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
              className="glass border-primary/20 focus:border-primary/40 focus:ring-primary/20"
              required
            />
            <p className="text-xs text-muted-foreground">
              Porcentaje que representa esta evaluación en la nota final
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-medium">Descripción (Opcional)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe los temas que cubre esta evaluación..."
            rows={3}
            className="glass border-primary/20 focus:border-primary/40 focus:ring-primary/20"
          />
        </div>

        {/* Vista previa mejorada */}
        <div className="card-modern bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="p-4 space-y-3">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Vista Previa
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><span className="font-medium text-muted-foreground">Nombre:</span> <span className="text-foreground">{formData.name || 'Sin nombre'}</span></p>
                <p><span className="font-medium text-muted-foreground">Tipo:</span> <span className="text-foreground">{assignmentTypes.find(t => t.value === formData.type)?.label}</span></p>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium text-muted-foreground">Puntos:</span> <span className="text-foreground font-semibold">{formData.max_points}</span></p>
                <p><span className="font-medium text-muted-foreground">Peso:</span> <span className="text-foreground font-semibold">{formData.weight}%</span></p>
              </div>
              {formData.due_date && (
                <p className="md:col-span-2"><span className="font-medium text-muted-foreground">Vencimiento:</span> <span className="text-foreground">{new Date(formData.due_date).toLocaleDateString('es-ES')}</span></p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="flex-1 btn-modern bg-gradient-primary text-white hover-glow"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Creando...' : 'Crear Asignación'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push(`/subjects/${subjectId}/assignments`)}
            className="glass hover-lift"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
