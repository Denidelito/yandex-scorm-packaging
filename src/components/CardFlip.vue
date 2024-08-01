<template>
  <div class="flip-card">
    <div class="flip-card__inner">
      <div class="flip-card__front">
        <div class="flip-card__icon">
          <img width="167" height="167" :src="`../assets/images/icon/${icon}.png`" alt="">
        </div>
        <div class="flip-card__title">{{ title }}</div>
        <div class="flip-card__arrow">
          <svg-icon name="arrow-revers"/>
        </div>
      </div>
      <div class="flip-card__back">
        <div class="flip-card__title">{{ title }}</div>
        <div class="flip-card__text">{{ text }}</div>
        <div class="flip-card__arrow">
          <svg-icon width="24" height="24" color="FEC334" name="arrow-revers"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import SvgIcon from "./SvgIcon.vue";

const props = defineProps({
  icon: {
    type: String,
  },
  title: {
    type: String,
    default: 'Заголовок'
  },
  text: {
    type: String,
    default: 'Текст'
  }
})
</script>

<style scoped lang="scss">
.flip-card {
  perspective: 1000px;
  width: 355px;
  height: 200px;

  &__inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
  }

  &:hover .flip-card__inner {
    transform: rotateY(180deg);
  }

  &__front, &__back {
    text-align: center;
    backface-visibility: hidden;
    position: absolute;
    min-height: 335px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    box-sizing: border-box;
  }

  &__front {
    background-color: #f8f8f8;
  }

  &__back {
    background-color: #2b2b2b;
    color: white;
    transform: rotateY(180deg);
  }

  &__icon {
    margin-bottom: 20px;
  }

  &__title {
    font-weight: bold;
    margin-bottom: 20px;
  }

  &__arrow {
    min-height: 24px;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;

    & > svg {
      fill: #FEC334;
    }
  }
}
</style>
