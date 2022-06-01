<script setup lang="ts">
import { computed, watch, reactive } from 'vue';
import { useMainStore } from '@/stores/main';

const store = useMainStore();

const textList = reactive<string[]>([]);
const text = computed(() => store.alertText);
const removeValue = (value: string) => {
  textList.includes(value) && textList.splice(textList.indexOf(value), 1);
};

watch(text, (value) => {
  if (!value) return;
  textList.push(value);
  setTimeout(removeValue.bind(null, value), 1e3 * 5);
});
</script>

<template>
  <div class="alert-box">
    <div v-for="text in textList" :key="text" class="alert-message">
      <div class="alert-close" @click="removeValue(text)">x</div>
      <div class="alert-text" v-text="text"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.alert-box {
  z-index: 999;
  display: flex;

  position: fixed;
  top: 10px;
  left: 50%;
  width: initial;
  height: initial;
  user-select: none;
  margin: auto;
  transform: translate(-50%);
  .alert-message {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 200px;
    min-height: 40px;
    border-radius: 5px;
    background: #fff;
    .alert-close {
      position: absolute;
      top: 0;
      right: 0;
      width: 15px;
      height: 15px;
      margin: 5px;
      border-radius: 50%;
      text-align: center;
      line-height: 15px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background: #ccc;
      }
    }
  }
}
</style>
