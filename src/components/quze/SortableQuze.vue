<script setup>
import {ref, onMounted, defineProps, computed} from 'vue';
import {Sortable} from 'sortablejs-vue3';
import SvgIcon from "../SvgIcon.vue";
import Speech from "../Speech.vue";
import { useScormStore } from "../../store/scormStore.js";
import QuzeProgress from "./quzeProgress.vue";

const scormStore = useScormStore();
const props = defineProps({
  task: {
    type: String,
    default: 'Задание'
  },
  questions: {
    type: Array,
    required: true,
    default: [
      {text: 'Вопрос 1', id: 1},
      {text: 'Вопрос 2', id: 2},
      {text: 'Вопрос 3', id: 3}
    ]
  },
  answers: {
    type: Array,
    required: true,
    default: [
      {text: 'Ответ 1', id: 1},
      {text: 'Ответ 2', id: 2},
      {text: 'Ответ 3', id: 3}
    ]
  },
  feedback: {
    type: Object,
    default: {
      correct: ['Ты молодец!'],
      incorrect: ['Ты не молодец!'],
    }
  },
  size: {
    type: String,
    default: 'normal'
  },
  name: {
    type: String,
    required: true
  },
  sortStore: {
    type: Object,
    required: true,
    default: {
      complete: false,
      feedbackVisible: false,
    }
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
});

let animateIncrementInterest = ref(false);
let animateIncrementEngagement = ref(false);
let animateIncrementUnderstanding = ref(false);

// Перемешанный список ответов пользователя
const userAnswers = ref([]);

// Сообщение о результате проверки

// Опции для Sortable
const sortableOptions = {
  animation: 150,
  group: 'shared',
  swapThreshold: 0.65
};

let parameters = computed(() => props.parameters)
let complete = computed({
  get: () => props.sortStore.complete,
  set: (value) =>  props.sortStore.complete = value
});
let feedbackVisible = computed({
  get: () => props.sortStore.feedbackVisible,
  set: (value) => props.sortStore.feedbackVisible = value
});
let resultMessage = computed(() => complete.value ? props.feedback.correct : props.feedback.incorrect);
// Функция перемешивания массива
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const classQuestion = computed(() => ['questions__item', `questions__item_${props.size}`]);

const classAnswer = computed(() => ['answer__item', `answer__item_${props.size}`]);

// Инициализация списка ответов при монтировании компонента
onMounted(() => {
  // Статичные вопросы и ответы
  const questions = ref([...props.questions]);
  const answers = ref([...props.answers]);

  userAnswers.value = shuffleArray([...answers.value]);
});

const saveScormData = () => {
  scormStore.setCustomData('quzeParameters', parameters.value);
  scormStore.setCustomData(props.name, {
    complete: complete.value,
    feedbackVisible: feedbackVisible.value,
  });
}
const restarSort = (array) => {
  if (complete.value) {
    parameters.value.interest -= 1;
    parameters.value.engagement -= 1;
    parameters.value.understanding -= 1;

    complete.value = false;
  }

  feedbackVisible.value = false;

  saveScormData();

  userAnswers.value = shuffleArray([...array])
}

// Обработчик завершения сортировки
const handleSortEnd = (event) => {
  // Получаем индекс элемента до и после перетаскивания
  const {oldIndex, newIndex} = event;

  // Изменяем порядок элементов в userAnswers
  if (oldIndex !== newIndex) {
    const movedItem = userAnswers.value.splice(oldIndex, 1)[0];
    userAnswers.value.splice(newIndex, 0, movedItem);
  }
};

// Метод проверки правильности сопоставления
const checkAnswers = (questions) => {
  const isCorrect = userAnswers.value.every((answer, index) => {
    return answer.id === questions[index].id;
  });

  if (isCorrect) {
    parameters.value.interest += 1;
    parameters.value.engagement += 1;
    parameters.value.understanding += 1;

    animateIncrementEngagement.value = true;
    animateIncrementInterest.value = true;
    animateIncrementUnderstanding.value = true;

    setTimeout(() => {
      animateIncrementInterest.value = false;
      animateIncrementEngagement.value = false;
      animateIncrementUnderstanding.value = false;
    }, 1500)

    complete.value = true;
  } else {
    complete.value = false;
  }

  feedbackVisible.value = true;

  saveScormData();
};

</script>

<template>
  <div class="sortable-quze">
    <div v-if="!feedbackVisible">
      <div class="sortable-quze__task">
        <div class="sortable-quze__task-icon">?</div>
        <div class="sortable-quze__task-text">{{task}}</div>
      </div>
      <div class="sortable-quze__lists">
        <div class="questions">
          <div v-for="(question, index) in questions" :key="question.id" :class="classQuestion">
            {{ question.text }}
          </div>
        </div>
        <div class="answers">
          <Sortable
              :list="userAnswers"
              item-key="id"
              tag="div"
              :options="sortableOptions"
              @end="handleSortEnd"
          >
            <template #item="{ element }">
              <div :class="classAnswer" :key="element.id">
                {{ element.text }}
                <svg-icon name="drag"/>
              </div>
            </template>
          </Sortable>
        </div>
      </div>
    </div>
    <div class="sortable-quze__nav">
      <button class="sortable-quze__btn" v-if="feedbackVisible"  @click="restarSort(answers)">Попробовать еще раз</button>
      <button class="sortable-quze__btn" v-if="!feedbackVisible" @click="checkAnswers(questions)">Проверить ответы</button>
    </div>
    <div class="" v-if="feedbackVisible">
      <div class="sortable-quze__result">
        <speech :speech-data="resultMessage"/>
        <!--    Шкалы прогресса-->
        <quze-progress style="margin-top: 80px" :interest="parameters.interest"
                       :engagement="parameters.engagement"
                       :understanding="parameters.understanding"
                       :interestVisible="animateIncrementInterest"
                       :engagementVisible="animateIncrementEngagement"
                       :understandingVisible="animateIncrementUnderstanding"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sortable-quze {
  &__result {
    padding-top: 28px;
    display: flex;
    justify-content: space-between;
  }

  &__btn {
    background-color: var(--btn-color-bg);
    transition: .3s;

    &:hover {
      background-color: var(--btn-color-bg-hover);
      color: var(--btn-color-hover);
    }
  }

  &__lists {
    display: flex;
  }

  &__nav {
    position: absolute;
    bottom: 12px;
  }

  &__task {
    display: flex;
    border-radius: 16px;
    overflow: hidden;
    background-color: white;
    margin: 30px 0 20px;

    &-icon {
      padding: 5px 24px;
      background-color: #FFC433;
      font-size: 50px;
      font-weight: bold;
    }
    &-text {
      display: flex;
      align-items: center;
      padding: 5px 24px;
    }
  }
}

.questions__item, .answer__item {
  height: 70px;
  padding: 12px 24px;
  margin-bottom: 15px;

  &_large {
    height: 90px;
  }
}

.questions {
  &__item {
    font-size: 16px;
    color: white;
    background-color: #2F414C;
    border-radius: 16px 0 0 16px;
  }
}

.answer {
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    width: 350px;
    font-size: 18px;
    background-color: #D5D9DB;
    border-radius: 0 16px 16px 0;
    cursor: grab;

    & > svg {
      position: absolute;
      right: 24px;
    }
  }
}
</style>
