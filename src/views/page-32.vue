<script setup>
import {onMounted, ref} from "vue"
import Speech from "../components/Speech.vue";
import CardFlip from "../components/CardFlip.vue";

const dataSpeech = ref([
  '<b>Роль спасателя</b>: необходима в ситуациях, когда участники сталкиваются с трудностями или неуверенностью.',
  'Тренер в роли спасателя предоставляет поддержку, помогает преодолевать препятствия, разрешать учебные и личные проблемы участников.',
  'Такую роль эффективно использовать когда группа находится на стадиях нормирующей и функционирования.',
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