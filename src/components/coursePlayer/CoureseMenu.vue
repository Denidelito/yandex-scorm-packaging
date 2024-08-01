<script setup>
import { defineProps, defineEmits } from 'vue'
import SvgIcon from "../SvgIcon.vue";

const emit = defineEmits(['update-show'])

const hideNav = () => {
  emit('update-show', '')
}

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  links: {
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
    <div v-if="show" class="yEda-player__menu">
      <p class="yEda-player__menu__title">Навигация по курсу</p>
      <ul class="yEda-player__menu__links">
        <li v-for="link in links" class="yEda-player__menu__link">
          <svg-icon name="arrow"/>
          <router-link :to="link.url" @click="hideNav()">{{link.title}}</router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped lang="scss">
  .yEda-player__menu {
    height: calc(100% - 52px);
    width: 100%;
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    top: 52px;
    background-color: var(--bg-player);

    &__title {
      font-size: 1.6rem;
      padding-inline-start: 40px;
      margin: 2rem 0 1.6rem;
    }

    &__links {
      list-style: none;
    }

    &__link {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      & > a {
        margin-left: 10px;
        color: var(--link-text-primary);
        transition: .3s;
      }

      & > svg {
        transition: .3s;
      }

      &:hover {

        & > a {
          color: var(--link-hover-primary);
        }

        & > svg {
          color: var(--link-hover-primary);
        }
      }
    }
  }
</style>