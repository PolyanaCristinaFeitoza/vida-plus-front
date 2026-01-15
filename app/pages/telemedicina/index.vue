<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-gray-800">
        <span class="text-blue-600">Telemedicina</span>
      </h1>
      <p class="mt-2 text-gray-600">
        Gerencie e acompanhe as teleconsultas em tempo real
      </p>
    </div>

    <Table :columns="columns" :data="teleconsultas">
      <template #status="{ row }">
        <span
          class="px-3 py-1 rounded-full text-sm font-semibold"
          :class="{
            'bg-yellow-100 text-yellow-700': row.status === 'Agendada',
            'bg-blue-100 text-blue-700': row.status === 'Em andamento',
            'bg-green-100 text-green-700': row.status === 'Finalizada'
          }"
        >
          {{ row.status }}
        </span>
      </template>

      <template #acoes="{ row }">
        <div class="flex justify-center gap-2">
          <Button
            v-if="row.status === 'Agendada'"
            variant="primary"
            class="px-4 py-2"
            @click="iniciarConsulta(row.id)"
          >
            Iniciar
          </Button>

          <Button
            v-if="row.status === 'Em andamento'"
            variant="secondary"
            class="px-4 py-2"
            @click="abrirFinalizar(row.id)"
          >
            Finalizar
          </Button>
        </div>
      </template>
    </Table>

    <div
      v-if="consultaSelecionada !== null"
      class="mt-10 max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8"
    >
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Registrar observações
      </h2>

      <textarea
        v-model="observacoes"
        rows="4"
        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               transition mb-6"
        placeholder="Descreva o atendimento realizado..."
      />

      <div class="flex justify-end">
        <Button variant="primary" class="px-6 py-3" @click="finalizarConsulta">
          Salvar prontuário
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
import Table from '~/components/Table.vue'
import Button from '~/components/Button.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { useTelemedicina } from '~/composables/useTelemedicina'

const { teleconsultas, iniciar, finalizar } = useTelemedicina()

const observacoes = ref('')
const consultaSelecionada = ref<number | null>(null)

const modalOpen = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
let acaoConfirmacao: (() => void) | null = null

const columns = [
  { name: 'Paciente', key: 'paciente' },
  { name: 'Profissional', key: 'profissional' },
  { name: 'Data', key: 'data' },
  { name: 'Status', key: 'status' },
  { name: 'Ações', key: 'acoes' }
]

function iniciarConsulta(id: number) {
  iniciar(id)

  modalTitle.value = 'Teleconsulta iniciada'
  modalMessage.value = 'A teleconsulta foi iniciada com sucesso.'
  acaoConfirmacao = null
  modalOpen.value = true
}

function abrirFinalizar(id: number) {
  consultaSelecionada.value = id
}

function finalizarConsulta() {
  if (consultaSelecionada.value === null) return

  finalizar(consultaSelecionada.value, observacoes.value)

  observacoes.value = ''
  consultaSelecionada.value = null

  modalTitle.value = 'Consulta finalizada'
  modalMessage.value = 'A consulta foi finalizada e o prontuário registrado.'
  acaoConfirmacao = null
  modalOpen.value = true
}

function confirmarModal() {
  modalOpen.value = false
  if (acaoConfirmacao) acaoConfirmacao()
  acaoConfirmacao = null
}

function fecharModal() {
  modalOpen.value = false
  acaoConfirmacao = null
}
</script>
