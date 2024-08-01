<script setup>
import Speech from "../components/Speech.vue";
import { ref } from "vue"
const dataSpeech = [
  'Управление групповой динамикой требует понимания этапов развития команды. Один из наиболее признанных подходов к этому вопросу был предложен Брюсом Такманом.',
]

let show = ref(false);

setTimeout(() => {
  show.value = true;
}, 1000);

</script>

<template>
  <div>
    <speech class="mt-25" :speech-data="dataSpeech" size="large"/>
    <div class="shem animate__animated animate__fadeIn" v-if="show">
      <img width="1200" height="420" src="../assets/images/shem/shem-1.png" alt="">
    </div>
  </div>
</template>

<style scoped>
.shem {
  position: absolute;
  bottom: 30px;
}
</style>