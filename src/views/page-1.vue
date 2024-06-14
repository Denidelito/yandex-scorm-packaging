<script setup>
import Speech from "../components/Speech.vue";
import SvgIcon from "../components/SvgIcon.vue";

const dataSpeech = [
    'Это экран навигации. Тут ты можешь ознакомиться с элементами управления курса.',
]
</script>

<template>
  <div>
    <speech class="mt-60" :speech-data="dataSpeech"/>
    <div class="tutorial-container tutorial-container_download">
      <p>Все, что ты скачиваешь в курсе, хранится в «Дополнительных материалах».</p>
      <svg-icon width="22" height="147" name="arrow-tutorial-1"/>
    </div>
    <div class="tutorial-container tutorial-container_glossary">
      <p>В курсе есть глоссарий. Заглядывай туда, когда увидишь незнакомые слова и аббревиатуры.</p>
      <svg-icon width="22" height="219" name="arrow-tutorial-2"/>
    </div>
    <div class="tutorial-container tutorial-container_nav">
      <p>В содержании находится список всех тем курса.</p>
      <svg-icon width="22" height="268" name="arrow-tutorial-3"/>
    </div>
    <div class="tutorial-container tutorial-container_nav-bottom">
      <p>Перемещайся по курсу с помощью кнопок «Продолжить» и «Назад». Кнопка «Продолжить» заблокирована, пока не открыты все элементы на слайде.</p>
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