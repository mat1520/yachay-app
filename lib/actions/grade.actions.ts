'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createGradingItem(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const weight = parseFloat(formData.get('weight') as string)
  const maxGrade = parseFloat(formData.get('max_grade') as string)
  const gradeObtained = formData.get('grade_obtained') as string
  const dueDate = formData.get('due_date') as string
  const subjectId = parseInt(formData.get('subject_id') as string)

  const { error } = await supabase
    .from('grading_items')
    .insert({
      user_id: user.id,
      subject_id: subjectId,
      name,
      weight,
      max_grade: maxGrade,
      grade_obtained: gradeObtained ? parseFloat(gradeObtained) : null,
      due_date: dueDate || null,
    })

  if (error) {
    throw new Error('Error al crear el elemento de calificación')
  }

  revalidatePath('/dashboard')
  revalidatePath(`/subject/${subjectId}`)
}

export async function updateGradingItem(id: number, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const weight = parseFloat(formData.get('weight') as string)
  const maxGrade = parseFloat(formData.get('max_grade') as string)
  const gradeObtained = formData.get('grade_obtained') as string
  const dueDate = formData.get('due_date') as string

  const { error } = await supabase
    .from('grading_items')
    .update({
      name,
      weight,
      max_grade: maxGrade,
      grade_obtained: gradeObtained ? parseFloat(gradeObtained) : null,
      due_date: dueDate || null,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Error al actualizar el elemento de calificación')
  }

  // Get subject_id to revalidate the correct path
  const { data: gradingItem } = await supabase
    .from('grading_items')
    .select('subject_id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (gradingItem) {
    revalidatePath('/dashboard')
    revalidatePath(`/subject/${gradingItem.subject_id}`)
  }
}

export async function updateGrade(id: number, gradeObtained: number | null) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('grading_items')
    .update({
      grade_obtained: gradeObtained,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Error al actualizar la nota')
  }

  // Get subject_id to revalidate the correct path
  const { data: gradingItem } = await supabase
    .from('grading_items')
    .select('subject_id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (gradingItem) {
    revalidatePath('/dashboard')
    revalidatePath(`/subject/${gradingItem.subject_id}`)
  }
}

export async function deleteGradingItem(id: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get subject_id before deleting
  const { data: gradingItem } = await supabase
    .from('grading_items')
    .select('subject_id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  const { error } = await supabase
    .from('grading_items')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Error al eliminar el elemento de calificación')
  }

  if (gradingItem) {
    revalidatePath('/dashboard')
    revalidatePath(`/subject/${gradingItem.subject_id}`)
  }
}
