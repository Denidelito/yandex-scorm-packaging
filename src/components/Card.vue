<script setup>
import {ref, defineProps, computed} from "vue";

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
  iconPosition: {
    type: String,
    default: 'Top'
  },
  text: {
    type: String,
    default: '',
    required: true
  },
  animateClass: {
    type: String,
    default: 'animate__bounceIn'
  }
})

const classCard = computed(() => {
  const defaultClass = 'card animate__animated';
  const direction = props.iconPosition === 'left' ? 'card_row' : 'card_col';

  return [defaultClass, props.animateClass,  direction]
})
</script>

<template>
  <div :class="classCard" :style="{maxWidth: width, width: width}">
    <div class="card__icon" v-if="icon.length">
      <img :src="`../assets/images/icon/${icon}.png`" alt="Иконка карточки">
    </div>
    <div>
      <p class="card__title" v-if="title.length">{{title}}</p>
      <p class="card__text">{{text}}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    position: relative;
    z-index: 1;
    background-color: #FFFFFF;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
    padding: 24px;
    border-radius: 16px;
    font-size: 16px;
    text-align: center;
    height: 100%;
    box-sizing: border-box;

    &_row {
      display: flex;
      align-items: center;
      text-align: left;

      & .card__icon {
        margin-bottom: 0;
        margin-right: 30px;
      }
    }

    &__title {
      font-weight: bold;
      margin-bottom: 10px;
    }

    &__icon {
      line-height: 0;
      margin-bottom: 20px;
    }
  }
</style>