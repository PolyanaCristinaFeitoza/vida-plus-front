<template>
  <table class="min-w-full border border-gray-200">
    <thead class="bg-gray-100">
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          class="text-center px-4 py-2 border-b text-gray-800"
        >
          {{ col.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in data"
        :key="row.id || index"
        class="hover:bg-gray-50"
      >
        <td v-for="col in columns" :key="col.key" class="px-4 py-2 border-b">
          <template v-if="col.key === 'acoes'">
            <div class="flex justify-center gap-2">
              <slot name="acoes" :row="row" />
            </div>
          </template>

          <template v-else>
             <div class="flex justify-center gap-2">
               {{ row[col.key] }}
            </div>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface Column {
  name: string
  key: string
}

interface Props {
  columns: Column[]
  data: Record<string, any>[]
}

const props = defineProps<Props>()
</script>
