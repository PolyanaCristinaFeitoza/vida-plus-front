<template>
  <div class="bg-gray-50 rounded-3xl p-4 shadow-inner border border-gray-100">
    <div class="overflow-x-auto">
      <table class="min-w-full border-separate border-spacing-y-3">

        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 text-[18px] font-bold text-gray-600 text-center"
            >
              {{ col.name }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="row.id || index"
            class="bg-white rounded-2xl shadow hover:shadow-md transition"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 text-[16px] text-gray-700 text-center"
            >
   
              <template v-if="col.key === 'acoes'">
                <div class="flex justify-center gap-2">
                  <slot name="acoes" :row="row" />
                </div>
              </template>

              <template v-else>
                <div class="flex justify-center items-center gap-2">
                  <slot :name="col.key" :row="row">
                    {{ row[col.key] }}
                  </slot>
                </div>
              </template>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
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
