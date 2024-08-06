<template>
  <div>
    <h2 class="mt-35">Тренинг</h2>
    <quze
        name="quze4"
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
    question: 'Твоя группа вошла в стадию функционирования, что будешь делать?',
    Answer: [
      { text: 'Контролировать критику от участников', parameter: ['interest'], correct: false, feedback: ['Контроль критики защищает новые идеи, в критикующей среде они не рождаются.'] },
      { text: 'Обозначать правильные решения уча  стников и поощрять их', parameter: ['interest'], correct: false, feedback: ['Позитивное подкрепление поощряет к поиску правильных ответов.'] },
      { text: 'Поддерживать правильные выводы группы', parameter: ['engagement'], correct: true, feedback: ['Акцент на правильных выводах, их объяснение позволяет участникам ещё больше погрузиться в материал.'] },
      { text: 'Создам атмосферу для новых идей', parameter: ['engagement'], correct: true, feedback: ['Отсутствие критики, принятие идей участников, поощрение их способствует ещё большему вниманию к обучению.'] },
      /*{ text: 'Проводить упражнения или игры на применения опыта', parameter: ['engagement', 'understanding'], correct: true, feedback: ['Чем больше моделируемая ситуация похожа на ту, с чем сталкивался или может столкнутся обучающийся, тем больше его вовлеченность и лучше усваемость выводов.'] },
      { text: 'Оперативно отвечать на вопросы участников', parameter: ['understanding'], correct: true, feedback: ['Оперативное решение вопросов участников способствует и их быстрым действиям.'] },
      { text: 'Стимулировать рассуждение участников', parameter: ['understanding'], correct: true, feedback: ['Наводящие вопросы, подсвечивающие проблему, позволяет участникам более конструктивно рассуждать и быстрее решать задачи.'] },*/
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
  const saveQuze = scormStore.getCustomData('quze4');

  if (saveParameters) {
    parameters.value = saveParameters;
  }

  if (saveQuze) {
    quzeStore.value = saveQuze;
  }
})
</script>
