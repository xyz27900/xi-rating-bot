import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

const srcDir = path.resolve(__dirname, 'src');
const outDir = path.resolve(__dirname, 'build');

export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
  ],
  server: {
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
        timeout: 3000,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: srcDir,
      },
    ],
  },
  build: {
    assetsDir: 'static',
    outDir,
    sourcemap: true,
  },
});
