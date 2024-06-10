<script setup>
import { useHeaderStore } from "../store/header.js";
import SvgIcon from "./SvgIcon.vue";

const headerStore = useHeaderStore();

</script>

<template>
<header class="yEda-player__header">
  <div class="yEda-player__header-info">
    <img width="113" height="20" src="../assets/logo.svg" alt="Логотип Яндекс Еды">
    <p>Управление группой</p>
  </div>
  <nav>
    <svg-icon name="download"/>
  </nav>
</header>
</template>

<style lang="scss" scoped>
  .yEda-player__header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 10px 0;
    border-bottom: 1px solid #808080;

    &-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>