<template>
  <div>
    <h2 class="mt-35">Тренинг</h2>
    <quze
        name="quze2"
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
    question: 'Во время тренинга Андрею не понравилось поведение Ангелины и он решил покинуть обучение. Что будешь делать?',
    Answer: [
      { text: 'Зафиксирую соглашение', parameter: ['interest'], correct: false, feedback: ['Решение конфликта позволяет группе обрести новый уровень доверия друг к другу. А его фиксация ставит в конфликте точку.'] },
      { text: 'Узнаю что Андрею не понравилось', parameter: ['engagement', 'interest', 'understanding'], correct: false, feedback: ['выслушать все стороны и всеми выдвинуть варианты решения, а потом вместе выбрать наиболее удовлетворяющий всех.'] },
      { text: 'Проведу мозговой штурм по решению проблемы', parameter: ['interest', 'understanding'], correct: true, feedback: ['Прояснить ситуацию важно в моменте, потому что после её решить будет гораздо сложнее. При нерешенном конфликте группа потеряет доверие, вовлеченность и эффективность.'] },
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
  const saveQuze = scormStore.getCustomData('quze2');

  if (saveParameters) {
    parameters.value = saveParameters;
  }

  if (saveQuze) {
    quzeStore.value = saveQuze;
  }
})
</script>
