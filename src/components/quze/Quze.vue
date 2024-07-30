<script setup>
import { ref, computed } from 'vue';
import Speech from "../Speech.vue";

const props = defineProps({
  questions: {
    type: Array,
    required: true
  },
  resultMessage: {
    type: Array,
    required: true
  }
});

const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const parameters = ref({
  engagement: 5,
  interest: 5,
  understanding: 5
});

const currentQuestion = computed(() => props.questions[currentQuestionIndex.value]);

const switchColor = (param) => {
  if (param >= 8) {
    return 'green';
  } else if (param >= 5) {
    return 'yellow';
  } else {
    return 'red';
  }
};

const colorProgressInterest = computed(() => switchColor(parameters.value.interest));
const colorProgressEngagement = computed(() => switchColor(parameters.value.engagement));
const colorProgressUnderstanding = computed(() => switchColor(parameters.value.understanding));

const acceptAnswer = () => {
  const selected = selectedAnswer.value;
  if (selected.correct) {
    parameters.value[selected.parameter] += 1;
  } else {
    parameters.value[selected.parameter] -= 1;
  }
  selectedAnswer.value = null;
  currentQuestionIndex.value += 1;
};
</script>

<template>
  <div class="quze">
    <div class="quze__content-left">
      <div v-if="currentQuestionIndex < questions.length">
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
          <div class="quze__answer" v-for="(answer, index) in currentQuestion.Answer" :key="index">
            <input
                type="radio"
                :id="`answer-${index}`"
                :value="answer"
                v-model="selectedAnswer"
            />
            <label :for="`answer-${index}`">
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
      <div v-else>
        <speech :speech-data="resultMessage"/>
      </div>
    </div>
    <div class="quze__content-right">
      <div class="quze__progress-title">
        Динамика группы
      </div>
      <div class="quze__progress-container">
        <div class="quze__progress-item">
          <div class="quze__progress">
            <div :class="['quze__progress-line', colorProgressUnderstanding]" :style="{height: `${parameters.understanding / 10 * 100}%`}"></div>
          </div>
          <p>Понимание</p>
        </div>
        <div class="quze__progress-item">
          <div class="quze__progress">
            <div :class="['quze__progress-line', colorProgressInterest]" :style="{height: `${parameters.interest / 10 * 100}%`}"></div>
          </div>
          <p>Вовлеченность</p>
        </div>
        <div class="quze__progress-item">
          <div class="quze__progress">
            <div :class="['quze__progress-line', colorProgressEngagement]" :style="{height: `${parameters.engagement / 10 * 100}%`}"></div>
          </div>
          <p>Ярость</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quze {
  padding-top: 28px;
  display: flex;

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
      &.rad {
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
