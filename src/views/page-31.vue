<script setup>
import {onMounted, ref} from "vue"
import Speech from "../components/Speech.vue";
import CardFlip from "../components/CardFlip.vue";

const dataSpeech = ref([
  '<b>Роль равного</b>: применяется, когда тренер желает установить отношения на основе партнерства и взаимного уважения с учащимися.',
  'В роли равного тренер становится активным участником обучающего процесса, сотрудничая с участниками, делясь своим опытом и обратной связью.',
  'Если грамотно использовать эту роль, то на стадии конфликтов, тренер сможет помочь найти корень проблемы и коллективное решение волнующего вопроса.',
])

</script>

<template>
  <div>
    <speech class="mt-25" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped>
  .row {
    display: flex;
    gap: 70px;
  }
</style>