<template>
  <centered-layout v-if="loading">
    <game-loading />
  </centered-layout>
  <router-view v-else v-slot="{ Component}">
    <transition
      enter-active-class="transition duration-300 ease"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-300 ease"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GameLoading from '@/components/game/GameLoading.vue';
import CenteredLayout from '@/layouts/CenteredLayout.vue';
import { appModule } from '@/store';

const route = useRoute();
const router = useRouter();
const loading = ref(true);

const init = async (): Promise<void> => {
  const res = await appModule.login({ query: route.query });
  if (res.__state === 'success') {
    loading.value = false;
  } else {
    await router.replace({
      name: 'error',
      query: res.data,
    });
  }
};

onMounted(init);
</script>
