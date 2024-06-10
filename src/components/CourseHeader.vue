<script setup>
import svgIcon from "./SvgIcon.vue";
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Курс Яндекс.Еды'
  }
})

</script>

<template>
<header class="yEda-player__header">
  <div class="yEda-player__header-info">
    <img width="113" height="20" src="../assets/logo.svg" alt="Логотип Яндекс Еды">
    <p class="yEda-player__header-title">{{ title }}</p>
  </div>
  <nav class="yEda-player__header-nav">
    <button><svg-icon name="download"/></button>
    <button><svg-icon name="glossary"/></button>
    <button><svg-icon name="nav"/></button>
  </nav>
</header>
</template>

<style lang="scss" scoped>
  .yEda-player__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #808080;

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
  }
</style>