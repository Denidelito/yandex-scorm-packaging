<script setup>
import Speech from "../components/Speech.vue";
import { useScormStore } from "../store/scormStore.js";
import {onMounted} from "vue";

const dataSpeech = [
  'Привет, меня зовут Иван и я руководитель команды обучения!',
  'В этом курсе я расскажу тебе о роли групповой динамики в тренингах - как она используется в создании команд и в длительной работе с учебными группами.',
  'Я научу тебя развивать команды в зависимости от целей, которые нужно достичь в обучении.',
]

const scormStore = useScormStore();

onMounted(() => {
  const savedNavData = scormStore.getCustomData('navDataStore');

  if (savedNavData === undefined) {
    scormStore.setCustomData('navDataStore', {
      slide: '',
      visited: []
    });
  }
});

</script>

<template>
  <speech class="mt-60" :speech-data="dataSpeech"/>
</template>

<style scoped>

</style>