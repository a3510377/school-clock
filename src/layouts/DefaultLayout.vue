<template v-slot>
  <div class="default-layout">
    <TabsComponent class="tabs" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import TabsComponent from '@/components/Tabs/index.vue';
</script>

<style lang="scss" scoped>
.default-layout {
  height: 100%;
  padding-top: var(--tabs-block-height);

  .tabs {
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--tabs-block-height);
  }

  .content {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
