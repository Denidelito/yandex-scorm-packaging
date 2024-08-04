<script setup>
import { ref, computed, onMounted } from 'vue';
import Speech from '../Speech.vue';
import { useScormStore } from '../../store/scormStore.js';
const scormStore = useScormStore();

// Сохраненные Входные параметры
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: true
  },
  resultMessage: {
    type: Array,
    required: false
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
  store: {
    type: Object,
    required: true,
    default: () => ({
      questionIndex: 0,
      selectedAnswer: null,
      feedbackVisible: false,
      answers: []
    })
  }
});

// Переменные
let currentQuestionIndex = computed({
  get: () => props.store.questionIndex,
  set: (value) => {
    props.store.questionIndex = value;
  }
});
let selectedAnswer = computed({
  get: () => props.store.selectedAnswer,
  set: (value) => {
    props.store.selectedAnswer = value;
  }
});
let feedbackVisible = computed({
  get: () => props.store.feedbackVisible,
  set: (value) => {
    props.store.feedbackVisible = value;
  }
});
let answersSaved = computed({
  get: () => props.store.answers,
  set: (value) => {
    props.store.answers = value;
  }
});
let parameters = computed(() => props.parameters)

// Вычисляемые свойства.

const currentQuestion = computed(() => props.questions[currentQuestionIndex.value]);

// Цвета шкал прогресса
const switchColor = (param) => {
  // console.log(24, 33, 35)

  if (param >= 80) {
    return 'green';
  } else if (param >= 50) {
    return 'yellow';
  } else {
    return 'red';
  }
};

const colorProgressInterest = computed(() => {
  return switchColor(parameters.value.interest / 24 * 100);
});
const colorProgressEngagement = computed(() => {
  return switchColor(parameters.value.engagement / 33 * 100);
});
const colorProgressUnderstanding = computed(() => {
  return switchColor(parameters.value.interest / 35 * 100);
});
let animateIncrementInterest = ref(false);
let animateIncrementEngagement = ref(false);
let animateIncrementUnderstanding = ref(false);

// Обратная связь
const feedback = computed(() => {
  const selected = selectedAnswer.value;

  return [...selected.feedback]
});

// Методы
const acceptAnswer = () => {
  const selected = selectedAnswer.value;

  for (let param of selected.parameter) {
    parameters.value[param] += 1;

    if (param === 'engagement') {
      animateIncrementEngagement.value = true;
    }
    if (param === 'interest') {
      animateIncrementInterest.value = true;
    }
    if (param === 'understanding') {
      animateIncrementUnderstanding.value = true;
    }

  }

  setTimeout(() => {
    animateIncrementInterest.value = false;
    animateIncrementEngagement.value = false;
    animateIncrementUnderstanding.value = false;
  }, 1500)

  feedbackVisible.value = true;

  answersSaved.value.push(selected);

  scormStore.setCustomData('quzeParameters', parameters.value);
  scormStore.setCustomData(props.name, {
    questionIndex: currentQuestionIndex.value,
    selectedAnswer: selectedAnswer.value,
    feedbackVisible: feedbackVisible.value,
    answers: answersSaved.value
  });
};
const nextQuestion = () => {
  selectedAnswer.value = null;
  feedbackVisible.value = false;
  currentQuestionIndex.value += 1;
};
const restartQuestion = () => {
  for (let item of answersSaved.value) {
    for (let param of item.parameter) {
      parameters.value[param] -= 1;
    }
  }

  selectedAnswer.value = null;
  feedbackVisible.value = false;
  currentQuestionIndex.value = 0;
  answersSaved.value = [];

  scormStore.setCustomData('quzeParameters', parameters.value);
  scormStore.setCustomData(props.name, {
    questionIndex: currentQuestionIndex.value,
    selectedAnswer: selectedAnswer.value,
    feedbackVisible: feedbackVisible.value,
    answers: answersSaved.value
  })
}
</script>

