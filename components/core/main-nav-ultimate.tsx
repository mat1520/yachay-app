'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainNavUltimate({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', isActive: pathname === '/dashboard' },
    { href: '/subjects', label: 'Materias', isActive: pathname === '/subjects' || pathname.startsWith('/subjects') },
    { href: '/semesters', label: 'Semestres', isActive: pathname === '/semesters' || pathname.startsWith('/semesters') }
  ]

  const handleClick = (href: string) => {
    console.log(`🎯 Navegación directa a: ${href}`)
    window.location.href = href
  }
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {/* Logo */}
      <a 
        href="/dashboard"
        className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300"
        onClick={(e) => {
          e.preventDefault()
          handleClick('/dashboard')
        }}
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
      </a>
      
      {/* Navigation Items usando enlaces directos */}
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => {
            e.preventDefault()
            handleClick(item.href)
          }}
          className={cn(
            "text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer border border-transparent hover:scale-105 inline-block",
            item.isActive 
              ? "text-white bg-blue-600 border-blue-500 shadow-lg" 
              : "text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-700"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
