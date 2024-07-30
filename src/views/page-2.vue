<script setup>
import { ref, onMounted } from 'vue';
import Speech from "../components/Speech.vue";
import SvgIcon from "../components/SvgIcon.vue";

const dataSpeech = [
  'Это экран навигации. Тут ты можешь ознакомиться с элементами управления курса.',
];

// Создаем ссылки для каждого контейнера
const showDownload = ref({
  arrow: false,
  text: false
});
const showGlossary = ref({
  arrow: false,
  text: false
});
const showNav = ref({
  arrow: false,
  text: false
});
const showNavBottom = ref({
  arrow: false,
  text: false
});

// Функция для поочередного показа контейнеров
const showArrowsSequentially = () => {
  let startTimeout = 1000;

  const showTimeout = (elements) => {
    for (const key in elements.value) {
      setTimeout(() => {
        elements.value[key] = true;
      }, startTimeout);
      startTimeout += 500;
    }
  }

  showTimeout(showDownload);
  showTimeout(showGlossary);
  showTimeout(showNav);
  showTimeout(showNavBottom);

};

onMounted(() => {
  showArrowsSequentially();
});
</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech"/>
    <div v-if="showDownload.arrow" class="tutorial-container tutorial-container_download animate__animated animate__fadeInUp">
      <p v-if="showDownload.text" class="animate__animated animate__fadeIn">Все, что ты скачиваешь в курсе, хранится в «Дополнительных материалах».</p>
      <svg-icon width="22" height="147" name="arrow-tutorial-1"/>
    </div>
    <div v-if="showGlossary.arrow" class="tutorial-container tutorial-container_glossary animate__animated animate__fadeInUp">
      <p v-if="showGlossary.text" class="animate__animated animate__fadeIn">В курсе есть глоссарий. Заглядывай туда, когда увидишь незнакомые слова и аббревиатуры.</p>
      <svg-icon width="22" height="219" name="arrow-tutorial-2"/>
    </div>
    <div v-if="showNav.arrow" class="tutorial-container tutorial-container_nav animate__animated animate__fadeInUp">
      <p v-if="showNav.text" class="animate__animated animate__fadeIn">В содержании находится список всех тем курса.</p>
      <svg-icon width="22" height="268" name="arrow-tutorial-3"/>
    </div>
    <div v-if="showNavBottom.arrow" class="tutorial-container tutorial-container_nav-bottom animate__animated animate__fadeInDown">
      <p v-if="showNavBottom.text" class="animate__animated animate__fadeIn">Перемещайся по курсу с помощью кнопок «Продолжить» и «Назад». Кнопка «Продолжить» заблокирована, пока не открыты все элементы на слайде.</p>
      <svg-icon width="22" height="75" name="arrow-tutorial-4"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tutorial-container {
  max-width: 350px;
  display: flex;
  align-items: flex-end;
  position: absolute;

  & > p {
    text-align: right;
    font-style: italic;
    font-size: 1rem;
    margin-right: 5px;
    margin-bottom: 0;
  }
  & > svg {
    min-width: 22px;
  }

  &_download {
    top: 60px;
    right: 128px;
  }
  &_glossary {
    max-width: 445px;
    top: 60px;
    right: 85px;
  }
  &_nav {
    max-width: 445px;
    top: 60px;
    right: 45px;
  }
  &_nav-bottom {
    align-items: flex-start;
    max-width: 548px;
    bottom: 60px;
    right: 45px;
  }
}
</style>
