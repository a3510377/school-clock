<template>
  <div>
    <ClockComponentVue
      v-for="alarmclock in tab.AlarmClocks"
      :key="alarmclock.id"
      :clock-config="alarmclock"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

import ClockComponentVue from './ClockComponent.vue';
import { useDataStore } from '@/stores/modules/data';

const route = useRoute();
const router = useRouter();
const appStore = useDataStore();

const _tab = appStore.getTabById(route.params.id.toString());
if (!_tab) return router.push('/');

const tab = _tab;
</script>

<style lang="scss" scoped></style>
