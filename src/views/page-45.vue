<script setup>
import { ref, onMounted } from "vue";
import Speech from "../components/Speech.vue";
import Card from "../components/Card.vue";

const dataSpeech = ref([
  'Подробнее рассмотрим иерархическую группу на примере.',
  'Ты проводишь тренинг для команды. Цель — улучшить навыки управления и принятия решений в условиях высокой конкуренции и жестких сроков. Участники привыкли работать в структуре, где решения спускаются сверху, а обязанности четко распределены.',
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
          icon="icon-15"
          icon-position="left"
          text="В ходе тренинга вы делите участников на подгруппы, назначая лидеров для каждой. Лидеры отвечают за координацию работы своей группы и представление результатов. При возникновении вопросов или проблем участники обращаются к назначенным лидерам, которые в свою очередь передают информацию тебе как тренеру." />
    <div class="slide__bg">
      <img width="1280" height="700" src="../assets/images/background/speech.png" alt="Фон слайда с оффисом Яндекс">
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>