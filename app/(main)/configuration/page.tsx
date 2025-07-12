'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Bell, Shield, Palette, Globe, Download, Trash2, Key, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface UserSettings {
  id: string
  user_id: string
  notifications_email: boolean
  notifications_push: boolean
  notifications_deadlines: boolean
  theme: string
  language: string
  timezone: string
  auto_backup: boolean
  data_sharing: boolean
  marketing_emails: boolean
  created_at: string
  updated_at?: string
}

export default function ConfigurationPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settingsData, setSettingsData] = useState({
    notifications_email: true,
    notifications_push: true,
    notifications_deadlines: true,
    theme: 'dark',
    language: 'es',
    timezone: 'America/Guayaquil',
    auto_backup: false,
    data_sharing: false,
    marketing_emails: false
  })

  const supabase = createClient()

  useEffect(() => {
    loadUserSettings()
  }, [])

  async function loadUserSettings() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUser(user)

      // Usar localStorage temporalmente hasta que se configure la tabla user_settings
      const savedSettings = localStorage.getItem(`user_settings_${user.id}`)
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(parsedSettings)
        setSettingsData({
          notifications_email: parsedSettings.notifications_email,
          notifications_push: parsedSettings.notifications_push,
          notifications_deadlines: parsedSettings.notifications_deadlines,
          theme: parsedSettings.theme,
          language: parsedSettings.language,
          timezone: parsedSettings.timezone,
          auto_backup: parsedSettings.auto_backup,
          data_sharing: parsedSettings.data_sharing,
          marketing_emails: parsedSettings.marketing_emails
        })
      } else {
        // Crear configuración por defecto
        const defaultSettings: UserSettings = {
          id: Math.random().toString(),
          user_id: user.id,
          ...settingsData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setSettings(defaultSettings)
        localStorage.setItem(`user_settings_${user.id}`, JSON.stringify(defaultSettings))
      }
    } catch (error) {
      console.error('Error loading settings:', error)
      toast.error('Error al cargar la configuración')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!user) return

    setSaving(true)
    try {
      // Guardar en localStorage temporalmente
      const updatedSettings: UserSettings = {
        id: settings?.id || Math.random().toString(),
        user_id: user.id,
        ...settingsData,
        created_at: settings?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      localStorage.setItem(`user_settings_${user.id}`, JSON.stringify(updatedSettings))
      setSettings(updatedSettings)

      toast.success('Configuración guardada exitosamente')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Error al guardar la configuración')
    } finally {
      setSaving(false)
    }
  }

  function updateSetting(key: string, value: any) {
    setSettingsData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Cargando configuración...</span>
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
        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
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
              <Switch 
                checked={settingsData.notifications_email}
                onCheckedChange={(checked) => updateSetting('notifications_email', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Recordatorios de Tareas</Label>
                <p className="text-sm text-gray-500">Alertas antes de fechas de entrega</p>
              </div>
              <Switch 
                checked={settingsData.notifications_deadlines}
                onCheckedChange={(checked) => updateSetting('notifications_deadlines', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Notificaciones Push</Label>
                <p className="text-sm text-gray-500">Notificaciones en tiempo real</p>
              </div>
              <Switch 
                checked={settingsData.notifications_push}
                onCheckedChange={(checked) => updateSetting('notifications_push', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
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
              <Select 
                value={settingsData.theme} 
                onValueChange={(value) => updateSetting('theme', value)}
              >
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

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Copia de Seguridad Automática</Label>
                <p className="text-sm text-gray-500">Guardar datos automáticamente</p>
              </div>
              <Switch 
                checked={settingsData.auto_backup}
                onCheckedChange={(checked) => updateSetting('auto_backup', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
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
                <Label className="text-gray-300">Compartir Datos de Uso</Label>
                <p className="text-sm text-gray-500">Ayuda a mejorar la aplicación</p>
              </div>
              <Switch 
                checked={settingsData.data_sharing}
                onCheckedChange={(checked) => updateSetting('data_sharing', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-gray-300">Emails de Marketing</Label>
                <p className="text-sm text-gray-500">Recibir noticias y actualizaciones</p>
              </div>
              <Switch 
                checked={settingsData.marketing_emails}
                onCheckedChange={(checked) => updateSetting('marketing_emails', checked)}
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500/80 to-cyan-500/80 hover:from-blue-600/80 hover:to-cyan-600/80">
              <Key className="h-4 w-4 mr-2" />
              Cambiar Contraseña
            </Button>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
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
              <Select 
                value={settingsData.language} 
                onValueChange={(value) => updateSetting('language', value)}
              >
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
              <Select 
                value={settingsData.timezone} 
                onValueChange={(value) => updateSetting('timezone', value)}
              >
                <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Seleccionar zona horaria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Guayaquil">UTC-5 (Ecuador, Colombia, Perú)</SelectItem>
                  <SelectItem value="America/Argentina/Buenos_Aires">UTC-3 (Argentina, Chile)</SelectItem>
                  <SelectItem value="America/Mexico_City">UTC-6 (México)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Card className="border-gray-800/30 bg-gradient-to-br from-gray-900/60 to-gray-800/60">
        <CardContent className="p-6">
          <div className="flex gap-3">
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
                  Guardar Configuración
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
              onClick={() => {
                if (settings) {
                  setSettingsData({
                    notifications_email: settings.notifications_email,
                    notifications_push: settings.notifications_push,
                    notifications_deadlines: settings.notifications_deadlines,
                    theme: settings.theme,
                    language: settings.language,
                    timezone: settings.timezone,
                    auto_backup: settings.auto_backup,
                    data_sharing: settings.data_sharing,
                    marketing_emails: settings.marketing_emails
                  })
                }
              }}
            >
              Restaurar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-800/30 bg-gradient-to-br from-red-900/15 to-gray-900/60">
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
            <Download className="h-4 w-4 mr-2" />
            Exportar Datos
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
