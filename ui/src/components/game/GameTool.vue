<template>
  <ui-square
    class="cursor-pointer"
    :class="{
      'border-transparent': !selected,
      'border-red': selected
    }"
  >
    <span>{{ toolIcons[tool] }}</span>
  </ui-square>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import UiSquare from '@/components/ui/UiSquare.vue';
import { toolIcons } from '@/constants/tool.constants';
import { Tool } from '@/models/tool.model';

defineProps({
  tool: {
    type: String as PropType<Tool>,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>
