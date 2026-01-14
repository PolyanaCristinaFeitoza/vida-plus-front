<template>
  <div
    v-if="open"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
      <h2 class="text-lg font-bold text-gray-800 mb-2">
        {{ title }}
      </h2>

      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>

      <div class="flex justify-end">
        <Button variant="primary" @click="$emit('close')">
          OK
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

defineEmits(['close'])
</script>
