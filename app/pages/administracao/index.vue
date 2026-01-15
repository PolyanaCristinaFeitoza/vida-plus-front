<template>
  <div class="min-h-screen bg-gray-50 p-8">
    
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-gray-800">
        Administração <span class="text-blue-600">Hospitalar</span>
      </h1>
      <p class="mt-2 text-gray-600">
        Visão geral da ocupação e gerenciamento de leitos
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      
      <div class="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
        <p class="text-[16px] text-gray-500">Total de Leitos</p>
        <p class="mt-2 text-3xl font-bold text-gray-800">
          {{ totalLeitos }}
        </p>
      </div>

      <div class="bg-blue-50 p-6 rounded-3xl shadow-lg border border-blue-100">
        <p class="text-[16px] text-blue-700">Disponíveis</p>
        <p class="mt-2 text-3xl font-bold text-blue-700">
          {{ disponiveis }}
        </p>
      </div>

      <div class="bg-red-50 p-6 rounded-3xl shadow-lg border border-red-100">
        <p class="text-[16px] text-red-700">Ocupados</p>
        <p class="mt-2 text-3xl font-bold text-red-700">
          {{ ocupados }}
        </p>
      </div>

    </div>

    <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
      <Table :columns="columns" :data="leitos">
        
        <template #status="{ row }">
          <span
            class="px-3 py-1 rounded-full text-sm font-semibold"
            :class="row.status === 'Disponível'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'"
          >
            {{ row.status }}
          </span>
        </template>

        <template #acoes="{ row }">
          <Button
            variant="primary"
            class="px-4 py-2"
            @click="alterarStatus(row.id)"
          >
            Alterar Status
          </Button>
        </template>

      </Table>
    </div>

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
