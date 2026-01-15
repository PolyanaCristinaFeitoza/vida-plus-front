<template>
  <div class="min-h-screen bg-gray-50 flex items-start justify-center p-8">
    <div class="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">
          Novo <span class="text-blue-600">Paciente</span>
        </h1>
        <p class="mt-2 text-gray-600">
          Cadastre um novo paciente no sistema
        </p>
      </div>

      <div class="flex flex-col gap-6 mb-10">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">
            Nome do paciente
          </label>
          <input
            type="text"
            v-model="nome"
            placeholder="Ex: João da Silva"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">
            Data de nascimento
          </label>
          <input
            type="date"
            v-model="nascimento"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition"
          />
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <Button variant="secondary" class="px-6 py-3" @click="cancelar">
          Cancelar
        </Button>
        <Button variant="primary" class="px-6 py-3" @click="salvar">
          Salvar
        </Button>
      </div>
    </div>

    <ConfirmModal
      :open="modalOpen"
      :title="modalTitle"
      :message="modalMessage"
      @confirm="confirmarModal"
      @cancel="fecharModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '~/components/Button.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { usePacientes } from '../../composables/usePacientes'

const router = useRouter()
const { adicionar } = usePacientes()

const nome = ref('')
const nascimento = ref('')

const modalOpen = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const acaoConfirmar = ref<null | (() => void)>(null)

function abrirModal(
  title: string,
  message: string,
  onConfirm?: () => void
) {
  modalTitle.value = title
  modalMessage.value = message
  acaoConfirmar.value = onConfirm || null
  modalOpen.value = true
}

function fecharModal() {
  modalOpen.value = false
  acaoConfirmar.value = null
}

function confirmarModal() {
  if (acaoConfirmar.value) {
    acaoConfirmar.value()
  }
  fecharModal()
}

function salvar() {
  if (!nome.value || !nascimento.value) {
    abrirModal(
      'Campos obrigatórios',
      'Preencha todos os campos antes de salvar.'
    )
    return
  }

  adicionar({
    id: Date.now(),
    nome: nome.value,
    nascimento: nascimento.value
  })

  abrirModal(
    'Sucesso',
    'Paciente adicionado com sucesso!',
    () => router.push('/pacientes')
  )
}

function cancelar() {
  router.push('/pacientes')
}
</script>
