'use client'

import { Button } from '@/components/ui/button'
import { setActiveSemesterAction } from '@/lib/actions/semester-actions'
import { Settings } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Props {
  semesterId: number
}

export function ActivateSemesterButton({ semesterId }: Props) {
  const router = useRouter()

  const handleActivate = async () => {
    try {
      const result = await setActiveSemesterAction(semesterId)
      
      if (result.success) {
        toast.success('Semestre activado correctamente')
        router.refresh()
      } else {
        toast.error(result.error || 'Error al activar el semestre')
      }
    } catch (error) {
      toast.error('Error inesperado al activar el semestre')
    }
  }

  return (
    <Button onClick={handleActivate} variant="default">
      <Settings className="h-4 w-4 mr-2" />
      Activar Semestre
    </Button>
  )
}
