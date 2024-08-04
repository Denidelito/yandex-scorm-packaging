<script setup>
import { ref, onMounted } from "vue";
import Speech from "../components/Speech.vue";
import Card from "../components/Card.vue";

const dataSpeech = ref([
  'Одним из лучших инструментов для поддержания атмосферы в группе являются игры и упражнения. Давай рассмотрим как они влияют на отношения и атмосферу в группе.',
])



</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped lang="scss">

</style>