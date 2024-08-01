<template>
  <div class="ranking-component">
    <div class="lists">
      <div class="questions">
        <h3>Вопросы</h3>
        <div class="draggable-list">
          <div v-for="(question, index) in questions" :key="question.id" class="item">
            {{ question.text }}
          </div>
        </div>
      </div>
      <div class="answers">
        <h3>Ответы</h3>
        <Sortable
            :list="userAnswers"
            item-key="id"
            tag="div"
            class="draggable-list"
            :options="sortableOptions"
            @end="handleSortEnd"
        >
          <template #item="{ element }">
            <div class="item" :key="element.id">
              {{ element.text }}
            </div>
          </template>
        </Sortable>
      </div>
    </div>
    <button @click="checkAnswers">Проверить ответы</button>
    <div class="result" v-if="resultMessage">
      <p>{{ resultMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {Sortable} from 'sortablejs-vue3';

// Статичные вопросы и ответы
const questions = ref([
  {text: 'Вопрос 1', id: 1},
  {text: 'Вопрос 2', id: 2},
  {text: 'Вопрос 3', id: 3}
]);

const answers = ref([
  {text: 'Ответ 1', id: 1},
  {text: 'Ответ 2', id: 2},
  {text: 'Ответ 3', id: 3}
]);

// Перемешанный список ответов пользователя
const userAnswers = ref([]);

// Сообщение о результате проверки
const resultMessage = ref('');

// Опции для Sortable
const sortableOptions = {
  animation: 150,
  group: 'shared',
  swapThreshold: 0.65
};

// Функция перемешивания массива
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Инициализация списка ответов при монтировании компонента
onMounted(() => {
  userAnswers.value = shuffleArray([...answers.value]);
});

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
const checkAnswers = () => {
  const isCorrect = userAnswers.value.every((answer, index) => {
    return answer.id === questions.value[index].id;
  });
  resultMessage.value = isCorrect ? 'Ты молодец!' : 'Ты не молодец';
};
</script>

<style scoped>
.ranking-component {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lists {
  display: flex;
  justify-content: space-between;
  width: 600px;
}

.questions, .answers {
  width: 250px;
}

.draggable-list {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  min-height: 200px;
}

.item {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  cursor: grab;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.result {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}
</style>
