'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createSubject(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const professor = formData.get('professor') as string
  const credits = parseInt(formData.get('credits') as string)
  const color = formData.get('color') as string
  const semesterId = parseInt(formData.get('semester_id') as string)

  const { error } = await supabase
    .from('subjects')
    .insert({
      user_id: user.id,
      semester_id: semesterId,
      name,
      professor,
      credits,
      color,
    })

  if (error) {
    throw new Error('Error al crear la materia')
  }

  revalidatePath('/dashboard')
  revalidatePath('/subject')
}

export async function updateSubject(id: number, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const professor = formData.get('professor') as string
  const credits = parseInt(formData.get('credits') as string)
  const color = formData.get('color') as string

  const { error } = await supabase
    .from('subjects')
    .update({
      name,
      professor,
      credits,
      color,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Error al actualizar la materia')
  }

  revalidatePath('/dashboard')
  revalidatePath('/subject')
  revalidatePath(`/subject/${id}`)
}

export async function deleteSubject(id: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('subjects')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Error al eliminar la materia')
  }

  revalidatePath('/dashboard')
  revalidatePath('/subject')
}
