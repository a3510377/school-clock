<script lang="ts" setup>
import { onMounted, onUnmounted, reactive } from 'vue';

import { getTimeAngle } from '@/utils/Time';

const timeDeg = reactive({ hours: 0, minutes: 0, seconds: 0 });

const updateClock = () => {
  const { hour, minute, second } = getTimeAngle();
  timeDeg.hours = ~~hour;
  timeDeg.minutes = minute;
  timeDeg.seconds = second;
};

const loop = setInterval(updateClock, 1e3);

onMounted(updateClock);
onUnmounted(() => clearInterval(loop));
</script>

<template>
  <div class="clock-content">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="500"
      viewBox="-100 -100 200 200"
    >
      <g id="c">
        <path id="a" stroke-width="3.8" stroke="#000" d="M0 95V78" />
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <circle
          v-for="_ in 4"
          v-once
          cx="0"
          cy="87"
          r="2.2"
          fill="#000"
          :transform="`rotate(${_ * 6})`"
        />
      </g>
      <g>
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <use
          v-for="_ in 11"
          v-once
          href="#c"
          :transform="`rotate(${_ * 30})`"
        />
      </g>
      <g>
        <line
          stroke-width="2"
          stroke="red"
          x1="0"
          y1="-90"
          x2="0"
          y2="0"
          :transform="`rotate(${timeDeg.seconds})`"
        />
        <line
          stroke-width="2.8"
          stroke="#000"
          x1="0"
          y1="-80"
          x2="0"
          y2="0"
          :transform="`rotate(${timeDeg.minutes})`"
        />
        <line
          stroke-width="2.8"
          stroke="#000"
          x1="0"
          y1="-55"
          x2="0"
          y2="0"
          :transform="`rotate(${timeDeg.hours})`"
        />
        <circle r="4" />
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.clock-center {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
