<template>
  <div
    class="w-12 h-12 border-2 border-solid flex items-center justify-center text-3xl rounded overflow-hidden"
    :class="{
      'relative': !absolute,
      'absolute': absolute,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  absolute: {
    type: Boolean,
    default: false,
  },
});
</script>
