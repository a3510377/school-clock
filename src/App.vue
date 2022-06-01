<script setup lang="ts">
import AlertComponent from '@/components/AlertComponent.vue';
</script>

<template>
  <router-view />
  <AlertComponent />
</template>

<style scoped lang="scss">
div {
  width: 100%;
  height: 100%;
}
</style>
