<template>
  <svg v-once aria-hidden="true" class="svg-icon-spin">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  prefix: { type: String, default: 'icon' },
  name: { type: String, required: true },
  color: { type: String, default: '#ccc' },
  width: { type: String, default: '20px' },
  height: { type: String, default: '20px' },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<style lang="scss" scoped>
.svg-icon-spin {
  width: v-bind(width);
  height: v-bind(height);
  color: v-bind(color);
  vertical-align: middle;
  fill: v-bind(color);
}
</style>
