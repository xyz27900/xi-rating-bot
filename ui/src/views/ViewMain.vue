<template>
  <game-layout>
    <game-progress />
    <game-field>
      <game-player :position="appModule.position" />
    </game-field>
    <game-toolbar />

    <template #footer>
      <div class="grid grid-cols-2 gap-2">
        <router-link :to="{ name: 'help', query: route.query }">
          <ui-button label="Как играть?" />
        </router-link>
        <ui-button
          type="success"
          label="Завершить"
          @click="save"
        />
      </div>
    </template>

    <ui-overlay v-if="isSaving">
      <centered-layout>
        <game-saving />
      </centered-layout>
    </ui-overlay>
  </game-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GameField from '@/components/game/GameField.vue';
import GamePlayer from '@/components/game/GamePlayer.vue';
import GameProgress from '@/components/game/GameProgress.vue';
import GameSaving from '@/components/game/GameSaving.vue';
import GameToolbar from '@/components/game/GameToolbar.vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiOverlay from '@/components/ui/UiOverlay.vue';
import CenteredLayout from '@/layouts/CenteredLayout.vue';
import GameLayout from '@/layouts/GameLayout.vue';
import { appModule, subjectsModule } from '@/store';

const route = useRoute();
const router = useRouter();
const isSaving = ref(false);

const save = async (): Promise<void> => {
  isSaving.value = true;

  const res = await appModule.save({
    query: route.query,
    data: {
      amount: subjectsModule.riceAmount,
    },
  });

  if (res.__state === 'success') {
    await router.replace({ name: 'success' });
  } else {
    isSaving.value = false;
  }
};

watch(() => subjectsModule.uncollectedRice, value => {
  if (value === 0) {
    save();
  }
});
</script>
