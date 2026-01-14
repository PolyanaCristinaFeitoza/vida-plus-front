import { ref, computed } from 'vue'

export type Perfil = 'admin' | 'profissional' | 'paciente' | 'telemedicina'

const usuario = ref<{
  nome: string
  perfil: Perfil
} | null>(null)

export function useAuth() {
  function login(perfil: Perfil) {
    usuario.value = {
      nome: perfil.toUpperCase(),
      perfil
    }
  }

  function logout() {
    usuario.value = null
  }

  const isAdmin = computed(() => usuario.value?.perfil === 'admin')
  const isProfissional = computed(() => usuario.value?.perfil === 'profissional')
  const isPaciente = computed(() => usuario.value?.perfil === 'paciente')

  return {
    usuario,
    login,
    logout,
    isAdmin,
    isProfissional,
    isPaciente
  }
}
