<script setup>
import Speech from "../components/Speech.vue";
import {ref} from "vue";

const dataSpeech = [
  'Теперь ты знаешь основные принципы андрагогики. Давай остановимся и закрепим пройденный материал.'
]


let show = ref(false);

setTimeout(() => {
  show.value = true;
}, 1000);

</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech"/>
  </div>
</template>

<style scoped lang="scss">

</style>


