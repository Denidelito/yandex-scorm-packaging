<script setup>
import Slider from "../components/Slider.vue";
import Speech from "../components/Speech.vue";
import {ref} from "vue";

const dataSpeech = [
  'Давай попрактикуемся в определении стадий формирования группы.',
]


let show = ref(false);

setTimeout(() => {
  show.value = true;
}, 1000);

</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" />
  </div>
</template>

<style scoped lang="scss">

</style>


