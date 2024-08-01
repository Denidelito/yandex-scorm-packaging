<script setup>
import {onMounted, ref} from "vue"
import Speech from "../components/Speech.vue";
import CardFlip from "../components/CardFlip.vue";

const dataSpeech = ref([
  '<b>Роль лидера</b>: используется тогда, когда требуется четко установить стандарты, направления развития и цели обучения. ',
  'Лидерство подходит для ситуаций, когда необходимо вдохновить и направить группу к достижению общих и личных целей.',
  'Такая роль идеально подходит на формирующей стадии группы.',
])

</script>

<template>
  <div>
    <speech class="mt-25" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped>
  .row {
    display: flex;
    gap: 70px;
  }
</style>