<template>
  <div class="min-h-screen bg-gray-50 flex items-start justify-center p-8">
    <div class="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">
          Novo <span class="text-blue-600">Profissional</span>
        </h1>
        <p class="mt-2 text-gray-600">
          Cadastre um novo profissional de saúde no sistema
        </p>
      </div>

      <div class="flex flex-col gap-6 mb-10">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">
            Nome do profissional
          </label>
          <input
            v-model="nome"
            placeholder="Ex: Maria Silva"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">
            Especialidade
          </label>
          <input
            v-model="especialidade"
            placeholder="Ex: Cardiologia"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition"
          />
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <Button
          variant="secondary"
          class="px-6 py-3"
          @click="cancelar"
        >
          Cancelar
        </Button>

        <Button
          variant="primary"
          class="px-6 py-3"
          @click="salvar"
        >
          Salvar
        </Button>
      </div>
    </div>

    <MessageModal
      :open="modalAberto"
      :title="modalTitulo"
      :message="modalMensagem"
      @close="fecharModal"
    />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'
import Button from '~/components/Button.vue'
import MessageModal from '~/components/MessageModal.vue'
import { useProfissionais } from '../../composables/useProfissionais'

const router = useRouter()
const { adicionar } = useProfissionais()

const nome = ref('')
const especialidade = ref('')

const modalAberto = ref(false)
const modalTitulo = ref('')
const modalMensagem = ref('')
const redirectAposFechar = ref(false)

function abrirModal(titulo: string, mensagem: string, redirect = false) {
  modalTitulo.value = titulo
  modalMensagem.value = mensagem
  modalAberto.value = true
  redirectAposFechar.value = redirect
}

function fecharModal() {
  modalAberto.value = false

  if (redirectAposFechar.value) {
    router.push('/profissionais')
  }
}

function salvar() {
  if (!nome.value || !especialidade.value) {
    abrirModal(
      'Campos obrigatórios',
      'Preencha todos os campos antes de salvar.'
    )
    return
  }

  adicionar({
    id: Date.now(),
    nome: nome.value,
    especialidade: especialidade.value
  })

  abrirModal(
    'Sucesso',
    'Profissional cadastrado com sucesso!',
    true
  )
}

function cancelar() {
  router.push('/profissionais')
}
</script>


