import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/dashboard" className="flex items-center space-x-2">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">Yachay</span>
      </Link>
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/subjects"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Materias
      </Link>
      <Link
        href="/semesters"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Semestres
      </Link>
    </nav>
  )
}
