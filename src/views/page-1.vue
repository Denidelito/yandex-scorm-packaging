<script setup>
import Speech from "../components/Speech.vue";

const dataSpeech = [
    'Это экран навигации. Тут ты можешь ознакомиться с элементами управления курса.'
]
</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech"/>
  </div>
</template>

<style lang="scss" scoped>
  .mt-60 {
    margin-top: 60px;
  }
</style>