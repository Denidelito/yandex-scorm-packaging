<script setup>
import { ref, onMounted } from "vue";
import { useScormStore } from "../store/scormStore.js";
import Speech from "../components/Speech.vue";

const dataSpeech = ref([
  'Эффективное управление временем является краеугольным камнем любого успешного группового тренинга.',
  'Он определяет не только хронологический порядок мероприятий, но и влияет на эмоциональное состояние и вовлечённость участников. ',
  'В данном разделе мы рассмотрим аспекты правильного тайминга, который помогает сделать тренинг максимально продуктивным и полезным для всех участников.',
])

</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped lang="scss">

</style>