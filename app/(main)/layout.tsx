import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MainNav } from '@/components/core/main-nav'
import { UserNav } from '@/components/core/user-nav'
import { Footer } from '@/components/core/footer'

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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header con diseño moderno */}
      <header className="nav-modern">
        <div className="container-modern">
          <div className="flex h-16 items-center justify-between">
            <MainNav />
            <div className="flex items-center space-x-4">
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

      {/* Main Content con glassmorphism */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
