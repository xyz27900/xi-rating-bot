<template>
  <centered-layout>
    <div class="flex flex-col items-center gap-4">
      <div class="text-5xl mb-4">{{ icon }}</div>
      <div class="text-center text-2xl px-10">
        {{ message }}
      </div>
    </div>
  </centered-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import CenteredLayout from '@/layouts/CenteredLayout.vue';
import { getErrorIcon } from '@/utils/error';

const route = useRoute();

const icon = computed(() => {
  const { code: codeStr } = route.query;
  const code = Number(codeStr);
  return getErrorIcon(code);
});

const message = computed(() => {
  const { message: messageStr } = route.query;
  if (typeof messageStr === 'string' && messageStr.length > 0) {
    return messageStr;
  } else {
    return 'Ошибка на сервере';
  }
});
</script>
