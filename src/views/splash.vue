<script setup>

import SvgIcon from "../components/SvgIcon.vue";
</script>

<template>
<div class="splash">
  <div class="splash__container">
    <img width="249" height="44" src="../assets/logo-big.svg" alt="Логотип Яндекс Еды">
    <h1>Управление группой</h1>
    <router-link class="splash__btn" to="/slide-1">
      Начать
      <svg-icon name="arrow"/>
    </router-link>
  </div>
</div>
</template>

<style scoped lang="scss">
.splash {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 -40px;
  background-image: url("../assets/images/splash.jpg");

  &__container {
    width: 870px;
    padding: 36px 48px;
    border-radius: 0 16px 16px 0;
    background-color: white;

    & > img {
      margin-bottom: 24px;
    }

    & > h1 {
      margin-bottom: 49px;
    }
  }

  &__btn {
    display: flex;
    width: fit-content;
    align-items: center;
    font-size: 20px;
    padding: 11px 36px;
    border-radius: 8px;
    background-color: var(--btn-color-bg);
    color: var(--btn-color);
    transition: .3s;

    &:hover {
      background-color: var(--btn-color-bg-hover);
      color: var(--btn-color-hover);
    }
  }
}
</style>