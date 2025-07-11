'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface CreateSubjectData {
  name: string
  code?: string
  credits: number
  professor?: string
  description?: string
  color: string
}

export async function createSubjectAction(data: CreateSubjectData) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'Usuario no autenticado' }
    }

    // Get current active semester
    const { data: semester, error: semesterError } = await supabase
      .from('semesters')
      .select('id')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single()

    if (semesterError || !semester) {
      return { success: false, error: 'No hay un semestre activo. Crea un semestre primero.' }
    }

    // Create the subject
    const { data: subject, error: subjectError } = await supabase
      .from('subjects')
      .insert({
        name: data.name,
        code: data.code || null,
        credits: data.credits,
        professor: data.professor || null,
        description: data.description || null,
        color: data.color,
        semester_id: semester.id,
        user_id: user.id
      })
      .select()
      .single()

    if (subjectError) {
      console.error('Error creating subject:', subjectError)
      return { success: false, error: 'Error al crear la materia' }
    }

    revalidatePath('/subjects')
    revalidatePath('/dashboard')
    
    return { success: true, data: subject }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Error inesperado' }
  }
}

export async function getSubjectsAction() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'Usuario no autenticado' }
    }

    const { data: subjects, error } = await supabase
      .from('subjects')
      .select(`
        *,
        semester:semesters(name, year, period)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching subjects:', error)
      return { success: false, error: 'Error al obtener las materias' }
    }

    return { success: true, data: subjects }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Error inesperado' }
  }
}

export async function deleteSubjectAction(subjectId: number) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'Usuario no autenticado' }
    }

    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', subjectId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting subject:', error)
      return { success: false, error: 'Error al eliminar la materia' }
    }

    revalidatePath('/subjects')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Error inesperado' }
  }
}
