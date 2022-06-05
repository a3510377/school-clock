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
      <div class="air-drag"></div>
      <div
        class="window-minimize"
        data-event="minimize"
        @click="windowOperation('minimize')"
      >
        <SvgIcon
          width="18px"
          height="18px"
          name="controls-minimize"
          color="white"
        />
      </div>
      <div
        class="window-max-restore"
        data-event="maximize"
        @click="windowOperation('maximize')"
      >
        <SvgIcon
          width="18px"
          height="18px"
          name="controls-maxRestore"
          color="white"
        />
      </div>
      <div
        class="window-close"
        data-event="close"
        @click="windowOperation('close')"
      >
        <SvgIcon
          width="18px"
          height="18px"
          name="controls-close"
          color="white"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useDataStore } from '@/stores/modules/data';
import TabContent from './TabContent.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { BrowserWindowTypeArgs, Electron } from '@/utils/service';

const dataApp = useDataStore();
const tabs = computed(() => dataApp.tabs);
const tabsLength = ref(tabs.value.length);
const win = new Electron();

const scrollEv = (ev: WheelEvent) => {
  const target = <HTMLElement>ev.target;

  target.scrollLeft += ev.deltaY;
};
const windowOperation = (type: BrowserWindowTypeArgs) => {
  win.send('BrowserWindow', type);
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
    padding: 4px 6px 0 8px;
    overflow-y: hidden;

    .tab {
      /* stylelint-disable-next-line value-keyword-case */
      width: calc(100% / v-bind(tabsLength));
      min-width: 85px;
    }

    &::-webkit-scrollbar {
      width: 5px;
      height: 8px;
      background-color: #000;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 2px;
    }
  }

  .window-controls-container {
    z-index: 1;
    display: flex;
    align-items: center;
    box-shadow: -5px -10px 10px #000;

    [data-event] {
      display: flex;
      margin: 0 2px;
      cursor: pointer;
      align-items: center;
      justify-content: center;

      &:last-child {
        margin-right: 12px;
      }
    }

    .air-drag {
      width: 50px;
      height: 100%;
      cursor: initial;
      user-select: none;
      -webkit-app-region: drag;
    }
  }
}
</style>
