import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthMiddleware from '@/AuthMiddleware.vue';
import ViewHelp from '@/views/ViewHelp.vue';
import ViewMain from '@/views/ViewMain.vue';
import ViewNotFound from '@/views/ViewNotFound.vue';
import ViewSuccess from '@/views/ViewSuccess.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: AuthMiddleware,
    children: [
      {
        path: '',
        name: 'main',
        component: ViewMain,
      },
      {
        path: 'success',
        name: 'success',
        component: ViewSuccess,
      },
      {
        path: '/help',
        name: 'help',
        component: ViewHelp,
      },
    ],
  },
  {
    path: '/404',
    name: 'not-found',
    component: ViewNotFound,
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
