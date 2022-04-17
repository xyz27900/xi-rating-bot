<template>
  <div class="flex items-center justify-center gap-2 text-2xl">
    <span>{{ subjectsModule.riceAmount }}</span>
    <span>🌾</span>
  </div>
</template>

<script lang="ts" setup>
import { subjectsModule } from '@/store';
</script>
