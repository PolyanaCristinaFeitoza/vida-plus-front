import { ref } from 'vue'

export interface Paciente {
  id: number
  nome: string
  nascimento: string
}

const pacientes = ref<Paciente[]>([
  { id: 1, nome: 'Maria Silva', nascimento: '1985-07-12' },
  { id: 2, nome: 'João Santos', nascimento: '1990-02-23' }
])

export function usePacientes() {
  function adicionar(paciente: Paciente) {
    const jaExiste = pacientes.value.some(
      p => p.id === paciente.id
    )

    if (!jaExiste) {
      pacientes.value = [...pacientes.value, paciente]
    }
  }

  function editar(id: number, dados: Paciente) {
    const index = pacientes.value.findIndex(p => p.id === id)
    if (index !== -1) {
      pacientes.value[index] = dados
    }
  }

  function remover(id: number) {
    pacientes.value = pacientes.value.filter(p => p.id !== id)
  }

  return {
    pacientes,
    adicionar,
    editar,
    remover
  }
}
