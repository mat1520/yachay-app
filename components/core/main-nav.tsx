'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const handleNavClick = (href: string, label: string) => {
    console.log(`Navegando a: ${href} (${label})`)
    window.location.href = href
  }
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <button 
        onClick={() => handleNavClick('/dashboard', 'Logo/Home')}
        className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300"
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
        <span className="font-bold text-xl text-hologram group-hover:text-glow transition-all">Yachay</span>
      </button>
      
      <button
        onClick={() => handleNavClick('/dashboard', 'Dashboard')}
        className={cn(
          "text-sm font-medium transition-all duration-300 hover:text-primary card-hover-effect px-4 py-2 rounded-lg cursor-pointer relative group",
          pathname === "/dashboard" 
            ? "text-primary bg-primary/20 border border-primary/30 shadow-lg" 
            : "text-muted-foreground hover:bg-primary/10 hover:text-white hover:scale-105"
        )}
      >
        Dashboard
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
      </button>
      
      <button
        onClick={() => handleNavClick('/subjects', 'Materias')}
        className={cn(
          "text-sm font-medium transition-all duration-300 hover:text-primary card-hover-effect px-4 py-2 rounded-lg cursor-pointer relative group",
          pathname === "/subjects" || pathname.startsWith("/subjects")
            ? "text-primary bg-primary/20 border border-primary/30 shadow-lg" 
            : "text-muted-foreground hover:bg-primary/10 hover:text-white hover:scale-105"
        )}
      >
        Materias
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
      </button>
      
      <button
        onClick={() => handleNavClick('/semesters', 'Semestres')}
        className={cn(
          "text-sm font-medium transition-all duration-300 hover:text-primary card-hover-effect px-4 py-2 rounded-lg cursor-pointer relative group",
          pathname === "/semesters" || pathname.startsWith("/semesters")
            ? "text-primary bg-primary/20 border border-primary/30 shadow-lg" 
            : "text-muted-foreground hover:bg-primary/10 hover:text-white hover:scale-105"
        )}
      >
        Semestres
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
      </button>
    </nav>
  )
}
