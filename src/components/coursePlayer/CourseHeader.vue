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
  { title: 'Этапы формирования группы', url: '/splash-1' },
  { title: 'Формирующая стадия', url: '/splash-2' },
  { title: 'Конфликтная стадия', url: '/splash-3' },
  { title: 'Стадия нормализации', url: '/splash-4' },
  { title: 'Стадия функционирования', url: '/splash-5' },
  { title: 'Стадия расставания', url: '/splash-6' },
  { title: 'Андрагогика', url: '/splash-7' },
  { title: 'Роли тренера', url: '/splash-8' },
  { title: 'Роли участников', url: '/splash-9' },
  { title: 'Структура группы', url: '/splash-10' },
  { title: 'Факторы сплочённости', url: '/splash-11' },
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

const handleShowUpdate = (newStatus) => {
  toggleSection(newStatus)
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
  <courese-menu @update-show="handleShowUpdate" :show="visibleSection === 'menu'" :links="menuLinks"/>
</template>

<style lang="scss" scoped>
  .yEda-player__header {
    display: flex;
    z-index: 11;
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