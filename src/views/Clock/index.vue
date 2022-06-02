<template>
  <div id="clock">
    <div id="hour" ref="hourEl" />
    <div id="minute" ref="minuteEl" />
    <div id="second" ref="secondEl" />
    <div>
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <i
        v-for="_ in 60"
        v-once
        :style="{
          transform: `rotate(${_ * 6}deg)`,
          backgroundColor: (_ * 6) % 5 === 0 || !(_ - 1) ? 'white' : void 0,
        }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, onUnmounted, ref } from 'vue';

import { roundDecimal } from '@/utils/Math';

const timeString = reactive({ hour: 0, minute: 0, second: 0 });
const hourEl = ref<HTMLElement>();
const minuteEl = ref<HTMLElement>();
const secondEl = ref<HTMLElement>();

const updateClock = () => {
  const now = new Date();

  timeString.second = now.getSeconds();
  timeString.minute = now.getMinutes();
  timeString.hour = now.getHours();

  const second = now.getSeconds() * 6;
  const minute = now.getMinutes() * 6 + second / 60;
  const hour = (now.getHours() % 12) * 30 + minute / 60;

  if (!(hourEl.value && minuteEl.value && secondEl.value)) return;
  hourEl.value.style.transform = `rotate(${~~hour}deg)`;
  minuteEl.value.style.transform = `rotate(${~~minute}deg)`;
  secondEl.value.style.transform = `rotate(${second}deg)`;
};
const loop = setInterval(updateClock, 1e3);

onMounted(updateClock);
onUnmounted(() => clearInterval(loop));
</script>

<style lang="scss" second>
#clock {
  position: relative;
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 50%;

  #hour,
  #minute,
  #second {
    position: absolute;
    top: -30%;
    right: 0;
    bottom: 0;
    left: 0;
    width: 8px;
    height: 120px;
    margin: auto;
    background-color: #507d9c;
    border-radius: 4px;
    transform-origin: bottom;
  }

  #hour {
    top: -20%;
    height: 80px;
    transform: rotate(0deg);
  }

  #minute {
    transform: rotate(90deg);
  }

  #second {
    width: 2px;
    transform: rotate(180deg);
  }
}
</style>
