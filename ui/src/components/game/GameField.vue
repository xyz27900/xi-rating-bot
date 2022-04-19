<template>
  <div class="relative grid grid-cols-6 grid-rows-6 gap-2">
    <game-subject
      v-for="(item, index) in subjects"
      :key="index"
      :subject="item"
      @click="onClick(index)"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { Subject, SubjectType } from 'social-credits-common/build/es/models/subject.model';
import { Tool } from 'social-credits-common/build/es/models/tool.model';
import { computed } from 'vue';
import { useToast } from 'vue-toastification';
import GameSubject from '@/components/game/GameSubject.vue';
import { subjectColors, subjectIcons } from '@/constants/subject.constants';
import { toolIcons } from '@/constants/tool.constants';
import { appModule, subjectsModule, toolsModule } from '@/store';

const toast = useToast();

const subjectToTool: Omit<Record<SubjectType, Tool>, 'empty'> = {
  rice: 'knife',
  stone: 'pickaxe',
  tree: 'axe',
  dragon: 'sword',
};

const indexToCoordinates = (index: number): [number, number] => {
  const x = index % 6;
  const y = Math.floor(index / 6);
  return [x, y];
};

const subjects = computed<Subject[]>(() => {
  return subjectsModule.subjects.map((type, index) => {
    const [x, y] = indexToCoordinates(index);

    const highlighted = appModule.position[0] === x && appModule.position[1] === y;

    const showIcon = !appModule.path.find(item => item[0] === x && item[1] === y);

    const clickable = appModule.position[0] === x - 1 && appModule.position[1] === y ||
      appModule.position[0] === x + 1 && appModule.position[1] === y ||
      appModule.position[0] === x && appModule.position[1] === y - 1 ||
      appModule.position[0] === x && appModule.position[1] === y + 1;

    return {
      type,
      icon: subjectIcons[type],
      color: subjectColors[type],
      highlighted,
      showIcon,
      clickable,
    };
  });
});

const onClick = (index: number): void => {
  const [x, y] = indexToCoordinates(index);
  const subject = subjects.value[index];

  if (!subject.showIcon || subject.type === 'empty') {
    appModule.moveTo([x, y]);
    return;
  }

  const tool = subjectToTool[subject.type];
  if (toolsModule.tool !== tool) {
    toast.error(`Чтобы убрать ${subjectIcons[subject.type]}, нужно использовать ${toolIcons[tool]}`);
    return;
  }

  if (subject.type === 'rice') {
    subjectsModule.collectRice();
  }

  appModule.moveTo([x, y]);
};
</script>
