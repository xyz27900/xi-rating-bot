<template>
  <ui-square
    class="transition duration-500"
    :class="{
      [`bg-${subject.color}-light`]: true,
      'border-transparent': !subject.highlighted,
      [`border-${subject.color}`]: subject.highlighted,
      'cursor-pointer': subject.clickable,
      'opacity-30': !subject.highlighted && !subject.clickable
    }"
    @click="onClick"
  >
    <span
      class="transition duration-500"
      :class="{
        'opacity-0': !subject.showIcon,
        'opacity-100': subject.showIcon
      }"
    >
      {{ subject.icon }}
    </span>
  </ui-square>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType } from 'vue';
import UiSquare from '@/components/ui/UiSquare.vue';
import { Subject } from '@/models/subject.model';

const props = defineProps({
  subject: {
    type: Object as PropType<Subject>,
    required: true,
  },
});

const emit = defineEmits(['click']);

const onClick = (e: Event): void => {
  if (!props.subject.clickable) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    emit('click', e);
  }
};
</script>
