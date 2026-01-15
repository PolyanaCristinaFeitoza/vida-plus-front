<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-[10px]">
      Profissionais de <span class="text-blue-600">Saúde</span>
    </h1>

    <Button variant="primary" @click="router.push('/profissionais/novo')">
      Novo Profissional
    </Button>

    <Table :columns="columns" :data="profissionais" class="mt-4">
      <template #acoes="{ row }">
        <div class="flex justify-center gap-2">
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
      :open="modalAberto"
      title="Remover profissional"
      message="Tem certeza que deseja remover este profissional? Esta ação não poderá ser desfeita."
      @confirm="confirmarExclusao"
      @cancel="fecharModal"
    />
  </div>
</template>

<script setup lang="ts">
import Table from '~/components/Table.vue'
import Button from '~/components/Button.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { useProfissionais } from '../../composables/useProfissionais'
import { useRouter } from '#app'
import { ref } from 'vue'

const router = useRouter()
const { profissionais, remover } = useProfissionais()

const modalAberto = ref(false)
const profissionalIdSelecionado = ref<number | null>(null)

const columns = [
  { name: 'Nome', key: 'nome' },
  { name: 'Especialidade', key: 'especialidade' },
  { name: 'Ações', key: 'acoes' }
]

function editar(row: any) {
  router.push(`/profissionais/${row.id}/editar`)
}

function abrirModal(id: number) {
  profissionalIdSelecionado.value = id
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  profissionalIdSelecionado.value = null
}

function confirmarExclusao() {
  if (profissionalIdSelecionado.value !== null) {
    remover(profissionalIdSelecionado.value)
  }
  fecharModal()
}
</script>
