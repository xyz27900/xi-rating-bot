<template>
  <div v-if="appModule.user" class="flex justify-center">
    <div class="flex items-center gap-2">
      <game-tool
        v-for="tool in appModule.user.tools"
        :key="tool"
        :tool="tool"
        :selected="tool === toolsModule.tool"
        @click="toolsModule.setTool(tool)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import GameTool from '@/components/game/GameTool.vue';
import { appModule, toolsModule } from '@/store';
</script>
