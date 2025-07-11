import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function TestPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container-modern py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Página de Prueba</h1>
        <p className="text-gray-300">
          Esta es una página de prueba para verificar que la navegación funciona correctamente.
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-card/50 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-2">Usuario Autenticado</h2>
            <p className="text-gray-300">Email: {user.email}</p>
            <p className="text-gray-300">ID: {user.id}</p>
          </div>
          
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h2 className="text-xl font-semibold text-green-400 mb-2">Estado de la Navegación</h2>
            <p className="text-gray-300">✅ La página de prueba se carga correctamente</p>
            <p className="text-gray-300">✅ La autenticación funciona</p>
            <p className="text-gray-300">✅ El diseño moderno se aplica</p>
          </div>
        </div>
      </div>
    </div>
  )
}
