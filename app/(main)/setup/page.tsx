import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Database, ExternalLink, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SetupPage() {
  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configuración de Base de Datos</h1>
        <p className="text-muted-foreground">
          Para completar la funcionalidad de asignaciones y calificaciones, necesitas ejecutar un script SQL en Supabase.
        </p>
      </div>

      <Card className="mb-6 border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-orange-600" />
            <p className="text-orange-800">
              <strong>¡Importante!</strong> Este paso es necesario para que funcionen las asignaciones, tareas y el sistema de calificaciones.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Paso 1: Acceder a Supabase
            </CardTitle>
            <CardDescription>
              Ve a tu proyecto en Supabase Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Abre <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Supabase Dashboard</a></li>
              <li>Selecciona tu proyecto &quot;yachay-app&quot;</li>
              <li>Ve a la sección &quot;SQL Editor&quot; en el menú lateral</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Paso 2: Ejecutar el Script SQL
            </CardTitle>
            <CardDescription>
              Copia y ejecuta el siguiente script en el SQL Editor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm"><code>{`-- Crear tabla assignments en Supabase
-- Ejecutar este script en el SQL Editor de Supabase

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL CHECK (type IN ('tarea', 'examen', 'proyecto', 'quiz', 'laboratorio', 'presentacion')),
  max_grade DECIMAL(5,2) NOT NULL DEFAULT 100.00,
  weight INTEGER NOT NULL DEFAULT 0,
  due_date DATE,
  grade_obtained DECIMAL(5,2),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios solo puedan gestionar sus propias asignaciones
CREATE POLICY "Users can manage their own assignments" 
ON assignments 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id);

-- Agregar índices para mejorar el rendimiento
CREATE INDEX idx_assignments_subject_id ON assignments(subject_id);
CREATE INDEX idx_assignments_user_id ON assignments(user_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_assignments_updated_at 
    BEFORE UPDATE ON assignments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();`}</code></pre>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                1. Copia todo el código de arriba
              </p>
              <p className="text-sm text-muted-foreground">
                2. Pégalo en el SQL Editor de Supabase
              </p>
              <p className="text-sm text-muted-foreground">
                3. Haz clic en &quot;Run&quot; para ejecutar el script
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Paso 3: Actualizar Tipos TypeScript
            </CardTitle>
            <CardDescription>
              Regenerar los tipos para incluir la nueva tabla
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-lg">
              <code className="text-sm">npx supabase gen types typescript --project-id tu-project-id &gt; lib/supabase/database.types.ts</code>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Reemplaza &quot;tu-project-id&quot; con tu ID real de proyecto Supabase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>¿Qué obtienes después de esto?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Crear tareas, exámenes y proyectos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Sistema de calificaciones funcional
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Cálculo automático de promedios
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Gestión completa de evaluaciones
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/dashboard">
            Volver al Dashboard
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
            Abrir Supabase Dashboard
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  )
}
