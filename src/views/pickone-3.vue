<script setup>
import PickOne from "../components/PickOne.vue";
import {useScormStore} from "../store/scormStore.js";
import {onMounted, ref} from "vue";
const scormStore = useScormStore();

const question = 'Ты — разработчик учебных программ в компании и ответственен за создание эффективной учебной программы для учеников. Твоей целевой аудиторией являются взрослые, которые учатся через собственный опыт. Какой подход использовать в качестве основы для обучающей программы?';
const button = {
  correct: 'Использование практических знаний и навыков обучающихся',
  incorrect: 'Теоретическая часть'
};
const answer = {
  correct: 'Принцип основан на активных методах обучения, стимулирующих творческую работу обучающихся. заключается и в диалоге каждого участника  с тренером, направленная на взаимную передачу информаций и знаний. К тому же, такой подход помогает группе быстрее совершить переход из нормирующей стадии к стадии функционирования.',
  incorrect: 'Если материал обучения оторван от реальности (не включает себя жизненный опыт, текущие знания и навыки учеников), то он так и остаётся теорией, которая снижает интерес, вовлеченность учеников. Так, группа рискует оказаться в зоне конфликта, где её участники будут «выпадать» и/или саботировать  процесс обучения.',
  parameters: ['understanding']
};

const parameters = ref({
  interest: 0,
  engagement: 0,
  understanding: 0
});
const pickOneStore = ref({
  complete: false,
  selected: null,
  feedbackVisible: false
})

onMounted(() => {
  const saveParameters = scormStore.getCustomData('quzeParameters');
  const savePickOne = scormStore.getCustomData('picone3');

  if (saveParameters) {
    parameters.value = saveParameters;
  }

  if (savePickOne) {
    pickOneStore.value = savePickOne;
  }
})
</script>

<template>
  <div>
    <h2 class="mt-35">Принцип 3</h2>
    <p class="mt-25 text-info">Выберите правилльный ответ</p>
    <pick-one
        name="picone3"
        :question="question"
        :button="button"
        :answer="answer"
        :parameters="parameters"
        :piсkone-store="pickOneStore"/>
  </div>
</template>

<style scoped lang="scss">

</style>