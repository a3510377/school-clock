<template>
  <div class="clock">
    <div ref="hourEl" class="hour" />
    <div ref="minuteEl" class="minute" />
    <div ref="secondEl" class="second" />
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue';

const props = defineProps({
  second: { type: Number, required: true },
  minute: { type: Number, required: true },
  hour: { type: Number, required: true },
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
