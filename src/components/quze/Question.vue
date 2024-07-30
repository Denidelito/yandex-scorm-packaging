<template>
  <div class="question">
    <h3>{{ question.question }}</h3>
    <div v-for="(answer, index) in question.Answer" :key="index" class="answer">
      <label>
        <input
            v-if="isMultiple"
            type="checkbox"
            :value="index"
            v-model="selectedAnswers"
            @change="handleAnswerChange"
        />
        <input
            v-else
            type="radio"
            :value="index"
            v-model="selectedAnswers"
            name="answer"
            @change="handleAnswerChange"
        />
        {{ answer.text }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineEmits } from 'vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['answer-selected']);

const isMultiple = computed(() => {
  return props.question.Answer.filter(answer => answer.correct).length > 1;
});

const selectedAnswers = ref(isMultiple.value ? [] : null);

const handleAnswerChange = () => {
  emit('answer-selected', selectedAnswers.value);
};
</script>

<style scoped>
.question {
  margin-bottom: 20px;
}
.answer {
  margin: 5px 0;
}
</style>
