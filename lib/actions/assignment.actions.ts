'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createAssignment(subjectId: number, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const type = formData.get('type') as string
  const max_grade = parseFloat(formData.get('max_grade') as string)
  const weight = parseInt(formData.get('weight') as string)
  const due_date = formData.get('due_date') as string

  // Verificar que el usuario es dueño de la materia
  const { data: subject } = await supabase
    .from('subjects')
    .select('id')
    .eq('id', subjectId)
    .eq('user_id', user.id)
    .single()

  if (!subject) {
    throw new Error('No tienes permisos para agregar asignaciones a esta materia')
  }

  const { error } = await supabase
    .from('assignments')
    .insert({
      subject_id: subjectId,
      user_id: user.id,
      name,
      description,
      type,
      max_grade,
      weight,
      due_date: due_date || null
    })

  if (error) {
    console.error('Error creating assignment:', error)
    throw new Error('Error al crear la asignación')
  }

  revalidatePath(`/subjects/${subjectId}/assignments`)
  redirect(`/subjects/${subjectId}/assignments`)
}

export async function updateAssignment(assignmentId: number, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const type = formData.get('type') as string
  const max_grade = parseFloat(formData.get('max_grade') as string)
  const weight = parseInt(formData.get('weight') as string)
  const due_date = formData.get('due_date') as string
  const grade_obtained = formData.get('grade_obtained') ? parseFloat(formData.get('grade_obtained') as string) : null

  const { error } = await supabase
    .from('assignments')
    .update({
      name,
      description,
      type,
      max_grade,
      weight,
      due_date: due_date || null,
      grade_obtained,
      updated_at: new Date().toISOString()
    })
    .eq('id', assignmentId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating assignment:', error)
    throw new Error('Error al actualizar la asignación')
  }

  revalidatePath(`/subjects/*/assignments`)
}

export async function deleteAssignment(assignmentId: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('assignments')
    .delete()
    .eq('id', assignmentId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting assignment:', error)
    throw new Error('Error al eliminar la asignación')
  }

  revalidatePath(`/subjects/*/assignments`)
}

export async function updateGrade(assignmentId: number, grade: number | null) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('assignments')
    .update({
      grade_obtained: grade,
      updated_at: new Date().toISOString()
    })
    .eq('id', assignmentId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating grade:', error)
    throw new Error('Error al actualizar la calificación')
  }

  revalidatePath(`/subjects/*/assignments`)
  revalidatePath(`/subjects/*/grades`)
}
