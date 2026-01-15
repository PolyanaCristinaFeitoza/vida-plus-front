<template>
  <button
    :class="[
      'px-4 py-2 rounded text-white font-semibold transition-colors cursor-pointer',
      variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : '',
      variant === 'secondary' ? 'bg-gray-500 hover:bg-gray-600' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    :disabled="disabled"
   @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])

interface Props {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const props = defineProps<Props>()
</script>
