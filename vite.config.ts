/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import electron from 'vite-plugin-electron';
import electronRenderer from 'vite-plugin-electron/renderer';
import polyfillExports from 'vite-plugin-electron/polyfill-exports';
import { fileURLToPath, URL } from 'url';

import svgIcon from './plugin/svgIcon';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE,
  plugins: [
    vue(),
    electron({
      main: { entry: 'electron-main/index.ts' },
      preload: { input: path.join(__dirname, './electron-preload/index.ts') },
    }),
    electronRenderer(),
    polyfillExports(),
    svgIcon(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    emptyOutDir: false,
    terserOptions: {
      compress: {
        // Prevent Infinity from being compressed to 1/0, may cause performance issues on Chrome
        keep_infinity: true,
        drop_console: false,
      },
      format: { comments: false },
    },
    minify: 'terser',
    sourcemap: false,
    // Speed up packing
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        entryFileNames: `assets/js/[name]-[hash].js`,
        chunkFileNames: `assets/js/[name]-[hash].js`,
        assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
      },
    },
  },
});
