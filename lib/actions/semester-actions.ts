'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface CreateSemesterData {
  name: string
  year: number
  period: string
  start_date?: string
  end_date?: string
  description?: string
}

export async function createSemesterAction(data: CreateSemesterData) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'Usuario no autenticado' }
    }

    // Create the semester
    const { data: semester, error: semesterError } = await supabase
      .from('semesters')
      .insert({
        name: data.name,
        year: data.year,
        period: data.period,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        description: data.description || null,
        user_id: user.id,
        is_active: false // Will be activated manually
      } as any)
      .select()
      .single()

    if (semesterError) {
      console.error('Error creating semester:', semesterError)
      return { success: false, error: 'Error al crear el semestre' }
    }

    revalidatePath('/semesters')
    revalidatePath('/dashboard')
    
    return { success: true, data: semester }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Error inesperado' }
  }
}

export async function getSemestersAction() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'Usuario no autenticado' }
    }

    const { data: semesters, error } = await supabase
      .from('semesters')
      .select('*')
      .eq('user_id', user.id)
      .order('year', { ascending: false })
      .order('period', { ascending: false })

    if (error) {
      console.error('Error fetching semesters:', error)
      return { success: false, error: 'Error al obtener los semestres' }
    }

    return { success: true, data: semesters }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Error inesperado' }
  }
}

export async function setActiveSemesterAction(semesterId: number) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'Usuario no autenticado' }
    }

    // First, deactivate all semesters
    await supabase
      .from('semesters')
      .update({ is_active: false } as any)
      .eq('user_id', user.id)

    // Then activate the selected one
    const { error } = await supabase
      .from('semesters')
      .update({ is_active: true } as any)
      .eq('id', semesterId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error setting active semester:', error)
      return { success: false, error: 'Error al activar el semestre' }
    }

    revalidatePath('/semesters')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Error inesperado' }
  }
}

export async function deleteSemesterAction(semesterId: number) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'Usuario no autenticado' }
    }

    const { error } = await supabase
      .from('semesters')
      .delete()
      .eq('id', semesterId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting semester:', error)
      return { success: false, error: 'Error al eliminar el semestre' }
    }

    revalidatePath('/semesters')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Error inesperado' }
  }
}
