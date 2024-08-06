<script setup>
import svgIcon from "./SvgIcon.vue";
import { ref, onMounted, computed } from 'vue';
import { useScormStore } from "../store/scormStore.js";
import { defineProps } from 'vue';
import QuzeProgress from "./quze/quzeProgress.vue";

const scormStore = useScormStore();

const props = defineProps({
  question: {
    type: String,
    default: 'Вопрос'
  },
  button: {
    type: Object,
    default: () => ({
      correct: 'Кнопка правильного ответа',
      incorrect: 'Кнопка неправильного ответа',
    })
  },
  answer: {
    type: Object,
    default: () => ({
      correct: 'Правильный ответ',
      incorrect: 'Неправильный ответ'
    })
  },
  parameters: {
    type: Object,
    required: true,
    default: () => ({
      engagement: 0,
      interest: 0,
      understanding: 0
    })
  },
  name: {
    type: String,
    required: true
  },
  piсkoneStore: {
    type: Object,
    default: {
      complete: false,
      feedbackVisible: false,
      selected: null,
    }
  }
});

const buttons = ref([]);

let parameters = computed(() => props.parameters)
let animateIncrementInterest = ref(false);
let animateIncrementEngagement = ref(false);
let animateIncrementUnderstanding = ref(false);
let complete = computed({
  get: () => props.piсkoneStore.complete,
  set: (value) =>  props.piсkoneStore.complete = value
});
let feedbackVisible = computed({
  get: () => props.piсkoneStore.feedbackVisible,
  set: (value) => props.piсkoneStore.feedbackVisible = value
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

let selectedAnswer = computed({
  get: () => props.piсkoneStore.selected,
  set: (value) => props.piсkoneStore.selected = value
});

onMounted(() => {
  buttons.value = [
    { value: 'correct', text: props.button.correct },
    { value: 'incorrect', text: props.button.incorrect }
  ];
  shuffleArray(buttons.value);

  if (complete.value) {
    selectedAnswer.value = 'correct';
  } else if (!complete.value && feedbackVisible.value) {
    selectedAnswer.value = 'incorrect';
  }
});


const saveScormData = () => {
  scormStore.setCustomData(props.name, {
    complete: complete.value,
    feedbackVisible: feedbackVisible.value,
    selected: selectedAnswer.value,
  });
  scormStore.setCustomData('quzeParameters', parameters.value);
}

const handleChange = (value) => {
  selectedAnswer.value = value;

  if (selectedAnswer.value === 'correct') {
    for (let param of props.answer.parameters) {
      parameters.value[param] += 1;
    }
    feedbackVisible.value = true
    complete.value = true;
  } else if (selectedAnswer.value === 'incorrect' && feedbackVisible.value) {
    for (let param of props.answer.parameters) {
      parameters.value[param] -= 1;
    }

    complete.value = false;
  }

  saveScormData();
};

const buttonClass = (value) => {
  return ['pick-one__button', value === selectedAnswer.value ?
      (value === 'correct' ? 'pick-one__button_correct' : 'pick-one__button_incorrect') : ''];
};
</script>

<template>
  <div class="pick-one__container">
    <div class="pick-one__left">
      <div class="pick-one__question">
        <div class="pick-one__icon">
          ?
        </div>
        <p>{{ question }}</p>
      </div>
      <form class="pick-one__buttons">
        <div class="pick-one__checked-icon">
          <svg-icon class="animate__animated animate__bounceIn" v-if="selectedAnswer === 'correct'" name="check" width="50" height="50"></svg-icon>
          <svg-icon class="animate__animated animate__bounceIn" v-if="selectedAnswer === 'incorrect'" name="uncheck" width="50" height="50"></svg-icon>
        </div>
        <label v-for="button in buttons" :key="button.value" :class="buttonClass(button.value)">
          <input type="radio" :value="button.value" v-model="selectedAnswer" @change="handleChange(button.value)">
          {{ button.text }}
        </label>
      </form>
      <div class="pick-one__answer animate__animated animate__slideInLeft" v-if="selectedAnswer === 'correct'">{{props.answer.correct}}</div>
      <div class="pick-one__answer animate__animated animate__slideInLeft" v-else-if="selectedAnswer === 'incorrect'">{{props.answer.incorrect}}</div>
      <div class="pick-one__background">
        <div class="pick-one__background__item pick-one__background__item_big">?</div>
        <div class="pick-one__background__item pick-one__background__item_big">?</div>
        <div class="pick-one__background__item pick-one__background__item_big">?</div>
        <div class="pick-one__background__item pick-one__background__item_big">?</div>
        <div class="pick-one__background__item pick-one__background__item_medium">?</div>
        <div class="pick-one__background__item pick-one__background__item_medium">?</div>
        <div class="pick-one__background__item pick-one__background__item_medium">?</div>
        <div class="pick-one__background__item pick-one__background__item_medium">?</div>
        <div class="pick-one__background__item pick-one__background__item_smail">?</div>
        <div class="pick-one__background__item pick-one__background__item_smail">?</div>
        <div class="pick-one__background__item pick-one__background__item_smail">?</div>
        <div class="pick-one__background__item pick-one__background__item_smail">?</div>
      </div>
    </div>
    <quze-progress  :interest="parameters.interest"
                   :engagement="parameters.engagement"
                   :understanding="parameters.understanding"
                   :interestVisible="animateIncrementInterest"
                   :engagementVisible="animateIncrementEngagement"
                   :understandingVisible="animateIncrementUnderstanding"
    />
  </div>
</template>

<style scoped lang="scss">
  .pick-one {
    &__container {
      display: flex;
      justify-content: space-between;
    }

    &__left {
      width: 60%;
    }

    &__right {
      width: 40%;
    }

    &__checked-icon {
      width: 74px;
    }
    &__icon {
      display: flex;
      align-items: center;
      padding: 25px;
      background-color: #FFC433;
      font-size: 52px;
      font-weight: bold;
    }
    &__question {
      overflow: hidden;
      display: flex;
      font-size: 16px;
      border-radius: 32px;
      background-color: white;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
      position: relative;
      z-index: 2;

      & > p {
        padding: 18px 21px;
      }
    }
    &__buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      padding: 25px 0;
      position: relative;
      z-index: 2;
    }
    &__background {
      &__item {
        font-weight: bold;
        &_big {
          position: absolute;
          font-size: 58px;
          color: rgba(255, 196, 51, 0.2);
          &:nth-child(1) {
            top: 455px;
            left: 1000px;
            transform: rotate(10deg);
          }
          &:nth-child(2) {
            top: 420px;
            left: 875px;
            transform: rotate(-20deg);
          }
          &:nth-child(3) {
            top: 400px;
            left: 1120px;
            transform: rotate(50deg);
          }
          &:nth-child(4) {
            top: 300px;
            left: 890px;
            transform: rotate(30deg);
          }
        }
        &_medium {
          position: absolute;
          font-size: 38px;
          color: rgba(#2F414C, 0.2);
          &:nth-child(5) {
            font-size: 58px;
            top: 500px;
            left: 750px;
            transform: rotate(-80deg);
          }
          &:nth-child(6) {
            top: 540px;
            left: 875px;
            transform: rotate(20deg);
          }
          &:nth-child(7) {
            top: 365px;
            left: 795px;
            transform: rotate(-20deg);
          }
          &:nth-child(8) {
            top: 483px;
            left: 1200px;
            transform: rotate(-20deg);
          }
        }
        &_smail {
          position: absolute;
          font-size: 28px;
          color: rgba(#2F414C, 0.2);
          &:nth-child(9) {
            font-size: 24px;
            top: 510px;
            left: 850px;
            transform: rotate(75deg);
          }
          &:nth-child(10) {
            top: 465px;
            left: 960px;
            transform: rotate(70deg);
          }
          &:nth-child(11) {
            top: 500px;
            left: 1100px;
            transform: rotate(105deg);
          }
          &:nth-child(12) {
            top: 390px;
            left: 1200px;
            transform: rotate(65deg);
          }
          &:nth-child(13) {
            top: 300px;
            left: 1150px;
            transform: rotate(65deg);
          }
        }
      }
    }
    &__button {
      width: 100%;
      padding: 16px 24px;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
      background-color: white;
      border-radius: 16px;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      transition: .3s;

      &_correct {
        color: white;
        background-color: #249336;
      }
      &_incorrect {
        color: white;
        background-color: #DB2C32;
      }

      &:hover {
        background-color: var(--btn-color-bg-hover);
        color: var(--btn-color-hover);
      }

      & > input {
        display: none;
      }
    }
    &__answer {
      font-size: 16px;
      padding: 16px 24px;
      background-color: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
      position: relative;
      z-index: 2;
    }
  }
</style>