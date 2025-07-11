'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createSemester(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const startDate = formData.get('start_date') as string
  const endDate = formData.get('end_date') as string

  const { error } = await supabase
    .from('semesters')
    .insert({
      user_id: user.id,
      name,
      start_date: startDate,
      end_date: endDate,
    })

  if (error) {
    throw new Error('Error al crear el semestre')
  }

  revalidatePath('/dashboard')
  revalidatePath('/semester')
}

export async function updateSemester(id: number, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const startDate = formData.get('start_date') as string
  const endDate = formData.get('end_date') as string

  const { error } = await supabase
    .from('semesters')
    .update({
      name,
      start_date: startDate,
      end_date: endDate,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Error al actualizar el semestre')
  }

  revalidatePath('/dashboard')
  revalidatePath('/semester')
}

export async function deleteSemester(id: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('semesters')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Error al eliminar el semestre')
  }

  revalidatePath('/dashboard')
  revalidatePath('/semester')
}
