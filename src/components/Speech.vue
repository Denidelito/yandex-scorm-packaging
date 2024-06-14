<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  speechData: {
    type: Array,
    default: ['Введите текст']
  }
})
</script>

<template>
   <div class="speech">
     <div class="speech__character">
       <img width="137" height="137" src="../assets/images/character/character-ivan-speech.png" alt="Эллюстрация персонажа по имени Иван">
     </div>
     <div class="speech__content">
        <div class="speech__dialog-modal" v-for="speech in props.speechData">
          {{ speech }}
        </div>
     </div>
   </div>
</template>

<style scoped lang="scss">
.speech {
  display: flex;
  &__character {
    line-height: 0;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
  }
  &__dialog-modal {
    width: 100%;
    max-width: 612px;
    margin-left: 20px;
    border-radius: 0 32px 32px 24px;
    padding: 20px 20px 20px 40px;
    background-color: #D5D9DB;
    color: #2F414C;
  }
}
</style>