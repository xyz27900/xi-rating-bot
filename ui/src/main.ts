// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css';
import 'vue-toastification/dist/index.css';
import '@/styles/index.css';
import { createApp } from 'vue';
import Toast, { POSITION } from 'vue-toastification';
import App from '@/App.vue';
import { router } from '@/router';

const app = createApp(App);

app.use(Toast, {
  transition: 'Vue-Toastification__fade',
  maxToasts: 1,
  newestOnTop: true,
  closeButton: false,
  hideProgressBar: true,
  position: POSITION.TOP_CENTER,
  icon: false,
  timeout: 3000,
  closeOnClick: false,
  pauseOnHover: false,
});

app.use(router);

app.mount('#app');
