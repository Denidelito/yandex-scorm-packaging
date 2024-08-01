<script setup>
import Speech from "../components/Speech.vue";
import { ref } from "vue"
const dataSpeech = [
  'Роль тренера важна, поскольку он направляет, мотивирует и поддерживает участников, помогая им достичь поставленных целей.',
  'Тренер также создает благоприятную обучающую среду и адаптирует методы обучения под потребности группы.',
]

let show = ref(false);

setTimeout(() => {
  show.value = true;
}, 1000);

</script>

<template>
  <div>
    <speech class="mt-25" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped>
.shem {
  position: absolute;
  bottom: 30px;
}
</style>