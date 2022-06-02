<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/modules/app';

import AlertComponent from '@/components/AlertComponent.vue';

const appStore = useAppStore();

/* scheme */
onMounted(() => {
  const storage = localStorage.getItem('theme');
  if (!storage) {
    const mql = matchMedia('(prefers-color-scheme: dark)');

    appStore.setThemeMode(mql.matches);
    mql.addEventListener('change', (e) => appStore.setThemeMode(e.matches));
  } else appStore.setThemeMode(storage);
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
