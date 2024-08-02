<script setup>
import { ref, onMounted } from "vue";
import { useScormStore } from "../store/scormStore.js";
import Speech from "../components/Speech.vue";
import Card from "../components/Card.vue";


const scormStore = useScormStore();
const selectedCharacter = ref('girl');
const infoVisible = ref(false);
const dataCards = ref([
  {
    icon: 'icon-29',
    title: 'Неудобные стулья и условия площадки',
    visible: false
  },
  {
    icon: 'icon-30',
    title: 'Неудобные  обучающие материалы',
    visible: false
  },
  {
    icon: 'icon-31',
    title: 'Организация обучения',
    visible: false
  },
]);

onMounted(() => {
  const savedCharacter = scormStore.getCustomData('selectedCharacter');
  if (savedCharacter) {
    selectedCharacter.value = savedCharacter;
  }

  let timeOut = 1000;

  for (let card of dataCards.value) {
    setTimeout(() => {
      card.visible = true;
    }, timeOut);

    timeOut += 500;
  }

  setTimeout(() => infoVisible.value = true, timeOut)
});
</script>

<template>
  <div>
    <h2 class="mt-35">Внешние факторы</h2>
    <card
        animate-class="animate__fadeInRight"
        class="mt-25"
        icon-position="left"
        text="Внешние факторы —  это внешние условия и обстоятельства, которые могут оказывать отрицательное влияние на взаимоотношения, коммуникацию и общий комфорт участников. "
    />
    <div class="row mt-10">
      <div style="width: 33%" v-for="(card, index) in dataCards" :key="index">
        <card
            v-if="card.visible"
            :icon="card.icon"
            :title="card.title"
            :text="card.text"
        />
      </div>
    </div>
    <card v-if="infoVisible"
        animate-class="animate__fadeInLeft"
        class="mt-10"
        icon-position="left"
        icon-info="true"
        title="Совет"
        text="Важно поддерживать открытые отношения с участниками группы, чтобы предотвратить конфликты и недопонимания, связанные с внешними факторами напряженности. Регулярно проверяйте уровень понимания материала и комфорт участников для оперативной реакции на проблемы."
    />
  </div>
</template>

<style scoped lang="scss">
  .row {
    gap: 37px;
  }
</style>