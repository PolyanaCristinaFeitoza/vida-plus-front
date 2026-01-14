<template>
  <div class="flex flex-col">
    <label :for="id" class="mb-1 text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      v-model="modelValue"
      class="border p-2 rounded"
    />
    <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps({
  label: String,
  id: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  error: String,
})

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, val => emit('update:modelValue', val))
</script>
