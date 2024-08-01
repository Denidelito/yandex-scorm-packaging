<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: '',
    required: true
  },
})
</script>

<template>
  <div class="card animate__animated animate__bounceIn" :style="{maxWidth: width, width: width}">
    <div class="card__icon" v-if="icon.length">
      <img :src="`../assets/images/icon/${icon}.png`" alt="Иконка карточки">
    </div>
    <p class="card__title" v-if="title.length">{{title}}</p>
    <p class="card__text">{{text}}</p>
  </div>
</template>

<style scoped lang="scss">
  .card {
    background-color: #FFFFFF;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
    padding: 24px;
    border-radius: 16px;
    font-size: 16px;
    text-align: center;
    height: 100%;
    box-sizing: border-box;

    &__icon {
      line-height: 0;
      margin-bottom: 15px;
    }
  }
</style>