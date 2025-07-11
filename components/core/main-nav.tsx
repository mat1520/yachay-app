'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/dashboard" className="flex items-center space-x-3 group">
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
      </Link>
      
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary card-hover-effect px-3 py-2 rounded-lg cursor-pointer",
          pathname === "/dashboard" 
            ? "text-primary bg-primary/10 border border-primary/20" 
            : "text-muted-foreground hover:bg-primary/5 hover:text-white"
        )}
      >
        Dashboard
      </Link>
      
      <Link
        href="/subjects"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary card-hover-effect px-3 py-2 rounded-lg cursor-pointer",
          pathname === "/subjects" || pathname.startsWith("/subjects")
            ? "text-primary bg-primary/10 border border-primary/20" 
            : "text-muted-foreground hover:bg-primary/5 hover:text-white"
        )}
      >
        Materias
      </Link>
      
      <Link
        href="/semesters"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary card-hover-effect px-3 py-2 rounded-lg cursor-pointer",
          pathname === "/semesters" || pathname.startsWith("/semesters")
            ? "text-primary bg-primary/10 border border-primary/20" 
            : "text-muted-foreground hover:bg-primary/5 hover:text-white"
        )}
      >
        Semestres
      </Link>
    </nav>
  )
}
