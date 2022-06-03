<template>
  <DefaultLayout>
    <component :is="MainDrag" />
  </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import MainDrag from '@/components/Clock/MainDrag.vue';
</script>

<style lang="scss" scoped></style>
