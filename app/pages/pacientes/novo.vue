<template>
  <div class="max-w-md mx-auto mt-6 p-4 bg-white rounded shadow">
    <h1 class="text-xl font-bold mb-4 text-gray-800">Novo Paciente</h1>

    <div class="flex flex-col gap-3 mb-4">
      <label class="text-gray-800">
        Nome
        <input
          type="text"
          v-model="nome"
          class="w-full border px-2 py-1 rounded text-gray-800"
        />
      </label>

      <label class="text-gray-800">
        Data de Nascimento
        <input
          type="date"
          v-model="nascimento"
          class="w-full border px-2 py-1 rounded text-gray-800"
        />
      </label>
    </div>

    <div class="flex gap-2">
      <Button variant="primary" @click="salvar">
        Salvar
      </Button>
      <Button variant="secondary" @click="cancelar">
        Cancelar
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
