<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Telemedicina</h1>

    <Table :columns="columns" :data="teleconsultas">
      <template #status="{ row }">
        <span
          :class="{
            'text-yellow-600': row.status === 'Agendada',
            'text-blue-600': row.status === 'Em andamento',
            'text-green-600': row.status === 'Finalizada'
          }"
        >
          {{ row.status }}
        </span>
      </template>

      <template #acoes="{ row }">
        <Button
          v-if="row.status === 'Agendada'"
          variant="primary"
          @click="iniciarConsulta(row.id)"
        >
          Iniciar
        </Button>

        <Button
          v-if="row.status === 'Em andamento'"
          variant="secondary"
          @click="abrirFinalizar(row.id)"
        >
          Finalizar
        </Button>
      </template>
    </Table>

    <div
      v-if="consultaSelecionada !== null"
      class="mt-6 p-4 bg-white rounded shadow max-w-md mx-auto"
    >

      <h2 class="font-bold mb-2 text-gray-800">Registrar Observações</h2>

      <textarea
        v-model="observacoes"
        class="w-full border rounded p-2 mb-3 text-gray-800"
        placeholder="Descreva o atendimento..."
      />

      <Button variant="primary" @click="finalizarConsulta">
        Salvar Prontuário
      </Button>
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
