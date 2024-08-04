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
  },
  modal: {
    type: Object,
    default: {
      modal: false,
      link: "Модальное окно",
      title: "Модальное окно",
      text: "Текст"
    }
  }
})

let modalShow = ref(false);

function toggleModal() {
  modalShow.value = !modalShow.value
}
</script>

<template>
  <div>
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
          <div>
            <div class="flip-card__title">{{ title }}</div>
            <div class="flip-card__text">{{ text }}</div>
            <a class="modal__btn-link" v-if="modal.show" @click="toggleModal()">{{ modal.link }}</a>
          </div>
          <div class="flip-card__arrow">
            <svg-icon width="24" height="24" color="FEC334" name="arrow-revers"/>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="modalShow">
      <transition
          appear
          mode="out-in"
          appear-active-class="animate__animated animate__slideInUp"
      >
        <div class="modal__content">
          <div class="modal__header">
            <p class="modal__header-title">{{modal.title}}</p>
            <button class="modal__btn-close" @click="toggleModal()"><svg-icon name="close"/></button>
          </div>
          <div class="modal__text" v-html="modal.text"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flip-card {
  perspective: 1000px;
  width: 355px;
  min-height: 335px;

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
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
  }

  &__front {
    background-color: #f8f8f8;
  }

  &__back {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #2b2b2b;
    color: white;
    transform: rotateY(180deg);
  }

  &__icon {
    margin-bottom: 20px;
  }

  &__title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__text {
    margin-bottom: 10px;
  }

  &__arrow {
    min-height: 24px;

    & > svg {
      fill: #FEC334;
    }
  }
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    &-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 0;
    }
  }
  &__content {
    width: 800px;
    border-radius: 18px;
    padding: 20px;
    background-color: white;
  }
  &__btn {
    &-link {
      padding: 0 10px;
      cursor: pointer;
      background-color: transparent;
      border: none;
      transition: .3s;
      color: #F4CA3A;

      &:hover {
        color: var(--btn-color-bg-hover);
      }

      &:focus {
        outline: none;
      }
    }
    &-close {
      font-size: 24px;
      padding: 0;
      background-color: transparent;
      border: none;
      transition: .3s;

      &:hover {
        color: #F4CA3A;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
