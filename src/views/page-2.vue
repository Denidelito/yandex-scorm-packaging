<script setup>

import Speech from "../components/Speech.vue";

const dataSpeech = [
  'Привет, меня зовут Иван и я руководитель команды обучения!',
  'В этом курсе я расскажу тебе о роли групповой динамики в тренингах - как она используется в создании команд и в длительной работе с учебными группами.',
  'Я научу тебя развивать команды в зависимости от целей, которые нужно достичь в обучении.',
]
</script>

<template>
  <speech class="mt-60" :speech-data="dataSpeech"/>
</template>

<style scoped>

</style>