<template>
  <DefaultLayout> </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  padding-top: var(--tabs-block-height);

  #tabs {
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--tabs-block-height);
  }

  #clocks {
    max-height: 100%;
    overflow-y: auto;
  }
}
</style>
