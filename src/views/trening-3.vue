<template>
  <div>
    <h2 class="mt-35">Тренинг</h2>
    <quze
        name="quze3"
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
    question: 'Супер, наши ребята разогнались и эффективно проходят обучение. Главное сейчас не потерять темп, как думаешь что лучше сделать?',
    Answer: [
      { text: 'После упражнений буду собирать обратную связь', parameter: ['interest'], correct: false, feedback: ['Сбор обратной связи показывает участникам, что их мнение важно и они здесь могут безопасно его выражать. Это раскрепощает и стимулирует процесс генерации новых идей.'] },
      { text: 'Займу позицию наблюдателя', parameter: ['engagement', 'understanding'], correct: false, feedback: ['Самостоятельное функционирование группы позволяет участникам лучше усваивать выводы.'] },
      { text: 'Буду внимателен, вовремя поощрять участников', parameter: ['engagement', 'understanding'], correct: true, feedback: ['Позитивное подкрепление поощряет к поиску правильных ответов.'] },
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
  const saveQuze = scormStore.getCustomData('quze3');

  if (saveParameters) {
    parameters.value = saveParameters;
  }

  if (saveQuze) {
    quzeStore.value = saveQuze;
  }
})
</script>
