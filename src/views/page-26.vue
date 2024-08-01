<script setup>
import Speech from "../components/Speech.vue";
import Card from "../components/Card.vue";
import {onMounted, ref} from "vue";

const dataSpeech = [
  'Запомни четыре основных правила андрагогики. Впереди тебя ждет проверочное задание, которое поможет закрепить пройденный материал.'
]

const cardData = ref( [
  {
    icon: 'icon-6',
    text: 'Учитывай интересы и потребности',
    visible: false
  },
  {
    icon: 'icon-7',
    text: 'Апеллируй к жизненному опыту',
    visible: false
  },
  {
    icon: 'icon-8',
    text: 'Обучай через практику',
    visible: false
  },
  {
    icon: 'icon-9',
    text: 'Побуждай к самостоятельности и лидерству',
    visible: false
  },
])


const animationCard = function() {
  let interval = 1000;

  for (let card of cardData.value) {
    setTimeout(() => {
      card.visible = true;

    }, interval)

    interval += 500;
  }
}

onMounted(() => {
  animationCard();
})

</script>

<template>
  <div>
    <h2 class="mt-35">Основные принципы андрагогики</h2>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
    <div class="row mt-25">
      <div v-for="(card, index) in cardData" :key="index">
        <card v-if="card.visible" :text="card.text" :icon="card.icon" width="288px"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .row {
    gap: 15px;
  }
</style>


