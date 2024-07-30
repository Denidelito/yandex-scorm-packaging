<template>
  <div>
    <h2 class="mt-35">Тренинг</h2>
    <quze
        :questions="quizQuestions"
        :resultMessage="resultMessage"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Quze from "../components/quze/Quze.vue";

const quizQuestions = [
  {
    question: 'Что такое арбуз?',
    Answer: [
      { text: 'Фрукт', parameter: 'understanding', correct: false },
      { text: 'Ягода', parameter: 'interest', correct: true },
      { text: 'Овощ', parameter: 'engagement', correct: false }
    ],
  },
  {
    question: 'Какие из следующих фруктов являются цитрусовыми?',
    Answer: [
      { text: 'Апельсин',parameter: 'engagement', correct: true },
      { text: 'Яблоко', parameter: 'interest', correct: false },
      { text: 'Лимон', parameter: 'interest', correct: true },
      { text: 'Банан', parameter: 'understanding', correct: false }
    ],
  }
];

const parameters = ref({
  engagement: 0,
  interest: 0,
  understanding: 0
});

const resultMessage = computed(() => {
  const totalScore = parameters.value.engagement + parameters.value.interest + parameters.value.understanding;
  return totalScore >= 2 ? ['Ты не плохо справился! Но Таня и Маша сидели  в телефонах и постоянно отвлекались.', 'Не переживай, такое может случаться в начале профессионального пути тренера. Чтобы лучше понять, почему это происходит, давай разберёмся с понятием групповой динамики и рассмотрим этапы формирования группы.'] : ['Ты не плохо справился! Но Таня и Маша сидели  в телефонах и постоянно отвлекались.', 'Не переживай, такое может случаться в начале профессионального пути тренера. Чтобы лучше понять, почему это происходит, давай разберёмся с понятием групповой динамики и рассмотрим этапы формирования группы.'];
});
</script>
