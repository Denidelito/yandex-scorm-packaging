<script setup>
import {onMounted, ref} from "vue"
import Speech from "../components/Speech.vue";
import CardFlip from "../components/CardFlip.vue";

const dataSpeech = ref([
  'Не забывай, у каждой роли есть плюсы и минусы. Задача тренера – правильно их использовать.',
  'Конечно же, типология участников несколько шире и есть разные концепции взаимодействия с ними, но мы с тобой рассмотрели самые важные из них.',
])

</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped>
  .row {
    display: flex;
    gap: 70px;
  }
</style>