<script setup>
import { ref, onMounted } from "vue";
import { useScormStore } from "../store/scormStore.js";
import Speech from "../components/Speech.vue";

const dataSpeech = [
  'Отлично, рад знакомству! Теперь я бы хотел посмотреть тебя в деле. Давай вместе проведём тренинг.',
]
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
    <div class="background-img">
      <img width="1280" height="647" src="../assets/images/background/main.png" alt="Оффисное помещение">
    </div>
    <div class="character-all">
      <img width="705" height="437" src="../assets/images/character/all-character.png" alt="Люди на тренинге">
    </div>
    <div class="character">
      <img v-if="selectedCharacter !== 'girl'" width="705" height="423" src="../assets/images/character/character-man-2.png" alt="Выбраненый персонаж мужчина">
      <img v-else width="705" height="423" src="../assets/images/character/character-girl-2.png" alt="Выбранный персонаж девушка">
    </div>
    <speech class="mt-60" :speech-data="dataSpeech"/>
  </div>
</template>


<style scoped lang="scss">
.background-img {
  position: absolute;
  bottom: 0;
  left: 0;
}
.character {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;

  & > img {
    margin: auto;
  }

  &-all {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 0;

    & > img {
      margin: auto;
    }
  }
}
</style>