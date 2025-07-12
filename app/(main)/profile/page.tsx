'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { User, Edit, Mail, Calendar, MapPin, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface Profile {
  id: string
  email?: string
  full_name?: string
  phone?: string
  location?: string
  university?: string
  career?: string
  bio?: string
  birth_date?: string
  gender?: string
  avatar_url?: string
  created_at: string
  updated_at?: string
}

interface FormData {
  full_name: string
  phone: string
  location: string
  university: string
  career: string
  bio: string
  birth_date: string
  gender: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    phone: '',
    location: '',
    university: '',
    career: '',
    bio: '',
    birth_date: '',
    gender: ''
  })

  const supabase = createClient()

  useEffect(() => {
    loadUserData()
  }, [])

  async function loadUserData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUser(user)

      // Get or create profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      let profileData = profile
      
      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])
          .select()
          .single()

        if (createError) {
          console.error('Error creating profile:', createError)
        } else {
          profileData = newProfile
        }
      }

      setProfile(profileData as Profile)
      if (profileData) {
        setFormData({
          full_name: (profileData as any).full_name || '',
          phone: (profileData as any).phone || '',
          location: (profileData as any).location || '',
          university: (profileData as any).university || '',
          career: (profileData as any).career || '',
          bio: (profileData as any).bio || '',
          birth_date: (profileData as any).birth_date || '',
          gender: (profileData as any).gender || ''
        })
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      toast.error('Error al cargar los datos del perfil')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      toast.success('Perfil actualizado exitosamente')
      loadUserData() // Reload data
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Error al guardar el perfil')
    } finally {
      setSaving(false)
    }
  }

  function handleInputChange(field: keyof FormData, value: string) {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Cargando perfil...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/70 via-purple-900/15 to-slate-900/70 p-6 border border-gray-800/30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/3 via-blue-600/3 to-cyan-600/3" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/60 to-blue-600/60 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Mi Perfil
              </h1>
              <p className="text-gray-400 text-sm">Gestiona tu información personal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Picture & Basic Info */}
        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
          <CardHeader className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/60 to-blue-500/60 flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-white">
              {formData.full_name || user?.email?.split('@')[0] || 'Usuario'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {user?.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-gradient-to-r from-purple-500/70 to-blue-500/70 hover:from-purple-600/70 hover:to-blue-600/70">
              Cambiar Avatar
            </Button>
            <div className="text-center text-xs text-gray-500">
              Última actualización: {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString('es-ES') : 'Nunca'}
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2 border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription className="text-gray-400">
              Actualiza tu información personal y de contacto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-gray-300">Nombre Completo</Label>
                <Input 
                  className="bg-gray-800/50 border-gray-700/50 text-white"
                  placeholder="Tu nombre completo"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input 
                  className="bg-gray-800/50 border-gray-700/50 text-white"
                  value={user?.email || ''}
                  disabled
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-gray-300">Teléfono</Label>
                <Input 
                  className="bg-gray-800/50 border-gray-700/50 text-white"
                  placeholder="+593 999 999 999"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Ubicación</Label>
                <Input 
                  className="bg-gray-800/50 border-gray-700/50 text-white"
                  placeholder="Ciudad, País"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-gray-300">Universidad</Label>
                <Input 
                  className="bg-gray-800/50 border-gray-700/50 text-white"
                  placeholder="Nombre de tu universidad"
                  value={formData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Carrera</Label>
                <Input 
                  className="bg-gray-800/50 border-gray-700/50 text-white"
                  placeholder="Tu carrera universitaria"
                  value={formData.career}
                  onChange={(e) => handleInputChange('career', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Biografía</Label>
              <Textarea 
                className="bg-gray-800/50 border-gray-700/50 text-white min-h-[100px]"
                placeholder="Cuéntanos un poco sobre ti..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-gray-300">Fecha de Nacimiento</Label>
                <Input 
                  type="date"
                  className="bg-gray-800/50 border-gray-700/50 text-white"
                  value={formData.birth_date}
                  onChange={(e) => handleInputChange('birth_date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Género</Label>
                <select 
                  className="w-full bg-gray-800/50 border border-gray-700/50 text-white rounded-md px-3 py-2"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                  <option value="prefer_not_to_say">Prefiero no decir</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                className="flex-1 bg-gradient-to-r from-green-500/70 to-emerald-500/70 hover:from-green-600/70 hover:to-emerald-600/70"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
                onClick={() => {
                  setFormData({
                    full_name: profile?.full_name || '',
                    phone: profile?.phone || '',
                    location: profile?.location || '',
                    university: profile?.university || '',
                    career: profile?.career || '',
                    bio: profile?.bio || '',
                    birth_date: profile?.birth_date || '',
                    gender: profile?.gender || ''
                  })
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/60 to-emerald-500/60 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Miembro desde</h3>
                <p className="text-xs text-gray-400">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('es-ES') : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/60 to-cyan-500/60 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Email Verificado</h3>
                <p className="text-xs text-gray-400">
                  {user?.email_confirmed_at ? 'Verificado' : 'Pendiente'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/60 to-red-500/60 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Ubicación</h3>
                <p className="text-xs text-gray-400">
                  {formData.location || 'No especificado'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
