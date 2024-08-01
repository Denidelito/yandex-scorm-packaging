<script setup>
import Speech from "../components/Speech.vue";
import {ref} from "vue";

const dataSpeech = [
  'Давайте познакомимся с основными принципами андрагогики и рассмотрим несколько кейсов.'
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


