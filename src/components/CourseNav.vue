<script setup>
import { computed, onBeforeMount, ref } from "vue";
import SvgIcon from "./SvgIcon.vue";
import { useRouter, useRoute } from "vue-router";
import { useScormStore } from "../store/scormStore.js";

const scormStore = useScormStore();
const route = useRoute();
const router = useRouter();
const routes = router.options.routes;

const currentIndexRoute = computed(() => {
  return routes.findIndex(item => item.path === route.fullPath);
});

const toRouteNext = computed(() => {
  return routes[currentIndexRoute.value + 1]?.path || routes[currentIndexRoute.value].path;
});

const toRoutePrev = computed(() => {
  return currentIndexRoute.value === 0 ? routes[0].path : routes[currentIndexRoute.value - 1].path;
});

const routeNext = function () {
  if (currentIndexRoute.value < routes.length - 1) {
    currentIndexRoute.value++;
    scormStore.setLessonLocation(routes[currentIndexRoute.value].path);
  }
}

const routerPrev = function () {
  if (currentIndexRoute.value > 0) {
    currentIndexRoute.value--;
    scormStore.setLessonLocation(routes[currentIndexRoute.value].path);
  }
}
</script>

<template>
  <div class="yEda-player__nav">
    <router-link class="yEda-player__btn-prev" :to="toRoutePrev" @click="routerPrev">
      <svg-icon name="arrow"/>
    </router-link>
    <slot></slot>
    <router-link class="yEda-player__btn-nex" :to="toRouteNext" @click="routeNext">
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
      transition: .3s;

      svg {
        margin-left: 12px;
      }

      &:hover {
        background-color: var(--btn-color-bg-hover);
        color: var(--btn-color-hover);
      }
    }
    &__btn-prev {
      display: flex;
      color: var(--btn-color);
      padding: 10px 16px;
      transition: .3s;

      svg {
        transform: rotate(180deg);
      }

      &:hover {
        color: var(--link-hover-primary);
      }
    }
  }
</style>