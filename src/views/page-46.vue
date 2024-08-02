<script setup>
import { ref, onMounted } from "vue";
import Speech from "../components/Speech.vue";
import Card from "../components/Card.vue";

const dataSpeech = ref([
  'Теперь рассмотрим демократическую группу.',
  'Ты проводишь тренинг для команды, состоящей из креативных и инициативных сотрудников. Цель тренинга — развитие мышления и командной работы. Участники привыкли к гибкой и неформальной атмосфере, где каждый может предложить идеи и повлиять на принятие решений.',
])

const cardVisible = ref(false)

onMounted(() => {
  setTimeout(() => cardVisible.value = true, 1500);
})

</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
    <card class="mt-60" v-if="cardVisible"
          animate-class="animate__fadeInRight"
          icon="icon-16"
          icon-position="left"
          text="В этом контексте демократическая структура группы подходит для стимулирования творчества и коллективного принятия решений. В начале тренинга вы создаете открытую атмосферу, поощряете участников к активному участию и обмену мнениями. Этот подход позволяет каждому внести свой вклад и чувствовать свою значимость в команде." />
    <div class="slide__bg">
      <img width="1280" height="700" src="../assets/images/background/speech.png" alt="Фон слайда с оффисом Яндекс">
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>