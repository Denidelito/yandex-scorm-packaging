<script setup>
import { ref, defineProps, onMounted } from 'vue';

const props = defineProps({
  speechData: {
    type: Array,
    default: ['Введите текст']
  }
})

const visibleDialogs = ref([])

onMounted(() => {
  let delay = 0;

  for (let speech of props.speechData) {
    setTimeout(() => {
      visibleDialogs.value.push(speech)
    }, delay);
    delay += 1000;
  }
})
</script>

<template>
   <div class="speech">
     <div class="speech__character">
       <img width="137" height="137" src="../assets/images/character/character-ivan-speech.png" alt="Эллюстрация персонажа по имени Иван">
     </div>
     <div class="speech__content">
        <transition
            appear
            mode="out-in"
            appear-active-class="animate__animated animate__fadeInUp" v-for="speech in visibleDialogs">
          <div class="speech__dialog-modal" >
            {{ speech }}
          </div>
        </transition>
     </div>
   </div>
</template>

<style scoped lang="scss">
.speech {
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 2;

  &__character {
    line-height: 0;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
  }
  &__dialog-modal {
    width: 100%;
    max-width: 500px;
    margin-left: 20px;
    border-radius: 0 32px 32px 24px;
    padding: 20px 20px 20px 40px;
    background-color: #D5D9DB;
    color: #2F414C;
    margin-bottom: 20px;
    font-size: 1.2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>