<script setup>
import { ref, onMounted, computed } from 'vue';
import { defineProps } from 'vue';

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
  }
});

const buttons = ref([]);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

onMounted(() => {
  buttons.value = [
    { value: 'correct', text: props.button.correct },
    { value: 'incorrect', text: props.button.incorrect }
  ];
  shuffleArray(buttons.value);
});

const selectedAnswer = ref(null);

const handleChange = (value) => {
  selectedAnswer.value = value;
};

const buttonClass = (value) => {
  return ['pick-one__button', value === selectedAnswer.value ?
      (value === 'correct' ? 'pick-one__button_correct' : 'pick-one__button_incorrect') : ''];
};
</script>

<template>
  <div class="pick-one__question">
    <div class="pick-one__icon">
      ?
    </div>
    <p>{{ question }}</p>
  </div>
  <form class="pick-one__buttons">
    <label v-for="button in buttons" :key="button.value" :class="buttonClass(button.value)">
      <input type="radio" :value="button.value" v-model="selectedAnswer" @change="handleChange(button.value)">
      {{ button.text }}
    </label>
  </form>
  <div class="pick-one__answer" v-if="selectedAnswer === 'correct'">{{props.answer.correct}}</div>
  <div class="pick-one__answer" v-else-if="selectedAnswer === 'incorrect'">{{props.answer.incorrect}}</div>
</template>

<style scoped lang="scss">
  .pick-one {
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
      font-size: 20px;
      border-radius: 32px;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);

      & > p {
        padding: 18px 21px;
      }
    }
    &__buttons {
      display: flex;
      gap: 30px;
      padding: 25px 0 25px 74px;
    }
    &__button {
      width: 100%;
      padding: 16px 24px;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
      background-color: white;
      border-radius: 16px;
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
      padding: 16px 24px;
      background-color: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
    }
  }
</style>