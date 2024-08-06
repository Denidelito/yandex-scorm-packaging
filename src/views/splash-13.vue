<script setup>
import { ref, onMounted } from "vue";
import { useScormStore } from "../store/scormStore.js";

const scormStore = useScormStore();
const selectedCharacter = ref('girl');

onMounted(() => {
  const nameSlide = '/splash-13';
  const savedCharacter = scormStore.getCustomData('selectedCharacter');
  let savedNavData = scormStore.getCustomData('navDataStore');
  let dataVisited = [...savedNavData.visited];

  savedNavData.visited.push(nameSlide)
  if (savedCharacter) {
    selectedCharacter.value = savedCharacter;
  }

  if (!dataVisited.find((item) => item === nameSlide)) {
    dataVisited.push(nameSlide)
  }

  scormStore.setCustomData('navDataStore', {
    slide: nameSlide,
    visited: dataVisited
  });
});
</script>

<template>
  <div class="splash">
    <div class="splash__container">
      <img width="249" height="44" src="../assets/logo-big.svg" alt="Логотип Яндекс Еды">
      <h1>Инструменты</h1>
    </div>
    <div class="splash__character">
      <img v-if="selectedCharacter !== 'girl' " width="680" height="521" src="../assets/images/character/character-man-3.png" alt="Влад">
      <img v-else width="680" height="521" src="../assets/images/character/character-girl-3.png" alt="Ника">
    </div>
    <div class="splash__background">
      <img width="1280" height="647" src="../assets/images/background/main.png" alt="Офисное помещение Яндекса">
    </div>
  </div>
</template>

<style scoped lang="scss">
.splash {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 -40px;

  &__background {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &__character {
    line-height: 0;
    position: absolute;
    z-index: 1;
    right: 72px;
    bottom: 0;
  }

  &__container {
    position: relative;
    z-index: 1;
    width: 676px;
    padding: 36px 48px;
    border-radius: 0 16px 16px 0;
    background-color: white;

    & > img {
      margin-bottom: 24px;
    }

  }
}
</style>