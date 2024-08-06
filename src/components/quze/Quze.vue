<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';
import Speech from '../Speech.vue';
import { useScormStore } from '../../store/scormStore.js';
import QuzeProgress from "./quzeProgress.vue";
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
    <quze-progress :interest="parameters.interest"
                   :engagement="parameters.engagement"
                   :understanding="parameters.understanding"
                   :interestVisible="animateIncrementInterest"
                   :engagementVisible="animateIncrementEngagement"
                   :understandingVisible="animateIncrementUnderstanding"
    />
  </div>
</template>

<style lang="scss" scoped>
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