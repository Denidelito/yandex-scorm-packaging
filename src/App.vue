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
    <course-header title="Управление группой"/>
    <section class="yEda-player__container">
      <router-view v-slot="{ Component }">
        <transition
            appear
            mode="out-in"
            appear-active-class="animate__animated animate__fadeIn"
            enter-active-class="animate__animated animate__faster animate__fadeIn"
            leave-active-class="animate__animated animate__faster animate__fadeOut"
        >
          <component :is="Component"></component>
        </transition>
      </router-view>
    </section>
    <course-footer/>
  </div>
</template>

<style lang="scss" scoped>
  .yEda-player {
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
