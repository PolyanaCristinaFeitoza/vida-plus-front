<template>
  <div class="max-w-md mx-auto mt-6 p-4 bg-white rounded shadow">
    <h1 class="text-xl font-bold mb-4 text-gray-800">
      Editar Paciente
    </h1>

    <div class="flex flex-col gap-3 mb-4">
      <label class="text-gray-800">
        Nome
        <input
          type="text"
          v-model="nome"
          class="w-full border px-2 py-1 rounded text-gray-600"
        />
      </label>

      <label class="text-gray-800">
        Data de Nascimento
        <input
          type="date"
          v-model="nascimento"
          class="w-full border px-2 py-1 rounded text-gray-600"
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

  <!-- Modal -->
  <ConfirmModal
    :open="modalOpen"
    :title="modalTitle"
    :message="modalMessage"
    @confirm="confirmarModal"
    @cancel="fecharModal"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from '~/components/Button.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { usePacientes } from '~/composables/usePacientes'

const router = useRouter()
const route = useRoute()
const { pacientes, editar } = usePacientes()

const nome = ref('')
const nascimento = ref('')

// controle do modal
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

onMounted(() => {
  const id = Number(route.params.id)
  const paciente = pacientes.value.find(p => p.id === id)

  if (!paciente) {
    abrirModal(
      'Paciente não encontrado',
      'O paciente selecionado não foi encontrado.',
      () => router.push('/pacientes')
    )
    return
  }

  nome.value = paciente.nome
  nascimento.value = paciente.nascimento
})

function salvar() {
  const id = Number(route.params.id)

  editar(id, {
    id,
    nome: nome.value,
    nascimento: nascimento.value
  })

  abrirModal(
    'Sucesso',
    'Paciente atualizado com sucesso!',
    () => router.push('/pacientes')
  )
}

function cancelar() {
  router.push('/pacientes')
}
</script>
