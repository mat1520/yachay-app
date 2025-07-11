import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { User, Mail, Phone, MapPin, Calendar, Edit, Save } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 p-6 border border-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-cyan-600/5" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/80 to-blue-600/80 flex items-center justify-center">
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
        <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
          <CardHeader className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/80 to-blue-500/80 flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-white">
              {profile?.full_name || user.email?.split('@')[0] || 'Usuario'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {user.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-600/80 hover:to-blue-600/80">
              <Edit className="h-4 w-4 mr-2" />
              Cambiar Foto
            </Button>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="text-lg font-bold text-white">--</div>
                <div className="text-xs text-gray-400">Materias</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="text-lg font-bold text-white">--</div>
                <div className="text-xs text-gray-400">Semestres</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2 border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
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
                <Label htmlFor="full_name" className="text-gray-300">Nombre Completo</Label>
                <Input
                  id="full_name"
                  placeholder="Tu nombre completo"
                  defaultValue={profile?.full_name || ''}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user.email || ''}
                  disabled
                  className="bg-gray-800/30 border-gray-700/50 text-gray-400"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="Tu número de teléfono"
                  defaultValue={profile?.phone || ''}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university" className="text-gray-300">Universidad</Label>
                <Input
                  id="university"
                  placeholder="Tu universidad"
                  defaultValue={profile?.university || ''}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="career" className="text-gray-300">Carrera</Label>
                <Input
                  id="career"
                  placeholder="Tu carrera universitaria"
                  defaultValue={profile?.career || ''}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student_id" className="text-gray-300">Código Estudiantil</Label>
                <Input
                  id="student_id"
                  placeholder="Tu código de estudiante"
                  defaultValue={profile?.student_id || ''}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-300">Biografía</Label>
              <Textarea
                id="bio"
                placeholder="Cuéntanos un poco sobre ti..."
                defaultValue={profile?.bio || ''}
                className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 min-h-[100px]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-600/80 hover:to-blue-600/80">
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
              <Button variant="outline" className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/80 to-emerald-500/80 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Miembro desde</h3>
                <p className="text-xs text-gray-400">
                  {new Date(user.created_at).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/80 to-cyan-500/80 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Email Verificado</h3>
                <p className="text-xs text-gray-400">
                  {user.email_confirmed_at ? 'Verificado' : 'Pendiente'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/80 to-red-500/80 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Ubicación</h3>
                <p className="text-xs text-gray-400">
                  {profile?.location || 'No especificado'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
