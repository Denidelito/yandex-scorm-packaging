<script setup>
import {onMounted, ref} from "vue"
import Speech from "../components/Speech.vue";
import CardFlip from "../components/CardFlip.vue";

const dataSpeech = ref([
  'Рассмотрим три роли тренера.',
])

const dataCards = ref([
  {
    icon: 'icon-10-big',
    title: 'Лидер',
    text: 'Устанавливает стандарты и ожидания, определяет направления развития и цели обучения.',
    visible: false
  },
  {
    icon: 'icon-11-big',
    title: 'Равный',
    text: 'Занимая позицию равного, тренер становится одним из участников обучающего процесса.',
    visible: false
  },
  {
    icon: 'icon-12-big',
    title: 'Спасатель',
    text: 'Выступает как поддерживающий и защитный элемент в обучающем процессе.',
    visible: false
  },
]);

onMounted(() => {
  let timeout = 1000;

  for (let card of dataCards.value) {
    setTimeout(() => {
      card.visible = true
    }, timeout)

    timeout += 500
  }
})
</script>

<template>
  <div>
    <speech class="mt-25" :speech-data="dataSpeech" size="large"/>
    <p v-if="dataCards[0].visible" class="mt-25 text-info animate__animated animate__fadeIn ">Наведи на карточку чтобы узнать больше о роле тренера</p>
    <div class="row">
      <div  v-for="(card, index) in dataCards" :key="index">
        <card-flip class="animate__animated animate__fadeInUp" v-if="card.visible" :title="card.title" :text="card.text" :icon="card.icon"></card-flip>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .row {
    display: flex;
    gap: 70px;
  }
</style>