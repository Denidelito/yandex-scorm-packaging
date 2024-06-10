<script setup>
import CourseHeader from "./components/CourseHeader.vue";
import CourseFooter from "./components/CourseFooter.vue";
import { useScormStore } from './store/scormStore.js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const scormStore = useScormStore();
const router = useRouter()

onMounted(() => {
  scormStore.initializeScorm()
  router.push(scormStore.lessonLocation)
})
</script>

<template>
  <div class="yEda-player">
    <course-header/>
    <section class="yEda-player__container">
      <router-view />
    </section>
    <course-footer/>
  </div>
</template>

<style lang="scss" scoped>
  .yEda-player {
    width: 1200px;
    height: 700px;
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
