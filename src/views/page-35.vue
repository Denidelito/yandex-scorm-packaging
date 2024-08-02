<script setup>
import {onMounted, ref} from "vue"
import Speech from "../components/Speech.vue";
import CardFlip from "../components/CardFlip.vue";

const dataSpeech = ref([
  'Баланс между этими ролями позволяет тебе вести группу, поддерживать интерес и достигать поставленных целей.',
  'Важно понимать не только роли тренера, но и участников группы. В процессе тренинга каждый участник может принимать различные роли. Рассмотрим роли в группе и их значимость в следующем разделе.',
  '«Рассмотрим роли в группе и их влияние на групповую динамику»',
])

</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped>
  .row {
    display: flex;
    gap: 70px;
  }
</style>