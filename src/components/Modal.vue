<script setup>
import { defineProps, computed, ref } from 'vue';
import SvgIcon from "./SvgIcon.vue";

const props = defineProps({
  btnText: {
    type: String,
    default: 'Модальное окно'
  },
  btnType: {
    type: String,
    default: 'link'
  }
});

const btnClass = computed(() => {
  switch (props.btnType) {
    case 'btn':
      return 'modal__btn';
    default:
      return 'modal__btn-link';
  }
});

const isModalVisible = ref(false);

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
};
</script>

<template>
  <button :class="btnClass" @click="toggleModal">{{ btnText }}</button>

  <div class="modal" v-if="isModalVisible">
    <transition
        appear
        mode="out-in"
        appear-active-class="animate__animated animate__slideInUp"
    >
      <div class="modal__content">
        <div class="modal__header">
          <p class="modal__header-title">О курсе</p>
          <button class="modal__btn-close" @click="toggleModal"><svg-icon name="close"/></button>
        </div>
        <slot></slot>
      </div>
    </transition>
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

    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      &-title {
        font-size: 32px;
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