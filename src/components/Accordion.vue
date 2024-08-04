<script setup>
import {ref, defineProps, computed, onMounted} from "vue";
import SvgIcon from "./SvgIcon.vue";

const props = defineProps({
  items: {
    type: Array,
    default: [
      {
        title: "Заголовок",
        text: "Текст",
        show: false
      }
    ]
  }
});
let accordionItems = computed(() => [...props.items]);
function toggleItem(currentItem) {
  for (let item of accordionItems.value) {
    if (item.show) {
      item.show = false
    }
  }

  currentItem.show = !currentItem.show
}


</script>

<template>
  <div class="accordion">
    <div class="accordion__item" v-for="(item, index) in accordionItems" :key="index">
      <div :class="['accordion__header', item.show ? 'accordion__header_active' : '']" @click="toggleItem(item)">
        {{item.title}}
        <svg-icon name="arrow"/>
      </div>
      <div :style="{height: item.show ? '100%' : 0 }" class="accordion__container">
        <div class="accordion__content" v-html="item.text"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .accordion {
    background-color: white;
    border-radius: 16px;
    overflow: hidden;
    transition: .3s;
    &__header {
      font-size: 16px;
      padding: 14px 24px;
      transition: .3s;
      position: relative;
      cursor: pointer;
      font-weight: bold;

      & > svg {
        transform: rotate(90deg);
        transition: .3s;
        position: absolute;
        right: 24px;
      }

      &:hover {
        background-color: #FFC433;
      }

      &_active {
        background-color: #FFC433;

        & > svg {
          transform: rotate(-90deg);
        }
      }
    }
    &__container {
      overflow: hidden;
    }
    &__content {
      font-size: 14px;
      padding: 14px 24px;
    }
  }
</style>