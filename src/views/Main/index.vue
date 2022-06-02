<template>
  <div id="app">
    <TabsComponent id="tabs" />
    <ClockComponent id="clocks" />
  </div>
</template>

<script setup lang="ts">
import ClockComponent from '@/components/Clock/index.vue';
import TabsComponent from '@/components/Tabs/index.vue';
</script>

<style lang="scss" scoped>
#app {
  padding-top: var(--tabs-block-height);
  height: 100%;
  #tabs {
    top: 0;
    width: 100%;
    position: fixed;
    height: var(--tabs-block-height);
  }
  #clocks {
    max-height: 100%;
    overflow-y: auto;
  }
}
</style>
