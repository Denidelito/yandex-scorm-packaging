<script setup>
import SvgIcon from "./SvgIcon.vue";
import { useRouter, useRoute } from "vue-router";
import { useScormStore } from "../store/scormStore.js";

const scormStore = useScormStore();
const route = useRoute();
const router = useRouter();
const routes = router.options.routes;
const currentIndexRoute = routes.findIndex(item => item.path === route.fullPath);
const routeNext = function () {
  return routes[currentIndexRoute + 1].path;
}

const routerPrev = function () {
  if (currentIndexRoute === 0) {
    return routes[currentIndexRoute].path
  }

  return routes[currentIndexRoute - 1].path;
}
</script>

<template>
  <div class="yEda-player__nav">
    <router-link class="yEda-player__btn-prev" :to="routerPrev()">
      <svg-icon name="arrow"/>
    </router-link>
    <slot></slot>
    <router-link class="yEda-player__btn-nex" :to="routeNext()">
      Продолжить
      <svg-icon name="arrow"/>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  .yEda-player {
    &__nav {
      display: flex;
      align-items: center;
      border-radius: 16px;
      box-shadow: 0 5px 4px 0 rgba(#000, 20%);
    }
    &__btn-nex {
      display: flex;
      color: var(--bgn-color);
      background-color: var(--btn-color-bg);
      border-radius: 16px;
      padding: 10px 24px;

      svg {
        margin-left: 12px;
      }
    }
    &__btn-prev {
      display: flex;
      color: var(--btn-color);
      padding: 10px 16px;

      svg {
        transform: rotate(180deg);
      }
    }
  }
</style>