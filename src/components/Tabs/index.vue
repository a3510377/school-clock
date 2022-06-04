<template>
  <div class="tabs">
    <TabContent
      v-for="tab in tabs"
      :key="tab.id"
      :data-tab="tab"
      :data-tab-id="tab.id"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from '@/stores/modules/data';
import TabContent from './TabContent.vue';

const dataApp = useDataStore();
const tabs = computed(() => dataApp.tabs);
const tabsLength = ref(tabs.value.length);
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  padding-top: 4px;
  padding-left: 8px;
  background: #000;

  .tab {
    // TODO add width
    /* stylelint-disable-next-line value-keyword-case */
    width: calc(100% / v-bind(tabsLength));
  }
}
</style>
