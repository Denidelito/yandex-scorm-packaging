<template>
  <div>
    <h2 class="mt-35">Тренинг</h2>
    <quze
        name="quze5"
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
    question: 'Ты закончил тренинг! Что будешь делать со своей группой?',
    Answer: [
      { text: 'Поблагодарю участников и дам им высказаться', parameter: ['interest'], correct: false, feedback: ['Тренеру важно ставить точку с группой, чтобы прочувствовать окончание всего мероприятия.'] },
      { text: 'Соберу обратную связь о всем тренинге', parameter: ['interest', 'engagement'], correct: false, feedback: ['Устная первая обратная связь по всему мероприятию важна как для тренера, так и для участников. Это позволяет поставить психологически точку и двинуться дальше.'] },
      { text: 'Отмечу успехи ребят, чтобы поднять мотивацию', parameter: ['engagement', 'understanding'], correct: true, feedback: ['Акцент на правильных выводах, их объяснение позволяет участникам ещё больше погрузиться в материал.'] },
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
  const saveQuze = scormStore.getCustomData('quze5');

  if (saveParameters) {
    parameters.value = saveParameters;
  }

  if (saveQuze) {
    quzeStore.value = saveQuze;
  }
})
</script>
