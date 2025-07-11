import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Bell, Shield, Palette, Globe, Download, Trash2, Key } from 'lucide-react'

export default async function ConfigurationPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 p-6 border border-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-cyan-600/5" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/80 to-blue-600/80 flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Configuración
              </h1>
              <p className="text-gray-400 text-sm">Personaliza tu experiencia en Yachay</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notifications Settings */}
        <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription className="text-gray-400">
              Configura cómo y cuándo recibir notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Notificaciones de Email</Label>
                <p className="text-sm text-gray-500">Recibe emails sobre entregas y tareas</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Recordatorios de Tareas</Label>
                <p className="text-sm text-gray-500">Alertas antes de fechas de entrega</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Notificaciones Push</Label>
                <p className="text-sm text-gray-500">Notificaciones en tiempo real</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Frecuencia de Recordatorios</Label>
              <Select>
                <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Seleccionar frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hora antes</SelectItem>
                  <SelectItem value="24h">1 día antes</SelectItem>
                  <SelectItem value="3d">3 días antes</SelectItem>
                  <SelectItem value="1w">1 semana antes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apariencia
            </CardTitle>
            <CardDescription className="text-gray-400">
              Personaliza la interfaz de la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-300">Tema</Label>
              <Select>
                <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Seleccionar tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Oscuro</SelectItem>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="auto">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Color de Acento</Label>
              <div className="grid grid-cols-4 gap-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 cursor-pointer border-2 border-purple-400"></div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 cursor-pointer border-2 border-transparent hover:border-green-400"></div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 cursor-pointer border-2 border-transparent hover:border-orange-400"></div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-violet-500 cursor-pointer border-2 border-transparent hover:border-pink-400"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Animaciones</Label>
                <p className="text-sm text-gray-500">Efectos de transición y animaciones</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Efectos de Partículas</Label>
                <p className="text-sm text-gray-500">Partículas en el fondo</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacidad y Seguridad
            </CardTitle>
            <CardDescription className="text-gray-400">
              Gestiona tu privacidad y seguridad de cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Perfil Público</Label>
                <p className="text-sm text-gray-500">Permite que otros vean tu perfil</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Análisis de Uso</Label>
                <p className="text-sm text-gray-500">Ayuda a mejorar la aplicación</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500/80 to-cyan-500/80 hover:from-blue-600/80 hover:to-cyan-600/80">
              <Key className="h-4 w-4 mr-2" />
              Cambiar Contraseña
            </Button>

            <Button variant="outline" className="w-full border-gray-700/50 text-gray-300 hover:bg-gray-800/50">
              <Download className="h-4 w-4 mr-2" />
              Exportar Datos
            </Button>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Idioma y Región
            </CardTitle>
            <CardDescription className="text-gray-400">
              Configura idioma y preferencias regionales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-300">Idioma</Label>
              <Select>
                <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Seleccionar idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Zona Horaria</Label>
              <Select>
                <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Seleccionar zona horaria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-5">UTC-5 (Ecuador, Colombia, Perú)</SelectItem>
                  <SelectItem value="utc-3">UTC-3 (Argentina, Chile)</SelectItem>
                  <SelectItem value="utc-6">UTC-6 (México)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Formato de Fecha</Label>
              <Select>
                <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Seleccionar formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-red-800/50 bg-gradient-to-br from-red-900/20 to-gray-900/80">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Zona de Peligro
          </CardTitle>
          <CardDescription className="text-gray-400">
            Acciones irreversibles que afectan permanentemente tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full border-red-700/50 text-red-400 hover:bg-red-900/20">
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar Todos los Datos
          </Button>
          <Button variant="outline" className="w-full border-red-700/50 text-red-400 hover:bg-red-900/20">
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar Cuenta
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