<template>
  <div class="quze">
    <div class="quze__content-left">
      <!--      Тестирование-->
      <div v-if="!feedbackVisible">
        <div class="quze__question">
          <div class="quze__question__icon">
            ?
          </div>
          <div class="quze__question__container">
            <p class="quze__text quze__text-medium">{{ currentQuestion.question }}</p>
            <p class="quze__text quze__text-small">Выбери один вариант.</p>
          </div>
        </div>
        <div class="quze__answer-container">
          <div class="quze__answer" v-for="(answer, index) in currentQuestion.Answer" :key="name+index">
            <input
                type="radio"
                :id="`answer-${name+index}`"
                :value="answer"
                v-model="selectedAnswer"
            />
            <label :for="`answer-${name+index}`">
              {{ answer.text }}
            </label>
          </div>
        </div>
        <button class="quze__btn"
                @click="acceptAnswer"
                :disabled="!selectedAnswer"
        >
          Ответить
        </button>
      </div>

      <!--      Обратная связь-->
      <div v-else>
        <speech :speech-data="feedback"/>
        <div class="quze__nav">
          <button class="quze__btn"
                  @click="nextQuestion"
                  v-if="currentQuestionIndex + 1 !== questions.length"
          >
            Продолжить
          </button>
          <button class="quze__btn"
                  @click="restartQuestion"
                  v-if="currentQuestionIndex + 1 === questions.length"
          >
            Поменять ответы
          </button>
        </div>
      </div>
    </div>
    <!--    Шкалы прогресса-->
    <div class="quze__content-right">
      <div class="quze__progress-title">
        Динамика группы
      </div>
      <div class="quze__progress-container">
        <div class="quze__progress-item">
          <div class="quze__progress">
            <div :style="{bottom: `${parameters.interest / 24 * 100 + 10}px`}"
                 :class="['numbers-container', animateIncrementInterest ? 'show' : 'hide']">
              <span class="number">+ 1</span>
              <span class="number">+ 1</span>
              <span class="number">+ 1</span>
            </div>
            <div :class="['quze__progress-line', colorProgressInterest]"
                 :style="{height: `${parameters.interest / 24 * 100}%`}"></div>
          </div>
          <p>Доверие</p>
        </div>
        <div class="quze__progress-item">
          <div class="quze__progress">
            <div :style="{bottom: `${parameters.engagement / 33 * 100 + 10}px`}" :class="['numbers-container', animateIncrementEngagement ? 'show' : 'hide']">
              <span class="number">+ 1</span>
              <span class="number">+ 1</span>
              <span class="number">+ 1</span>
            </div>
            <div :class="['quze__progress-line', colorProgressEngagement]"
                :style="{height: `${parameters.engagement / 33 * 100}%`}"></div>
          </div>
          <p>Вовлеченность</p>
        </div>
        <div class="quze__progress-item">
          <div class="quze__progress">
            <div :style="{bottom: `${parameters.understanding / 35 * 100 + 10}px`}"
                :class="['numbers-container', animateIncrementUnderstanding ? 'show' : 'hide']">
              <span class="number">+ 1</span>
              <span class="number">+ 1</span>
              <span class="number">+ 1</span>
            </div>
            <div :class="['quze__progress-line', colorProgressUnderstanding]"
                 :style="{height: `${parameters.understanding / 35 * 100}%`}"></div>
          </div>
          <p>Эффективность</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.numbers-container {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: inline-block;
  transition: .3s;

  &.hide {
    opacity: 0;
  }

  &.show {
    opacity: 1;
  }
}

.number {
  position: absolute;
  opacity: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  animation: riseAndFade 2s ease-in-out infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
   animation-delay: 0.5s;
 }
  &:nth-child(3) {
    animation-delay: 1s;
  }
  &:nth-child(4) {
    animation-delay: 1.5s;
  }
}

@keyframes riseAndFade {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  10% {
    opacity: 1;
    transform: translateY(-20px);
  }
  80% {
    opacity: 1;
    transform: translateY(-60px);
  }
  100% {
    opacity: 0;
    transform: translateY(-80px);
  }
}

.quze {
  padding-top: 28px;
  display: flex;

  &__nav {
    padding: 20px 0 0 160px;
  }

  &__content {
    &-left {
      width: 60%;
    }

    &-right {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 40%;
    }
  }

  &__progress {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    width: 55px;
    height: 320px;
    border-radius: 32px 32px 0 0;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
    background-color: white;
    overflow: hidden;
    margin-bottom: 15px;

    &-title {
      text-align: center;
      font-weight: bold
    }

    &-container  {
      display: flex;
      justify-content: center;
      gap: 30px;
    }

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-line {
      width: 100%;
      height: 100%;
      transition: .3s;
      background-color: #E9B226;

      &.yellow {
         background-color: #E9B226;
      }
      &.red {
        background-color: #BD2B2B;
      }
      &.green {
        background-color: #48BD2B;
      }
    }
  }

  &__question {
    display: flex;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
    background-color: #FFFFFF;

    &__icon {
      display: flex;
      align-items: center;
      padding: 0 25px;
      min-height: 92px;
      background-color: #FFC433;
      font-size: 54px;
      font-weight: bold;
    }

    &__container {
      padding: 20px 15px;
    }
  }

  &__answer {
    position: relative;
    padding: 16px 24px 16px 64px;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
    background-color: #FFFFFF;
    border-radius: 24px;
    margin-bottom: 8px;

    input[type="radio"] {
      display: none;
    }

    & > label {
      display: block;
      cursor: pointer;

      &:after {
        content: '';
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 16px;
        border-radius: 50%;
        transition: .3s;
        border: 2px solid #2F414C;
      }
    }

    & > input[type="radio"]:checked + label:after {
      background-color: var(--btn-color-bg);
    }

    &-container {
      padding-top: 15px;
      margin-bottom: 36px;
    }
  }

  &__text {
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }

    &-small {
      font-size: 14px;
    }

  }

  &__btn {
    background-color: var(--btn-color-bg);
    color: var(--btn-color);
    transition: .3s;

    &:disabled {
      background-color: var(--btn-color-bg-disable);
      color: var(--btn-color-disable);
      cursor: not-allowed;
    }

    &:hover {
      background-color: var(--btn-color-bg-hover);
      color: var(--btn-color-hover);
    }
  }
}
</style>