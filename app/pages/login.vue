<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
    <h1 class="text-xl font-bold mb-4 text-gray-800">Olá, profissional da saúde!</h1>

    <p class="mb-4 text-sm text-gray-600">
      Selecione a área de acesso
    </p>

    <div class="flex flex-col gap-3">
      <Button variant="primary" @click="entrar('admin')">
        Administradores
      </Button>

      <Button variant="primary" @click="entrar('profissional')">
        Profissionais
      </Button>

      <Button variant="primary" @click="entrar('paciente')">
        Pacientes
      </Button>

       <Button variant="primary" @click="entrar('telemedicina')">
        Telemedicina
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/Button.vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from '#app'

const { login } = useAuth()
const router = useRouter()

function entrar(perfil: 'admin' | 'profissional' | 'paciente' | 'telemedicina') {
  login(perfil)

  const rotasPorPerfil = {
    admin: '/administracao',
    profissional: '/profissionais',
    paciente: '/pacientes',
    telemedicina: '/telemedicina'
  } as const

  router.push(rotasPorPerfil[perfil])
}
</script>

