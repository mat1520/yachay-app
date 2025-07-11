import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { AuthListener } from '@/components/auth/auth-listener'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yachay App - El poder de tu conocimiento, en tus manos',
  description: 'Un dashboard académico personal para estudiantes universitarios en Ecuador. Organiza materias, calcula promedios y gestiona fechas de entrega.',
  authors: [{ name: 'mat1520', url: 'https://github.com/mat1520' }],
  creator: 'mat1520',
  keywords: ['universidad', 'académico', 'notas', 'promedio', 'Ecuador', 'estudiantes'],
  openGraph: {
    title: 'Yachay App',
    description: 'El poder de tu conocimiento, en tus manos',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthListener>
          {children}
        </AuthListener>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
