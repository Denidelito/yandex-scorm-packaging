<script setup>
import { useRouter, useRoute} from "vue-router";
import {computed, watch,  ref} from "vue";

const router = useRouter();
const route = useRoute();

const routes = ref(router.getRoutes());

const updateRoutes = () => {
  routes.value = router.getRoutes();
};

const progressCourseInPercent = computed(() => {
  const findRoute = routes.value.find(item => item.path === route.path);
  return Math.floor(routes.value.indexOf(findRoute) / routes.value.length * 100);
});

watch(route, () => {
  updateRoutes();
});
</script>

<template>
  <div class="progress">
    <div class="progress__info">
      <div class="progress__title">Прогресс</div>
      <div class="progress__score">{{ progressCourseInPercent }}%</div>
    </div>
    <div class="progress__line">
      <div class="progress__line-fluid" :style="`width: ${progressCourseInPercent}%`"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.progress {
  margin: 0 24px;
  &__info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 2px;
  }
  &__line {
    width: 160px;
    height: 2px;
    border-radius: 1px;
    background-color: rgba(34, 34, 34, 0.2);

    &-fluid {
      transition: .3s;
      height: 100%;
      width: 100%;
      background-color: var(--btn-color-bg);
    }
  }
}
</style>