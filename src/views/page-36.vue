<script setup>
import {onMounted, ref} from "vue"
import Speech from "../components/Speech.vue";
import CardFlip from "../components/CardFlip.vue";

const dataSpeech = ref([
  'Иногда один из участников, постоянно перетягивает внимание на себя и это очень сбивает.',
  'Такой тип участников называется сложным.',
  'В большинстве случаев, каждый участник тренинга осознанно или неосознанно выбирает какую-либо роль в обучении. Разберем основных участников, и я расскажу, что с ними делать.',
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