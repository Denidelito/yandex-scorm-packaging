<script setup>
import { ref, onMounted } from "vue";
import { useScormStore } from "../store/scormStore.js";
import Card from "../components/Card.vue";

const cardData = ref([
  {
    text: "У каждого участника есть своя роль, поведение структурировано, больше правил.",
    title: "Иерархическая группа",
    animateClass: 'animate__fadeInRight',
    icon: "icon-13",
    position: "left",
    visible: false
  },
  {
    text: "У каждого участника есть своя роль, поведение структурировано, больше правил.",
    title: "Демократическая группа",
    animateClass: 'animate__fadeInRight',
    icon: "icon-14",
    position: "left",
    visible: false
  },
  {
    text: "Структура группы может меняться в ходе обучения и внедряться через инструктаж или упражнения. Если нужно больше конкретных правил и ранговое деление, то это иерархическая группа. Если нужно равенство, свобода и фантазия, то это демократическая группа.",
    animateClass: 'animate__fadeInRight',
    position: "left",
    visible: false
  },
])

const scormStore = useScormStore();
const selectedCharacter = ref('girl');

onMounted(() => {
  const savedCharacter = scormStore.getCustomData('selectedCharacter');
  if (savedCharacter) {
    selectedCharacter.value = savedCharacter;
  }

  let timeOut = 0;

  for (let card of cardData.value) {
    setTimeout(() => {
      card.visible = true
    }, timeOut)

    timeOut += 100
  }
});
</script>

<template>
  <div>
    <div style="width: 818px" v-for="(card, index) in cardData" :key="index">
      <card class="mt-35"
        v-if="card.visible"
        :text="card.text"
        :title="card.title"
        :icon="card.icon"
        :animate-class="card.animateClass"
        :icon-position="card.position"/>
    </div>
    <div class="slide__player">
      <img v-if="selectedCharacter !== 'girl' " width="497" height="468" src="../assets/images/character/character-man-4.png" alt="Влад">
      <img v-else width="497" height="468" src="../assets/images/character/character-girl-4.png" alt="Ника">
    </div>
    <div class="slide__bg">
      <img width="1280" height="700" src="../assets/images/background/speech.png" alt="Фон слайда с оффисом Яндекс">
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>