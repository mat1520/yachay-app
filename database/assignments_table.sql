-- Crear tabla assignments en Supabase
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
    EXECUTE FUNCTION update_updated_at_column();
