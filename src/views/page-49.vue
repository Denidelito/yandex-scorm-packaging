<script setup>
import { ref, onMounted } from "vue";
import { useScormStore } from "../store/scormStore.js";
import Speech from "../components/Speech.vue";

const dataSpeech = ref([
  'Мы разобрали структуру группы, давайте перейдем к обсуждению факторов, которые помогают сплотить участников. Рассмотрим, как совместная деятельность, психологическая безопасность и единые цели могут укрепить группу и повысить эффективность обучения.',
])

const scormStore = useScormStore();
const selectedCharacter = ref('girl');

onMounted(() => {
  const savedCharacter = scormStore.getCustomData('selectedCharacter');
  if (savedCharacter) {
    selectedCharacter.value = savedCharacter;
  }
});
</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
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