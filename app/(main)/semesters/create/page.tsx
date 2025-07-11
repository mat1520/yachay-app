import { Metadata } from 'next'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateSemesterForm } from '@/components/semesters/create-semester-form'

export const metadata: Metadata = {
  title: 'Crear Semestre | Yachay App',
  description: 'Agrega un nuevo semestre académico',
}

export default function CreateSemesterPage() {
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
              <h1 className="text-3xl font-bold">Crear Nuevo Semestre</h1>
              <p className="text-muted-foreground">
                Agrega un nuevo período académico
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Semestre</CardTitle>
            <CardDescription>
              Completa los detalles de tu nuevo semestre académico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateSemesterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
