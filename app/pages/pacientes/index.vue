<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Pacientes</h1>

    <Button
      variant="primary"
      @click="router.push('/pacientes/novo')"
    >
      Novo Paciente
    </Button>

    <Table :columns="columns" :data="pacientes" class="mt-4">
      <template #acoes="{ row }">
        <div class="flex gap-2">
          <Button variant="primary" @click="editar(row)">
            Editar
          </Button>
          <Button variant="secondary" @click="abrirModal(row.id)">
            Excluir
          </Button>
        </div>
      </template>
    </Table>

    <ConfirmModal
      :open="modalOpen"
      title="Remover paciente"
      message="Deseja realmente remover este paciente? Esta ação não poderá ser desfeita."
      @confirm="confirmarExclusao"
      @cancel="fecharModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Table from '~/components/Table.vue'
import Button from '~/components/Button.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { usePacientes } from '~/composables/usePacientes'

const router = useRouter()
const { pacientes, remover } = usePacientes()

const columns = [
  { name: 'Nome', key: 'nome' },
  { name: 'Data de Nascimento', key: 'nascimento' },
  { name: 'Ações', key: 'acoes' }
]

const modalOpen = ref(false)
const pacienteIdSelecionado = ref<number | null>(null)

function editar(row: any) {
  router.push(`/pacientes/${row.id}/editar`)
}

function abrirModal(id: number) {
  pacienteIdSelecionado.value = id
  modalOpen.value = true
}

function fecharModal() {
  modalOpen.value = false
  pacienteIdSelecionado.value = null
}

function confirmarExclusao() {
  if (pacienteIdSelecionado.value !== null) {
    remover(pacienteIdSelecionado.value)
  }
  fecharModal()
}
</script>
