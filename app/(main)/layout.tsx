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
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
          <div className="ml-auto">
            <UserNav 
              user={{
                name: profile?.full_name || user.email || 'Usuario',
                email: user.email || '',
                avatar: profile?.avatar_url || null
              }} 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
