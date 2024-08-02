<script setup>
import {onMounted, ref} from "vue"
import Speech from "../components/Speech.vue";

const dataSpeech = ref([
  'Теперь ты знаешь роли участников группы. Балансируя между разными ролями, ты может эффективно вести группу и поддерживать динамику тренинга.',
  'Закрепи знания и будем двигаться к следующему разделу.',
])

</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped>
</style>