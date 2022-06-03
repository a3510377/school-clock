<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { useAppStore } from '@/stores/modules/app';
import { useDataStore } from '@/stores/modules/data';
import AlertComponent from '@/components/AlertComponent.vue';

const appStore = useAppStore();
const dataStore = useDataStore();

/* scheme */
onMounted(() => {
  const storage = localStorage.getItem('theme');
  if (!storage) {
    const mql = matchMedia('(prefers-color-scheme: dark)');

    appStore.setThemeMode(mql.matches);
    mql.addEventListener('change', (e) => appStore.setThemeMode(e.matches));
  } else appStore.setThemeMode(storage);
});
(async () => {
  if (import.meta.env.DEV) return;
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const { ipcMain } = await import('electron');
    onMounted(() => {
      const getState = () => {
        const nowAlarmClock = dataStore.hasNowAlarmClock;
        if (nowAlarmClock) ipcMain.emit('alarm-clock', nowAlarmClock);
      };

      const loop = setInterval(getState, 1e3);
      onUnmounted(() => clearInterval(loop));
    });
    // eslint-disable-next-line no-empty
  } catch {}
})();
</script>

<template>
  <router-view />
  <AlertComponent />
</template>

<style scoped lang="scss">
div {
  width: 100%;
}
</style>
