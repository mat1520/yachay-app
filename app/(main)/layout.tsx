import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MainNavHybrid } from '@/components/core/main-nav-hybrid'
import { UserNav } from '@/components/core/user-nav'
import { Footer } from '@/components/core/footer'
import { MagicCursor } from '@/components/ui/magic-cursor'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Cursor mágico */}
      <MagicCursor />
      
      {/* Grid futurista de fondo */}
      <div className="fixed inset-0 futuristic-grid opacity-20 pointer-events-none" />
      
      {/* Header con diseño épico */}
      <header className="nav-modern relative z-50">
        <div className="container-modern">
          <div className="flex h-16 items-center justify-between">
            <div className="relative">
              <MainNavHybrid />
              <div className="absolute -inset-2 bg-gradient-primary opacity-5 blur-xl rounded-lg" />
            </div>
            <div className="flex items-center space-x-4 relative">
              <div className="absolute -inset-2 bg-gradient-secondary opacity-5 blur-xl rounded-lg" />
              <UserNav 
                user={{
                  name: profile?.full_name || user.email || 'Usuario',
                  email: user.email || '',
                  avatar: profile?.avatar_url || null
                }} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content con efectos épicos */}
      <main className="flex-1 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 via-transparent to-cyan-500/3 pointer-events-none" />
        <div className="relative z-20">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
