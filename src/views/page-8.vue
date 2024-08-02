<script setup>
import Speech from "../components/Speech.vue";

const dataSpeech = [
  'На формирующей стадии участники команды только знакомятся с её структурой и стараются понять ожидания друг друга и руководства.',
  'Групповая динамика начинает зарождаться от первых контактов. Нам важно помочь человеку сориентироваться в курсе и понять свою роль. Так мы сразу направим внимание на цель обучения.',
]
</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped>
</style>