<template>
  <div class="headers">
    <div class="tabs" @wheel="scrollEv">
      <TabContent
        v-for="tab in tabs"
        :key="tab.id"
        :data-tab="tab"
        :data-tab-id="tab.id"
      />
    </div>
    <div class="window-controls-container">
      <div class="window-minimize">
        <SvgIcon name="controls-minimize" color="white" />
      </div>
      <div class="window-max-restore">
        <SvgIcon name="controls-maxRestore" color="white" />
      </div>
      <div class="window-close">
        <SvgIcon name="controls-close" color="white" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useDataStore } from '@/stores/modules/data';
import TabContent from './TabContent.vue';
import SvgIcon from '@/components/SvgIcon.vue';

const dataApp = useDataStore();
const tabs = computed(() => dataApp.tabs);
const tabsLength = ref(tabs.value.length);

const scrollEv = (ev: WheelEvent) => {
  const target = <HTMLElement>ev.target;

  target.scrollLeft += ev.deltaY;
};
</script>

<style lang="scss" scoped>
.headers {
  display: flex;
  height: 100%;
  background: #000;
  justify-content: space-between;

  .tabs {
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 4px;
    padding-left: 8px;
    overflow-y: hidden;

    .tab {
      /* stylelint-disable-next-line value-keyword-case */
      width: calc(100% / v-bind(tabsLength));
      min-width: 85px;
    }

    // &::-webkit-scrollbar {
    //   display: block;
    //   height: 1px;
    // }

    &::-webkit-scrollbar {
      width: 5px;
      height: 8px;
      background-color: #000;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #aaa;
    }
    // background: transparent;
  }

  .window-controls-container {
    z-index: 1;
    display: flex;
    box-shadow: -5px -10px 10px #000;

    > div {
      cursor: pointer;
    }

    .window-minimize {
      width: 35px;
      height: 35px;
    }

    /* .window-max-restore {
    }

    .window-close {
    } */
  }
}
</style>
