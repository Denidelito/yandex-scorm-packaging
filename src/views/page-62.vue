<script setup>
import { ref, onMounted } from "vue";
import Speech from "../components/Speech.vue";
import Card from "../components/Card.vue";

const dataSpeech = ref([
  `<p>Важно соблюдать баланс игр и упражнений, так, чтобы:</p>
  <ol>
  <li>Правильно выполняли поставленные задачи и ожидаемые результаты.</li>
  <li>Не перегружали и не сильно расслабляли группу.</li>
  </ol>
  `,
    'Если баланс будет нарушен – поставленные цели не будут достигнуты и групповая динамика резко снизится и может привести к недовольству полученным результатом по итогу обучения.\n'
])



</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech" size="large"/>
  </div>
</template>

<style scoped lang="scss">

</style>