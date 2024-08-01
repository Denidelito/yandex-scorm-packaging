<script setup>
import Speech from "../components/Speech.vue";

const dataSpeech = [
  '<b>Групповая динамика</b> — это взаимодействие и поведение участников группы, которое влияет на процесс обучения и достижение целей тренинга. Она включает понимание <b>5 этапов</b> формирования группы.',
]
</script>

<template>
  <speech class="mt-60" :speech-data="dataSpeech"/>
</template>

<style scoped>

</style>