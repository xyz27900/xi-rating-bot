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
import { Tool } from '@xyz27900/xi-rating-bot-common/build/es/models/tool.model';
import { defineProps, PropType } from 'vue';
import UiSquare from '@/components/ui/UiSquare.vue';
import { toolIcons } from '@/constants/tool.constants';

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
