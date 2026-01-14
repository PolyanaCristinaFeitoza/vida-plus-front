import { ref } from 'vue'

export interface Profissional {
  id: number
  nome: string
  especialidade: string
}

const profissionais = ref<Profissional[]>([
  { id: 1, nome: 'Dr. João Silva', especialidade: 'Cardiologia' },
  { id: 2, nome: 'Enf. Maria Souza', especialidade: 'Enfermagem' }
])

export function useProfissionais() {
  function adicionar(profissional: Profissional) {
    const jaExiste = profissionais.value.some(
      p => p.id === profissional.id
    )

    if (!jaExiste) {
      profissionais.value = [...profissionais.value, profissional]
    }
  }

  function editar(id: number, dados: Profissional) {
    const index = profissionais.value.findIndex(p => p.id === id)
    if (index !== -1) {
      profissionais.value[index] = dados
    }
  }

  function remover(id: number) {
    profissionais.value = profissionais.value.filter(p => p.id !== id)
  }

  return {
    profissionais,
    adicionar,
    editar,
    remover
  }
}
