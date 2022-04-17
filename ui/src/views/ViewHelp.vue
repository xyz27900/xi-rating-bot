<template>
  <page-layout>
    <div v-html="html" />
    <router-link :to="{ name: 'main', query: route.query }">
      <ui-button label="Все понятно 👌" />
    </router-link>
  </page-layout>
</template>

<script lang="ts" setup>
import { marked } from 'marked';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import UiButton from '@/components/ui/UiButton.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import { renderer } from '@/utils/markdown';

const route = useRoute();
const html = ref<string>('');

const fetchMarkdown = async (): Promise<void> => {
  const helpMarkdown = await fetch('markdown/help.md')
    .then(result => result.arrayBuffer())
    .then(result => {
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(result);
    });

  html.value = marked(helpMarkdown, { renderer });
};

onMounted(fetchMarkdown);
</script>
