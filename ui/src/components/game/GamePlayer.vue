<template>
  <ui-square
    class="border-transparent transition duration-500"
    :style="{
      transform: `translateX(${3.5 * position[0]}rem) translateY(${3.5 * position[1]}rem)`
    }"
    absolute
  >
    <span>👨‍🌾</span>
  </ui-square>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import UiSquare from '@/components/ui/UiSquare.vue';

defineProps({
  position: {
    type: Array as PropType<[number, number]>,
    required: true,
  },
});
</script>
