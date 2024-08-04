<script setup>
import SortableQuze from "../components/quze/SortableQuze.vue";
const task = 'Соотнеcи факторы сплоченности группы.';
const questions = [
  {text: 'Во время тренинга участники делятся на малые группы для выполнения различных задач, направленных на разработку совместных решений, участвуют в ролевых играх и штурмах.', id: 1},
  {text: 'На тренинге присутствуют взаимоотношения, основанные на доверии и поддержке. Тренер рассказывает как важно создать среду, где каждый может спокойно делиться идеями и предложениями, не опасаясь негативных последствий.', id: 2},
];
const answers = [
  {text: 'Совместная деятельность', id: 1},
  {text: 'Психологическая безопасность', id: 2},
];
const feedback = {
  correct: ['Ты отлично справился и правильно соотнёс факторы сплоченности группы!'],
  incorrect: ['Ты ошибся, попробуй ещё раз!']
}
</script>

<template>
  <div>
    <sortable-quze :answers="answers" :questions="questions" :task="task" :feedback="feedback" size="large"/>
  </div>
</template>

<style scoped>
</style>
