<script setup>
import { ref, onMounted } from "vue";
import Speech from "../components/Speech.vue";
import Card from "../components/Card.vue";

const dataSpeech = ref([
  'Ты не плохо справился! Но Таня и Маша сидели  в телефонах и постоянно отвлекались.',
  'Не переживай, такое может случаться в начале профессионального пути тренера. Чтобы лучше понять, почему это происходит, давай разберёмся с понятием групповой динамики и рассмотрим этапы формирования группы.',
])



</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped lang="scss">

</style>