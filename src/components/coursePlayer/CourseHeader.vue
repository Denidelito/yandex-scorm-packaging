<script setup>
import SvgIcon from "../SvgIcon.vue";
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

const visibleSection = ref(''); // '' (none), 'menu', 'glossary'

const menuLinks = [
  { title: 'Управление группой', url: '/' },
  { title: 'Групповая динамика', url: '/' },
  { title: 'Роли тренера', url: '/' },
  { title: 'Роли участников', url: '/' },
];

const glossaryWords = [
  {
    word: 'Определение',
    description: 'Описание опрведеления'
  },
  {
    word: 'Определение',
    description: 'Описание опрведеления'
  },
  {
    word: 'Определение',
    description: 'Описание опрведеления'
  },
  {
    word: 'Определение',
    description: 'Описание опрведеления'
  },
  {
    word: 'Определение',
    description: 'Описание опрведеления'
  },
  {
    word: 'Определение',
    description: 'Описание опрведеления'
  },
  {
    word: 'Определение',
    description: 'Описание опрведеления'
  },
  {
    word: 'Определение',
    description: 'Описание опрведеления'
  },
  {
    word: 'Определение',
    description: 'Описание опрведеления'
  },
]
const toggleSection = (section) => {
  visibleSection.value = visibleSection.value === section ? '' : section;
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
        <button @click="toggleSection('glossary')"><svg-icon name="glossary"/></button>
        <button @click="toggleSection('menu')"><svg-icon name="nav"/></button>
      </nav>
    </div>
  </header>
  <course-glossary :show="visibleSection === 'glossary'" :words="glossaryWords"/>
  <courese-menu :show="visibleSection === 'menu'" :links="menuLinks"/>
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