<script setup>
import PickOne from "../components/PickOne.vue";
import {useScormStore} from "../store/scormStore.js";
import {onMounted, ref} from "vue";
const scormStore = useScormStore();

const question = 'Ты — разработчик учебных программ в компании и ответственен за создание эффективной учебной программы для учеников. Твоей целевой аудиторией являются взрослые, которые учатся через собственный опыт. Какой подход использовать в качестве основы для обучающей программы?';
const button = {
  correct: 'Предлагать проблемы, а не готовые решения',
  incorrect: 'Готовые кейсы с ответами'
};
const answer = {
  correct: 'В андрагогике мы подталкиваем ученика к самостоятельности и размышлению, развиваем его лидерские качества. Взрослые ориентированы на получение тех знаний, которые помогут им решить текущие проблемы, они в большей степени ориентированы на практическое применение новых навыков. Если же предоставить готовые кейсы с ответами, то группа рискует стать максимально разобщённой и даже распасться, поскольку её участники не будут заинтересованы в обучении.',
  incorrect: 'В андрагогике мы подталкиваем ученика к самостоятельности и размышлению, развиваем его лидерские качества. Если мы предоставляем готовые кейсы с ответами, то условно возвращаем обучающегося в школу, где его задача была не развивать аналитическое мышление, а запоминать ту информацию, которую дают учителя. При таком подходе, группа рискует стать максимально разобщённой и даже распасться, поскольку её участники не будут заинтересованы в обучении.',
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
  const savePickOne = scormStore.getCustomData('picone4');

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
    <h2 class="mt-35">Принцип 4</h2>
    <p class="mt-25 text-info">Выберите правилльный ответ</p>
    <pick-one
        name="picone4"
        :question="question"
        :button="button"
        :answer="answer"
        :parameters="parameters"
        :piсkone-store="pickOneStore"/>
  </div>
</template>

<style scoped lang="scss">

</style>