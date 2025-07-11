'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainNavHybrid({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', isActive: pathname === '/dashboard' },
    { href: '/subjects', label: 'Materias', isActive: pathname === '/subjects' || pathname.startsWith('/subjects') },
    { href: '/semesters', label: 'Semestres', isActive: pathname === '/semesters' || pathname.startsWith('/semesters') }
  ]

  // Método de navegación forzada para casos problemáticos
  const forceNavigation = (href: string) => {
    console.log(`🔥 FORZANDO navegación a: ${href}`)
    
    // Método 1: Intenta router primero
    try {
      router.push(href)
    } catch (error) {
      console.warn('Router falló, usando window.location')
    }
    
    // Método 2: Fallback garantizado
    setTimeout(() => {
      if (window.location.pathname !== href) {
        console.log('💪 Ejecutando navegación forzada')
        window.location.href = href
      }
    }, 50)
  }

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    console.log(`🎯 Click interceptado para: ${href}`)
    forceNavigation(href)
  }
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {/* Logo - Triple seguridad */}
      <div className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
        <Link 
          href="/dashboard"
          onClick={(e) => handleLinkClick(e, '/dashboard')}
          className="flex items-center space-x-3"
        >
          <div className="relative">
            <Image 
              src="/Yachay_Logo.png" 
              alt="Yachay Logo" 
              width={32} 
              height={32} 
              className="transition-transform group-hover:scale-110 group-hover:rotate-3 rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
          </div>
          <span className="font-bold text-xl text-white group-hover:text-cyan-400 transition-all">Yachay</span>
        </Link>
        
        {/* Botón de respaldo invisible sobre el logo */}
        <button
          onClick={() => forceNavigation('/dashboard')}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          type="button"
          aria-label="Ir al Dashboard"
        />
      </div>
      
      {/* Botones de navegación - Triple seguridad */}
      {navItems.map((item) => (
        <div key={item.href} className="relative">
          <Link
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.href)}
            className={cn(
              "text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg border border-transparent hover:scale-105 inline-block relative z-0",
              item.isActive 
                ? "text-white bg-blue-600 border-blue-500 shadow-lg" 
                : "text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-700"
            )}
          >
            {item.label}
          </Link>
          
          {/* Botón de respaldo invisible */}
          <button
            onClick={() => forceNavigation(item.href)}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            type="button"
            aria-label={`Ir a ${item.label}`}
          />
        </div>
      ))}
    </nav>
  )
}
