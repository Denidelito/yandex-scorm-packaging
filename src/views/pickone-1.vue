<script setup>
import PickOne from "../components/PickOne.vue";
import {useScormStore} from "../store/scormStore.js";
import {onMounted, ref} from "vue";
const scormStore = useScormStore();

const question = 'Ты планируете обучающее мероприятие для вашей команды. Как вы будете подходить к планированию: включите самих участников в процесс, ориентируясь на их мнение о том, что им необходимо изучить для работы, или примете решение самостоятельно?';
const button = {
  correct: 'Включить самих участников',
  incorrect: 'Принять решение самостоятельно'
};
const answer = {
  correct: 'Вовлеченность положительно сказывается на групповой динамике, так как группа уже более-менее начинает ориентироваться в том, что предстоит пройти на обучении и какие могут быть ожидания со стороны тренера. Формирующая стадия пройдёт более гладко.',
  incorrect: 'В отличие от детей, взрослые способны осознавать их точки роста, поэтому, подключая их к процессу планирования, мы более точно определим запрос. Так же это будет большим плюсом для групповой динамики, ведь мы подходим к формирующей стадии группы, где будующие её участники уже формируют образ того, что им предстоит на обучении.',
  parameters: ['engagement']
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
  const savePickOne = scormStore.getCustomData('picone1');

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
    <h2 class="mt-35">Принцип 1</h2>
    <p class="mt-25 text-info">Выберите правилльный ответ</p>
    <pick-one
        name="picone1"
        :question="question"
        :button="button"
        :answer="answer"
        :parameters="parameters"
        :piсkone-store="pickOneStore"/>
  </div>
</template>

<style scoped lang="scss">

</style>