<script setup>
import {ref, defineProps, computed} from "vue";
import SvgIcon from "./SvgIcon.vue";

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
  },
  iconInfo: {
    type: Boolean,
    default: false
  },
  modal: {
    type: Object,
    default: {
      show: false,
      linkTitle: 'Модальное окно',
      title: 'Заголовок',
      text: 'Текст'
    }
  }
})

let modalShow = ref(false);

function toggleModal() {
  modalShow.value = !modalShow.value
}

const classCard = computed(() => {
  const defaultClass = 'card animate__animated';
  const direction = props.iconPosition === 'left' ? 'card_row' : 'card_col';

  return [defaultClass, props.animateClass,  direction]
})
</script>

<template>
  <div style="height: 100%">
    <div :class="classCard" :style="{maxWidth: width, width: width}">
      <div class="card__icon" v-if="icon.length">
        <img :src="`../assets/images/icon/${icon}.png`" alt="Иконка карточки">
      </div>
      <div v-if="iconInfo" class="card__icon-info">
        !
      </div>
      <div>
        <p class="card__title" v-if="title.length">{{title}}</p>
        <p class="card__text" v-if="text">{{text}}</p>
        <a class="modal__btn-link" v-if="modal.show" @click="toggleModal()">{{ modal.linkTitle }}</a>
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
        cursor: pointer;
        padding: 0;
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
  .card {
    position: relative;
    z-index: 10;
    background-color: #FFFFFF;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
    padding: 24px;
    border-radius: 16px;
    font-size: 16px;
    overflow: hidden;
    text-align: center;
    height: 100%;
    box-sizing: border-box;

    &_row {
      display: flex;
      align-items: center;
      text-align: left;

      & .card__icon {
        margin-bottom: 0;
        margin-right: 15px;
      }
    }

    &__title {
      font-weight: bold;
      margin-bottom: 0;
    }

    &__text {
      margin-bottom: 0;
      margin-top: 10px;
    }
    &__icon {
      margin-bottom: 20px;
      line-height: 0;

      &-info {
        background-color: #FFC433;
        font-size: 56px;
        font-weight: bold;
        color: white;
        padding: 0 24px 0 0;
        margin-right: 20px;

        &:after {
          content: '';
          position: absolute;
          width: 90px;
          top: -24px;
          bottom: -24px;
          left: -24px;
          z-index: -1;
          background-color: #FFC433;
        }
      }
    }
  }
</style>