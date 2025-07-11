import { Metadata } from 'next'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateSubjectForm } from '@/components/subjects/create-subject-form'

export const metadata: Metadata = {
  title: 'Crear Materia | Yachay App',
  description: 'Agrega una nueva materia a tu semestre actual',
}

export default function CreateSubjectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Crear Nueva Materia</h1>
              <p className="text-muted-foreground">
                Agrega una nueva materia a tu semestre actual
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la Materia</CardTitle>
            <CardDescription>
              Completa los detalles de tu nueva materia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateSubjectForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
