<script setup>
import { ref, onMounted } from "vue";
import { useScormStore } from "../store/scormStore.js";
import Speech from "../components/Speech.vue";

const dataSpeech = ref([
  'Эффективное управление временем является краеугольным камнем любого успешного группового тренинга.',
])

</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped lang="scss">

</style>