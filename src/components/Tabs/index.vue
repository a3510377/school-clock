<template>
  <div class="tabs">
    <TabContent v-for="tab in tabs" :key="tab.id" />
  </div>
</template>

<script setup lang="ts">
import TabContent from './TabContent.vue';
</script>

<style lang="scss" scoped></style>
