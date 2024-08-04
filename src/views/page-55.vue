<script setup>
import {ref, onMounted} from "vue";
import {useScormStore} from "../store/scormStore.js";
import Speech from "../components/Speech.vue";
import Card from "../components/Card.vue";


const scormStore = useScormStore();
const selectedCharacter = ref('girl');
const infoVisible = ref(false);
const dataCards = ref([
  {
    icon: 'icon-31',
    title: 'Непонимание тренера',
    visible: false
  },
  {
    icon: 'icon-32',
    title: 'Раздражение от поведения участников',
    visible: false
  },
  {
    icon: 'icon-33',
    title: 'Неудовлетворение запроса участников',
    visible: false
  },
]);

onMounted(() => {
  const savedCharacter = scormStore.getCustomData('selectedCharacter');
  if (savedCharacter) {
    selectedCharacter.value = savedCharacter;
  }

  let timeOut = 1000;

  for (let card of dataCards.value) {
    setTimeout(() => {
      card.visible = true;
    }, timeOut);

    timeOut += 500;
  }
});
</script>

<template>
  <div>
    <h2 class="mt-35">Внутренние факторы</h2>
    <card
        animate-class="animate__fadeInRight"
        class="mt-25"
        icon-position="left"
        text="Внутренние факторы — это личные характеристики, мотивации и эмоциональные состояния участников, которые оказывают влияние на их взаимодействие, обучение и восприятие информации в рамках тренинга."
    />
    <div class="row mt-10">
      <div style="width: 33%" v-for="(card, index) in dataCards" :key="index">
        <card
            v-if="card.visible"
            :icon="card.icon"
            :title="card.title"
            :text="card.text"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  gap: 37px;
}
</style>