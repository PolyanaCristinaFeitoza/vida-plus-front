<template>
  <div
    v-if="open"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-3">
        {{ title }}
      </h2>

      <p class="text-gray-600 text-base mb-8 leading-relaxed">
        {{ message }}
      </p>

      <div class="flex justify-end gap-4">
        <Button variant="secondary" class="px-6 py-3" @click="$emit('cancel')">
          Cancelar
        </Button>
        <Button variant="primary" class="px-6 py-3" @click="$emit('confirm')">
          Confirmar
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/Button.vue'

defineProps<{
  open: boolean
  title: string
  message: string
}>()

defineEmits(['confirm', 'cancel'])
</script>
