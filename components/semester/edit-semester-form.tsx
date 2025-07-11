'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Loader2 } from 'lucide-react'
import { updateSemester } from '@/lib/actions/semester.actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Semester {
  id: number
  name: string
  description?: string
  start_date: string
  end_date: string
  is_active: boolean
}

interface EditSemesterFormProps {
  semester: Semester
}

export function EditSemesterForm({ semester }: EditSemesterFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: semester.name,
    description: semester.description || '',
    start_date: semester.start_date,
    end_date: semester.end_date,
    is_active: semester.is_active
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('start_date', formData.start_date)
      formDataToSend.append('end_date', formData.end_date)
      formDataToSend.append('is_active', formData.is_active.toString())

      await updateSemester(semester.id, formDataToSend)

      toast.success('Semestre actualizado exitosamente')
      router.push(`/semesters/${semester.id}`)
      router.refresh()
    } catch (error) {
      console.error('Error updating semester:', error)
      toast.error('Error al actualizar el semestre')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Semestre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Semestre 2025-I"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción opcional del semestre..."
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="start_date">Fecha de Inicio *</Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="end_date">Fecha de Fin *</Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      {/* Estado del semestre */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Estado del Semestre</CardTitle>
          <CardDescription>
            Controla si este semestre está activo o archivado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="rounded border-gray-300"
            />
            <Label htmlFor="is_active">Semestre activo</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Actualizando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
