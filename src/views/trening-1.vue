<template>
  <div>
    <h2 class="mt-35">Тренинг</h2>
    <quze
        name="quze1"
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
    question: 'Итак, ты начинаешь тренинг, что ты сделаешь с группой в первую очередь?',
    Answer: [
      { text: 'Проведу игру-знакомство', parameter: ['interest'], correct: false, feedback: ['Организованное знакомство группы и правила взаимодействия внутри неё создают безопасную среду для участников. Им становится ясно с кем они работают и стартовые условия коммуникаций'] },
      { text: 'Установлю правила обучения', parameter: ['interest'], correct: false, feedback: ['Организованное знакомство группы и правила взаимодействия внутри неё создают безопасную среду для участников. Им становится ясно с кем они работают и стартовые условия коммуникаций'] },
      { text: 'Обговорим общую цель на обучение', parameter: ['understanding'], correct: true, feedback: ['Чем больше обучение отвечает реальным проблемам обучающихся, тем выше их эффективность'] },
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
  const saveQuze = scormStore.getCustomData('quze1');

  if (saveParameters && saveQuze) {
    parameters.value = saveParameters;
    quzeStore.value = saveQuze;
  }
})
</script>
