<script setup>
import { ref, onMounted } from "vue";
import { useScormStore } from "../store/scormStore.js";
import Speech from "../components/Speech.vue";
import Card from "../components/Card.vue";

const dataSpeech = ref([
  'Мы разобрали структуру группы, давайте перейдем к обсуждению факторов, которые помогают сплотить участников. Рассмотрим, как совместная деятельность, психологическая безопасность и единые цели могут укрепить группу и повысить эффективность обучения.',
])

const scormStore = useScormStore();
const selectedCharacter = ref('girl');
const dataCards = [
  {
    icon: 'icon-17',
    title: 'Групповые проекты',
    text: 'Участники выполняют задания, требующие коллективных усилий, например, разработка презентации или решение бизнес-кейса.',
    visible: false
  },
  {
    icon: 'icon-18',
    title: 'Ролевые игры',
    text: 'Имитация реальных ситуаций, где участники должны действовать по своим ролям для достижения цели и получения практического навыка.',
    visible: false
  },
  {
    icon: 'icon-19',
    title: 'Мозговые штурмы',
    text: 'Совместное генерирование идей для решения определенных проблем или задач.',
    visible: false
  },
];

onMounted(() => {
  const savedCharacter = scormStore.getCustomData('selectedCharacter');
  if (savedCharacter) {
    selectedCharacter.value = savedCharacter;
  }

  let timeOut = 1000;
  setTimeout(() => {

  }, timeOut)
});
</script>

<template>
  <div>
    <h2 class="mt-35">Совместная деятельность</h2>
    <card
        class="mt-25"
        icon-position="left"
        text="Участники выполняют задания, требующие коллективных усилий, например, разработка презентации или решение бизнес-кейса."
    />
    <div class="row mt-25">
      <div v-for="(card, index) in dataCards" :key="index">
        <card
            :icon="card.icon"
            :title="card.title"
            :text="card.text"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .row {
    gap: 37px;
  }
</style>