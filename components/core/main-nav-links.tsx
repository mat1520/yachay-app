'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainNavLinks({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', isActive: pathname === '/dashboard' },
    { href: '/subjects', label: 'Materias', isActive: pathname === '/subjects' || pathname.startsWith('/subjects') },
    { href: '/semesters', label: 'Semestres', isActive: pathname === '/semesters' || pathname.startsWith('/semesters') }
  ]
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {/* Logo clickeable con Link */}
      <Link 
        href="/dashboard"
        className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300"
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
      </Link>
      
      {/* Botones de navegación con Links */}
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg border border-transparent hover:scale-105 inline-block",
            item.isActive 
              ? "text-white bg-blue-600 border-blue-500 shadow-lg" 
              : "text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-700"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
