<template>
  <div>
    <h2 class="mt-35">Тренинг</h2>
    <quze
        name="quze6"
        :questions="quizQuestions"
        :parameters="parameters"
        :store="quzeStore"
    />
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import Quze from "../components/quze/Quze.vue";
import { useScormStore } from "../store/scormStore.js";

const scormStore = useScormStore();

const quizQuestions = [
  {
    question: 'Групповая динамика это —',
    Answer: [
      { text: 'цикл жизнедеятельности малой группы.', parameter: ['interest', 'engagement', 'understanding'], correct: false, feedback: ['Запоминание этих критериев групповой динамики дает возможность вовремя вспомнить их на каждом этапе группы в реальной работе и вернутся к материалу.'] },
      { text: 'процесс образования и распада группы.', parameter: ['interest', 'engagement', 'understanding'], correct: false, feedback: ['Запоминание этих критериев групповой динамики дает возможность вовремя вспомнить их на каждом этапе группы в реальной работе и вернутся к материалу.'] },
      { text: 'процесс взаимодействия членов группы между собой.', parameter: ['interest', 'engagement', 'understanding'], correct: true, feedback: ['Запоминание этих критериев групповой динамики дает возможность вовремя вспомнить их на каждом этапе группы в реальной работе и вернутся к материалу.'] },
    ],
  },
];

const parameters = ref({
  engagement: 0,
  interest: 0,
  understanding: 0
})

const quzeStore = ref({
  questionIndex: 0,
  selectedAnswer: null,
  feedbackVisible: false,
  answers: []
})

/*
const resultMessage = computed(() => {
  const totalScore = parameters.value.engagement + parameters.value.interest + parameters.value.understanding;
  return totalScore >= 2 ? ['Ты не плохо справился! Но Таня и Маша сидели  в телефонах и постоянно отвлекались.', 'Не переживай, такое может случаться в начале профессионального пути тренера. Чтобы лучше понять, почему это происходит, давай разберёмся с понятием групповой динамики и рассмотрим этапы формирования группы.'] : ['Ты не плохо справился! Но Таня и Маша сидели  в телефонах и постоянно отвлекались.', 'Не переживай, такое может случаться в начале профессионального пути тренера. Чтобы лучше понять, почему это происходит, давай разберёмся с понятием групповой динамики и рассмотрим этапы формирования группы.'];
});
*/

onMounted(() => {
  const saveParameters = scormStore.getCustomData('quzeParameters');
  const saveQuze = scormStore.getCustomData('quze6');

  if (saveParameters) {
    parameters.value = saveParameters;
  }

  if (saveQuze) {
    quzeStore.value = saveQuze;
  }
})
</script>
