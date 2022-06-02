<template>
  <div class="clock">
    <div ref="hourEl" class="hour" />
    <div ref="minuteEl" class="minute" />
    <div ref="secondEl" class="second" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { getTime } from '@/utils/Time';

const hourEl = ref<HTMLDivElement>();
const minuteEl = ref<HTMLDivElement>();
const secondEl = ref<HTMLDivElement>();

onMounted(() => {
  const updateClock = () => {
    if (!(hourEl.value && minuteEl.value && secondEl.value)) return;
    const { hour, minute, second } = getTime().deg;

    hourEl.value.style.transform = `rotate(${~~hour})`;
    minuteEl.value.style.transform = `rotate(${minute})`;
    secondEl.value.style.transform = `rotate(${second})`;
  };
  updateClock();

  const loop = setInterval(updateClock, 1e3);
  onUnmounted(() => clearInterval(loop));
});
</script>

<style lang="scss" scoped>
.clock {
  position: relative;
  width: 400px;
  height: 400px;
  background-color: rgb(146 122 122);
  border-radius: 50%;

  .hour,
  .minute,
  .second {
    position: absolute;
    top: -30%;
    right: 0;
    bottom: 0;
    left: 0;
    width: 8px;
    height: 120px;
    margin: auto;
    background-color: #000;
    border-radius: 4px;
    transform-origin: bottom;
  }

  .hour {
    top: -20%;
    height: 80px;
  }

  .second {
    width: 2px;
  }
}
</style>
