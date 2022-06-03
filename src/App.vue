<script setup lang="ts">
import { onMounted } from 'vue';
import sound from 'sound-play';

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

onMounted(() => {
  const nowAlarmClock = dataStore.hasNowAlarmClock;
  if (nowAlarmClock)
    sound
      .play(nowAlarmClock.audio)
      .then(() => {
        nowAlarmClock.config?.repeat && sound.play(nowAlarmClock.audio);
      })
      // TODO add error handler
      .catch(() => ({}));
});
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
