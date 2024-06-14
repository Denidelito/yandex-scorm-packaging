<script setup>
import CourseHeader from "./components/coursePlayer/CourseHeader.vue";
import CourseFooter from "./components/coursePlayer/CourseFooter.vue";
import { useScormStore } from './store/scormStore.js'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const scormStore = useScormStore();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  // scormStore.initializeScorm()
  router.push(scormStore.lessonLocation)
})
</script>

<template>
  <div class="yEda-player">
    <course-header v-if="route.fullPath !== '/'" title="Управление группой"/>
    <section class="yEda-player__container">
      <router-view v-slot="{ Component }">
        <transition
            appear
            mode="out-in"
            appear-active-class="animate__animated animate__fadeIn"
            enter-active-class="animate__animated animate__faster animate__fadeIn"
        >
          <component :is="Component"></component>
        </transition>
      </router-view>
    </section>
    <course-footer v-if="route.fullPath !== '/'" title="Управление группой"/>
  </div>
</template>

<style lang="scss" scoped>
  .yEda-player {
    position: relative;
    width: 1200px;
    height: 700px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--bg-player);
    padding: 0 40px;

    &__container {
      height: 100%;
    }
  }
</style>
