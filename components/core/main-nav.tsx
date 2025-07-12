'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', isActive: pathname === '/dashboard' },
    { href: '/subjects', label: 'Materias', isActive: pathname === '/subjects' || pathname.startsWith('/subjects') },
    { href: '/semesters', label: 'Semestres', isActive: pathname === '/semesters' || pathname.startsWith('/semesters') }
  ]

  const handleNavigation = (href: string, event: React.MouseEvent) => {
    event.preventDefault()
    
    try {
      router.push(href)
      
      setTimeout(() => {
        if (window.location.pathname !== href) {
          window.location.href = href
        }
      }, 100)
      
    } catch (error) {
      window.location.href = href
    }
  }
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {/* Logo clickeable */}
      <button 
        onClick={(e) => handleNavigation('/dashboard', e)}
        className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300 bg-transparent border-none p-0"
        type="button"
      >
        <div className="relative">
          <Image 
            src="/Yachay_Logo.png" 
            alt="Yachay Logo" 
            width={40} 
            height={40} 
            className="transition-transform group-hover:scale-110 group-hover:rotate-3 rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
        </div>
        <span className="font-bold text-2xl text-white group-hover:text-cyan-400 transition-all">Yachay</span>
      </button>
      
      {/* Botones de navegación */}
      {navItems.map((item) => (
        <button
          key={item.href}
          onClick={(e) => handleNavigation(item.href, e)}
          className={cn(
            "text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer border border-transparent hover:scale-105 bg-transparent",
            item.isActive 
              ? "text-white bg-blue-600 border-blue-500 shadow-lg" 
              : "text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-700"
          )}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
