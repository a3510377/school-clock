<template>
  <div class="tabs">
    <TabContent v-for="tab in tabs" :key="tab.id" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '@/stores/modules/data';
import TabContent from './TabContent.vue';

const dataApp = useDataStore();
const tabs = computed(() => dataApp.tabs);
</script>

<style lang="scss" scoped></style>
