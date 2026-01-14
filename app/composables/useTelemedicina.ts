import { ref } from 'vue'

export interface Teleconsulta {
  id: number
  paciente: string
  profissional: string
  data: string
  status: 'Agendada' | 'Em andamento' | 'Finalizada'
  observacoes?: string
}

const teleconsultas = ref<Teleconsulta[]>([
  {
    id: 1,
    paciente: 'Ana Costa',
    profissional: 'Dr. João Silva',
    data: '2026-01-15',
    status: 'Agendada'
  },
  {
    id: 2,
    paciente: 'Carlos Lima',
    profissional: 'Dra. Paula Mendes',
    data: '2026-01-16',
    status: 'Finalizada',
    observacoes: 'Paciente com quadro estável.'
  }
])

export function useTelemedicina() {
  function iniciar(id: number) {
    const consulta = teleconsultas.value.find(c => c.id === id)
    if (consulta) consulta.status = 'Em andamento'
  }

  function finalizar(id: number, observacoes: string) {
    const consulta = teleconsultas.value.find(c => c.id === id)
    if (consulta) {
      consulta.status = 'Finalizada'
      consulta.observacoes = observacoes
    }
  }

  return {
    teleconsultas,
    iniciar,
    finalizar
  }
}
