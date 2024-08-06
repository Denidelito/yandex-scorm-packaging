<script setup>
import SortableQuze from "../components/quze/SortableQuze.vue";
import { useScormStore } from "../store/scormStore.js";
import {onMounted, ref} from "vue";

const scormStore = useScormStore();

const task = 'Сопоставь стадии развития группы с её описанием';
const questions = [
  {text: 'Тренер проводит тренинг для нового отдела, состоящего из сотрудников разных отделов, недавно объединённых для совместного проекта. Участники ещё не знакомы и только начинают понимать свои взаимодействия и роли в команде.', id: 1},
  {text: 'Тренер проводит тренинг для команды из десяти человек, работающих над крупным проектом в IT-компании. Возникают разногласия между разработчиками и тестировщиками относительно приоритетов и сроков, что приводит к напряжению и конфликтам.', id: 2},
  {text: 'Тренер работает с маркетинговым отделом компании, где недавно разрешили внутренние конфликты и выстроили роли в команде. Теперь команда готовится к новой стадии проекта и нуждается в усилении сотрудничества и эффективности работы.', id: 3},
  {text: 'Команда хорошо структурирована, её члены обладают высокой степенью автономии и способностью к самоорганизации. Отношения между участниками сильные и поддерживающие, они совместно работают над достижением проектных целей.', id: 4},
];
const answers = [
  {text: 'Формирующая', id: 1},
  {text: 'Конфликтная', id: 2},
  {text: 'Нормирующая', id: 3},
  {text: 'Стадия функционирования', id: 4}
];
const feedback = {
  correct: ['Формирующая: Важно сформировать доверие. Как внутри группы, так и от группы к тренеру и наоборот.', 'Конфликтная: Растет вовлеченность в работу, и если доверие сформировалось, то участники не боятся высказать недовольство и происходят конфликты.', 'Номирующая: Высокая вовлеченность и хорошая эффективность.', 'Функционирования: Самая высокая эффективность, команда не просто научилась вместе работать, на этом этапе команда способна самообучаться.'],
  incorrect: ['Допущена ошибка, твой выбор не помог улучшить динамику группы. Попробуй ещё раз!']
}


const parameters = ref({
  engagement: 0,
  interest: 0,
  understanding: 0
})
const sortableStore = ref({
  complete: false,
  feedbackVisible: false,
})


onMounted(() => {
  const saveParameters = scormStore.getCustomData('quzeParameters');
  const saveSortable = scormStore.getCustomData('sortable1');

  if (saveParameters) {
    parameters.value = saveParameters;
  }

  if (saveSortable) {
    sortableStore.value = saveSortable;
  }
})
</script>

<template>
  <div>
    <sortable-quze
        name="sortable1"
        :answers="answers"
        :questions="questions"
        :task="task"
        :feedback="feedback"
        :sortStore="sortableStore"
        :parameters="parameters"
    />
  </div>
</template>

<style scoped>
</style>
