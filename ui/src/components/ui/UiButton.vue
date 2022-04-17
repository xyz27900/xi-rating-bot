<template>
  <button
    class="block w-full px-4 py-2 rounded-lg"
    :class="`bg-${color}`"
  >
    <span class="font-semibold text-white">
      {{ label }}
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<'primary' | 'success'>,
    default: 'primary',
  },
  label: {
    type: String,
    default: '',
  },
});

const color = computed(() => props.type === 'primary' ? 'blue' : 'green');
</script>
