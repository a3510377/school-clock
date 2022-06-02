<script setup lang="ts">
import { computed, watch, reactive } from 'vue';

const textList = reactive<string[]>([]);
const text = computed(() => '');
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
  position: fixed;
  top: 10px;
  left: 50%;
  z-index: 999;
  display: flex;
  width: initial;
  height: initial;
  margin: auto;
  transform: translate(-50%);
  user-select: none;

  .alert-message {
    display: flex;
    min-width: 200px;
    min-height: 40px;
    background: #fff;
    border-radius: 5px;
    align-items: center;
    justify-content: center;

    .alert-close {
      position: absolute;
      top: 0;
      right: 0;
      width: 15px;
      height: 15px;
      margin: 5px;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      cursor: pointer;
      border-radius: 50%;

      &:hover {
        background: #ccc;
      }
    }
  }
}
</style>
