import { ref, computed } from 'vue'

export interface Leito {
  id: number
  numero: string
  setor: string
  status: 'Disponível' | 'Ocupado'
}

const leitos = ref<Leito[]>([
  { id: 1, numero: '101', setor: 'UTI', status: 'Ocupado' },
  { id: 2, numero: '102', setor: 'UTI', status: 'Disponível' },
  { id: 3, numero: '201', setor: 'Enfermaria', status: 'Disponível' }
])

export function useLeitos() {
  function adicionar(leito: Leito) {
    leitos.value.push(leito)
  }

  function alterarStatus(id: number) {
    const leito = leitos.value.find(l => l.id === id)
    if (leito) {
      leito.status = leito.status === 'Disponível' ? 'Ocupado' : 'Disponível'
    }
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
    adicionar,
    alterarStatus,
    totalLeitos,
    disponiveis,
    ocupados
  }
}
