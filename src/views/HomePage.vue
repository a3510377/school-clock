<script lang="ts" setup>
import { ref } from 'vue';

const dateTime = ref<string>();
const timeString = ref<string>();

const func = () => {
  const now = new Date();
  dateTime.value = now.toLocaleDateString();
  timeString.value = now.toLocaleTimeString('zh-TW', { hour12: false });
};

func();
setInterval(func, 1e2);
</script>

<template>
  <div id="home"></div>
</template>

<style lang="scss" scoped></style>
