<script setup>
import {ref, defineProps, defineEmits, computed, onMounted} from 'vue'
import SvgIcon from "../SvgIcon.vue";
import { useScormStore } from "../../store/scormStore.js";

const emit = defineEmits(['update-show'])

const scormStore = useScormStore();
let navItemActive = computed(() => scormStore.getCustomData('navDataStore'));

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

let navLinks = computed(() => {
  let newArray = [...props.links];

  for (let link of newArray) {
    const checkLinkVisited = navItemActive.value.visited.find((item) => item === link.url)

    if (checkLinkVisited) {
      link.disable = false;
    } else  {
      link.disable = true
    }
  }


  return newArray
});

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
      <custom-scrollbar :style="{ width: '100%', height: '550px' }" :auto-hide="false">
        <div class="yEda-player__menu__links">
          <div class="yEda-player__menu__item" v-for="link in navLinks">
            <div :class="[{'disabled': link.disable}, {'active' : navItemActive.slide === link.url}, link.type === 'title' ? 'yEda-player__menu__link' : 'yEda-player__menu__sublink']">
              <svg-icon v-if="navItemActive.slide === link.url" name="arrow"/>
              <router-link v-if="!link.disable" :to="link.url" @click="hideNav()">{{link.title}}</router-link>
              <div v-else>{{link.title}}</div>
            </div>
          </div>
        </div>
      </custom-scrollbar>
    </div>
  </transition>
</template>

<style scoped lang="scss">
  .yEda-player__menu {
    height: calc(100% - 52px);
    width: 100%;
    position: absolute;
    z-index: 11;
    left: 0;
    right: 0;
    top: 52px;
    background-color: var(--bg-player);

    &__title {
      font-size: 1.6rem;
      padding-inline-start: 40px;
      margin: 2rem 0 1.6rem;
    }

    &__item {
      margin-bottom: 20px;
    }

    &__link {
      display: flex;
      align-items: center;
      position: relative;

      &.disabled {
        color: var(--link-text-primary-disabled);
        cursor: default;
        transition: .3s;
      }
      &.active {
        & > a {
          color: var(--link-hover-primary);
        }

        svg {
          position: absolute;
          left: -30px;
        }
      }
      & > a {
        //margin-left: 10px;
        color: var(--link-text-primary);
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

    &__links {
      padding-inline-start: 40px;
      list-style: none;
    }

    &__sublink {
      display: flex;
      align-items: center;
      padding-left: 20px;
      position: relative;
      & > a {
        //margin-left: 10px;
        color: var(--link-text-primary);
        transition: .3s;
      }
      &.active {
        & > a {
          color: var(--link-hover-primary);
        }

        svg {
          position: absolute;
          left: -30px;
        }
      }
      &.disabled {
        color: var(--link-text-primary-disabled);
        cursor: default;
        transition: .3s;
      }
      &:hover {

        & > a {
          color: var(--link-hover-primary);
        }
      }
    }
  }
</style>