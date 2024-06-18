<script setup>
import svgIcon from "../SvgIcon.vue";
import { ref, defineProps } from 'vue';
import CourseProgress from "./CourseProgress.vue";
import CoureseMenu from "./CoureseMenu.vue";
import CourseGlossary from "./CourseGlossary.vue";

const props = defineProps({
  title: {
    type: String,
    default: 'Курс Яндекс.Еды'
  },
})

const menu = ref({
  show: false,
  links: [
    {
      title: 'Управление группой',
      url: '/'
    },
    {
      title: 'Групповая динамика',
      url: '/'
    },
    {
      title: 'Роли тренера',
      url: '/'
    },
    {
      title: 'Роли участников',
      url: '/'
    },
  ]
})
const glossary = ref({
  show: false,
})
const showMenu = () => {
  return menu.value.show = !menu.value.show
}

</script>

<template>
  <header class="yEda-player__header">
    <div class="yEda-player__header-info">
      <img width="113" height="20" src="../../assets/logo.svg" alt="Логотип Яндекс Еды">
      <p class="yEda-player__header-title">{{ title }}</p>
    </div>
    <div class="yEda-player__header-status">
      <course-progress/>
      <nav class="yEda-player__header-nav">
        <button><svg-icon name="download"/></button>
        <button><svg-icon name="glossary"/></button>
        <button @click="showMenu"><svg-icon name="nav"/></button>
      </nav>
    </div>
  </header>
  <course-glossary :show="glossary.show"/>
  <courese-menu :show="menu.show" :links="menu.links"/>
</template>

<style lang="scss" scoped>
  .yEda-player__header {
    display: flex;
    z-index: 10;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #808080;
    background-color: var(--bg-player);

    &-info {
      display: flex;
      align-items: center;
    }

    &-title {
      font-size: 16px;
      padding-left: 24px;
      color: #222222;
    }

    &-nav {
      button {
        padding: 0;
        background-color: transparent;
        border: 0;
        margin: 0 8px;
        svg {
          transition: 0.3s;
        }

        &:hover {
          svg {
            fill: var(--link-hover-primary);
          }
        }
        &:focus {
          outline: none;
        }
      }
    }
    &-status {
      display: flex;
    }
  }
</style>