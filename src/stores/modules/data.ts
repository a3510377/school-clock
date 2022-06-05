import { defineStore } from 'pinia';

import type { AlarmClockType, TabType, timeFormatType } from '@/types/data';

import { formatTime, getTime } from '@/utils/Time';

export interface DataStoreType {
  tabs: TabType[];
  done?: timeFormatType;
}

export const useDataStore = defineStore({
  id: 'data',
  state: (): DataStoreType => ({
    tabs: [],
  }),
  getters: {
    getTabById(): (id: string) => TabType | undefined {
      return (id: string) => this.tabs.find((tab) => tab.id === id);
    },
    getTabs(): TabType[] {
      return this.tabs;
    },
    getAllAlarmClocks(): AlarmClockType[] {
      const alarmClocks: AlarmClockType[] = [];

      this.tabs.forEach((tab) => alarmClocks.push(...tab.AlarmClocks));

      return alarmClocks;
    },
    getTabAlarmClocks(): (id: string) => AlarmClockType[] {
      return (id) => this.getTabById(id)?.AlarmClocks || [];
    },
    getEnabledAlarmClocks(): AlarmClockType[] {
      const alarmClocks: AlarmClockType[] = [];
      const now = getTime();

      this.tabs
        .filter((tab) => tab.enabled && tab.config?.weeks?.includes(now.worker))
        .forEach((tab) => alarmClocks.push(...tab.AlarmClocks));

      return alarmClocks;
    },
    getAlarmClock(): (id: string) => AlarmClockType | undefined {
      return (id: string): AlarmClockType | undefined => {
        const tabs = this.getTabs;

        for (const clocks of tabs.map((tab) => tab.AlarmClocks)) {
          const clock = clocks.find((clock) => clock.id === id);
          if (clock) return clock;
        }
      };
    },
    hasNowAlarmClock(): AlarmClockType | undefined {
      const enableAlarmClocks: AlarmClockType[] = this.getEnabledAlarmClocks;
      const timeString = formatTime();

      const time = enableAlarmClocks.find(
        (alarmClock) => alarmClock.time === timeString
      );

      if (time) return this.done === timeString ? void 0 : time;

      this.done &&= void 0;
    },
  },
  actions: {
    setTabs(...tabs: TabType[]): void {
      this.tabs = tabs;
    },
    pushTab(...tabs: TabType[]): void {
      this.tabs.push(...tabs);
    },
    deleteTabFromId(id: string): void {
      const index = this.tabs.findIndex((tab) => tab.id === id);
      if (index === -1) return;
      this.deleteTabFromIndex(index);
    },
    deleteTabFromIndex(index: number): void {
      this.tabs.splice(index, 1);
    },
    toggleTabEnabled(id: string): void {
      const tab = this.getTabById(id);
      if (tab) tab.enabled = !tab.enabled;
    },
  },
});
