<template>
  <span
    :data-tab-id="tab.id"
    :class="{ enabled: tab.enabled, active: tab.id === $route.params.id }"
    :checked="tab.enabled ? '' : void 0"
    :aria-checked="tab.enabled"
    class="tab"
    tabindex="0"
    role="checkbox"
    @click="toHref"
    @click.middle="tab.enabled = false"
  >
    <div class="tab-content">
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <data-lsp :lsp="`${tab.name}`" v-text="tab.name" />
      <div
        :aria-label="`點擊${tab.enabled ? '關閉' : '開啟'}`"
        :title="`點擊${tab.enabled ? '關閉' : '開啟'}`"
        class="toggle-on"
        tabindex="2"
        @click.prevent="changeTabEnabled"
      />
    </div>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { TabType } from 'types/data';
import { useDataStore } from '@/stores/modules/data';

const props = defineProps<{
  dataTab: TabType;
}>();

const router = useRouter();
const dataStore = useDataStore();
const tab = computed(() => <TabType>dataStore.getTabById(props.dataTab.id));

const changeTabEnabled = () => (tab.value.enabled = !tab.value.enabled);
const toHref = () => router.push({ path: `/tabs/${tab.value.id}` });
</script>

<style lang="scss" scoped>
.tab {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  max-width: 200px;
  text-decoration: none;

  &:not(.active) {
    z-index: 1;
    background-color: #000;
    opacity: 0.8;

    &::after,
    &::before,
    .tab-content,
    .tab-content::after,
    .tab-content::before {
      background-color: #000;
    }
  }

  &.enabled .tab-content .toggle-on {
    background: greenyellow;
  }

  .tab-content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 8px;
    color: #fff;
    background-color: #484848;
    border-radius: 8px 8px 0 0;

    &::after,
    &::before {
      position: absolute;
      bottom: 0;
      z-index: 2;
      width: 10px;
      height: 10px;
      background: #000;
      content: '';
    }

    &::before {
      left: -10px;
      border-radius: 0 0 20px;
    }

    &::after {
      right: -10px;
      border-radius: 0 0 0 20px;
    }

    .toggle-on {
      width: 15px;
      height: 15px;
      background: red;
      border-radius: 50%;
    }

    data-lsp {
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &::before,
  &::after {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 10px;
    height: 10px;
    background: #484848;
    content: '';
  }

  &::before {
    left: -10px;
  }

  &::after {
    right: -10px;
  }
}
</style>
