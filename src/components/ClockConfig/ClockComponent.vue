<template>
  <div class="alarm-clock">
    <div>
      <h2></h2>
    </div>
    <div>
      <label>
        <!-- v-model="" -->
        <input type="checkbox" name="" class="checkbox" />
        <span class="btn-box">
          <span class="btn"></span>
        </span>
        <span class="text">我是文字</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useDataStore } from '@/stores/modules/data';
import type { AlarmClockType } from '@/types/data';

const route = useRoute();
const router = useRouter();
const appStore = useDataStore();

const props = defineProps<{ clockConfig: AlarmClockType }>();
</script>

<style lang="scss" scoped>
.checkbox {
  position: absolute;
  opacity: 0;

  &:checked + .btn-box {
    background-color: #8f8;

    .btn {
      margin-left: 20px;
    }
  }

  & + .btn-box {
    display: inline-block;
    width: 40px;
    height: 20px;
    vertical-align: middle;
    background-color: #ccc;
    border-radius: 100px;
    box-shadow: 0 3px 0 rgb(0 0 0 / 13%) inset;

    .btn {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-left: 0;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 1px 2px 5px rgb(0 0 0 / 30%);
    }
  }
}
</style>
