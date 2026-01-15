<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div class="bg-white w-full max-w-2xl p-10 rounded-3xl shadow-2xl">
      
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">
          Olá, <span class="text-blue-600">profissional da saúde</span>!
        </h1>

        <p class="mt-3 text-gray-600 text-lg">
          Selecione a área de acesso
        </p>
      </div>

      <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-center text-blue-700 text-sm">
        Escolha seu perfil para acessar o sistema de forma segura e personalizada.
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button variant="primary" class="py-4 text-base" @click="entrar('admin')">
          Administradores
        </Button>

        <Button variant="primary" class="py-4 text-base" @click="entrar('profissional')">
          Profissionais
        </Button>

        <Button variant="primary" class="py-4 text-base" @click="entrar('paciente')">
          Pacientes
        </Button>

        <Button variant="primary" class="py-4 text-base" @click="entrar('telemedicina')">
          Telemedicina
        </Button>
      </div>
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

