<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Administração Hospitalar</h1>

    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="p-4 bg-white rounded shadow">
        <strong class="text-gray-800">Total de Leitos</strong>
        <p class="text-xl text-gray-800">{{ totalLeitos }}</p>
      </div>

      <div class="p-4 bg-green-300 rounded shadow">
        <strong class="text-gray-800">Disponíveis</strong>
        <p class="text-xl text-gray-800">{{ disponiveis }}</p>
      </div>

      <div class="p-4 bg-red-300 rounded shadow">
        <strong class="text-gray-800">Ocupados</strong>
        <p class="text-xl text-gray-800">{{ ocupados }}</p>
      </div>
    </div>

    <Table :columns="columns" :data="leitos">
      <template #status="{ row }">
        <span
          :class="row.status === 'Disponível'
            ? 'text-green-300 font-semibold'
            : 'text-red-300 font-semibold'"
        >
          {{ row.status }}
        </span>
      </template>

      <template #acoes="{ row }">
        <Button variant="primary" @click="alterarStatus(row.id)">
          Alterar Status
        </Button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Table from '/home/usuario/vida-plus-front/app/components/Table.vue'
import Button from '/home/usuario/vida-plus-front/app/components/Button.vue'
import { useLeitos } from '../../composables/useLeitos'

const {
  leitos,
  alterarStatus,
  totalLeitos,
  disponiveis,
  ocupados
} = useLeitos()

const columns = [
  { name: 'Número do Leito', key: 'numero' },
  { name: 'Setor', key: 'setor' },
  { name: 'Status', key: 'status' },
  { name: 'Ações', key: 'acoes' }
]
</script>
