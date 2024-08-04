<script setup>
import Card from "../components/Card.vue";
import Slider from "../components/Slider.vue";
import {ref} from "vue";

const dataSlides = [
  {
    img: 'icon-34',
    title: 'Преимущества игр:',
    content: [
        `<ul>
            <li>Создание благоприятной психологической атмосферы в группе.</li>
            <li>Развитие доверия и поддержки среди участников.</li>
            <li>Обучение совместному решению задач, повышая командную сплоченность.</li>
            <li>Стимулирование творческого мышления и адаптации к новым ситуациям.</li>
        </ul>`
    ],
  },
  {
    img: 'icon-35',
    title: 'Примеры игр:',
    content: [
      `<ul>
            <li>Ледоколы – для разогрева и знакомства.</li>
            <li>Ролевые игры – для отработки навыков и анализа поведения.</li>
            <li>Командные задачи – для развития сотрудничества и координации действий.</li>
            <li>Решение проблем – для тренировки аналитического мышления и коллективного поиска решений.</li>
        </ul>`
    ],
  },
  {
    img: 'icon-36',
    title: 'Советы по проведению игр:',
    content: [
      `<ul>
            <li>Выбирай игры, которые соответствуют целям тренинга и уровню участников.</li>
            <li>Объясняй правила чётко и ясно.</li>
            <li>Поощряй участие всех членов группы.</li>
            <li>Обеспечивай обратную связь после каждой игры.</li>
        </ul>`
    ],
  },
]
let sliderVisible = ref(false);

setTimeout(() => sliderVisible.value = true, 1000)
</script>

<template>
  <div>
    <h2 class="mt-35 mb-10">Игры</h2>
    <card class="slide-game__card mt-25" text="Игра — это символическая деятельность, решающая конкретные индивидуальные или групповые задачи тренинга, объединённые метафорой." icon-position="left" />
    <p v-if="sliderVisible" class="animate__animated animate__fadeIn mt-25 text-info">Нажимай на стрелки, чтобы перейти к следующему или предыдущему совету.</p>
    <slider v-if="sliderVisible" class="animate__animated animate__fadeInRight" :slides-data="dataSlides"/>
  </div>
</template>

<style scoped lang="scss">
.slide-game__card {
  .card__text {
    margin-top: 0;
  }
}
</style>