import { ref, computed } from 'vue'

export interface Leito {
  id: number
  numero: string
  setor: string
  status: 'Disponível' | 'Ocupado'
}

export function useLeitos() {
  const leitos = useState<Leito[]>('leitos', () => [
    { id: 1, numero: '101', setor: 'UTI', status: 'Ocupado' },
    { id: 2, numero: '102', setor: 'UTI', status: 'Disponível' },
    { id: 3, numero: '201', setor: 'Enfermaria', status: 'Disponível' }
  ])

  function alterarStatus(id: number) {
    leitos.value = leitos.value.map(l =>
      l.id === id
        ? { ...l, status: l.status === 'Disponível' ? 'Ocupado' : 'Disponível' }
        : l
    )
  }

  const totalLeitos = computed(() => leitos.value.length)
  const disponiveis = computed(
    () => leitos.value.filter(l => l.status === 'Disponível').length
  )
  const ocupados = computed(
    () => leitos.value.filter(l => l.status === 'Ocupado').length
  )

  return {
    leitos,
    alterarStatus,
    totalLeitos,
    disponiveis,
    ocupados
  }
}
