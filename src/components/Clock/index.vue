<script lang="ts" setup></script>

<template>
  <div>
    <div class="clock" v-for="_ in 110" :key="_"></div>
  </div>
</template>

<style lang="scss" scoped>
.clock {
  height: 100px;
}
</style>
