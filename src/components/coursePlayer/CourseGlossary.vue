<script setup>
import { defineProps } from 'vue';
import SvgIcon from "../SvgIcon.vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  words: {
    type: Array,
    default: []
  }
})
</script>

<template>
  <transition
      appear
      mode="out-in"
      appear-active-class="animate__animated animate__slideInDown"
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutUp">
    <div v-if="show" class="yEda-player__glossary">
      <p class="yEda-player__glossary__title">Глоссарий</p>

    </div>
  </transition>
</template>

<style scoped lang="scss">
.yEda-player__menu {
  height: calc(100% - 52px);
  width: 100%;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: 52px;
  background-color: var(--bg-player);

  &__title {
    font-size: 1.6rem;
    padding-inline-start: 40px;
    margin: 2rem 0 1.6rem;
  }
}
</style>