<template>
  <custom-scrollbar :style="{ width: '1200px', height: '500px' }" :auto-hide="false" >
    <div class="speech__dialog-container">
      <!-- Отображение истории диалога -->
      <div v-for="(entry, index) in dialogueHistory" :key="index">
        <div class="speech">
          <div class="speech__character">
            <img width="137" height="137" src="../assets/images/character/character-ivan-speech.png" alt="Эллюстрация персонажа по имени Иван">
          </div>
          <div class="speech__content speech__content_row">
            <div class="speech__dialog-modal">
              {{ entry.question }}
            </div>
          </div>
        </div>
        <div class="speech speech_answer" v-if="entry.response">
          <div class="speech__content speech__content_row">
            <div class="speech__dialog-modal">
              {{ entry.response }}
            </div>
          </div>
          <div class="speech__character">
            <img width="137" height="137" src="../assets/images/character/character-vlad-speech.png" alt="Эллюстрация персонажа по имени Иван">
          </div>
        </div>
      </div>
      <!-- Текущий вопрос и варианты ответов или развернутый ответ -->
      <div v-if="currentDialogue && currentDialogue.answers">
        <div class="speech">
          <div class="speech__character">
            <img width="137" height="137" src="../assets/images/character/character-ivan-speech.png" alt="Эллюстрация персонажа по имени Иван">
          </div>
          <div class="speech__content speech__content_row">
            <div class="speech__dialog-modal">
              {{ currentDialogue.question }}
            </div>
          </div>
        </div>
        <div class="speech speech_answer" v-if="!showResponse">
          <div>
            <button class="speech__btn" v-for="(answer, index) in currentDialogue.answers" :key="index" @click="handleAnswer(index)">
              {{ answer.text }}
            </button>
          </div>
          <div class="speech__character">
            <img width="137" height="137" src="../assets/images/character/character-vlad-speech.png" alt="Эллюстрация персонажа по имени Иван">
          </div>
        </div>
      </div>
      <!-- Окончание диалога -->
      <div v-else-if="currentDialogue && currentDialogue.response">
        <div class="speech">
          <div class="speech__character">
            <img width="137" height="137" src="../assets/images/character/character-ivan-speech.png" alt="Эллюстрация персонажа по имени Иван">
          </div>
          <div class="speech__content speech__content_row">
            <div class="speech__dialog-modal">
              {{ currentDialogue.response }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </custom-scrollbar>
  <!-- <button class="speech__btn" @click="resetDialogue">Начать заново</button> -->
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { defineProps } from 'vue';

const currentScroll = ref(0);

// Определение входящих параметров
const props = defineProps({
  dialogues: {
    type: Array,
    required: true
  }
});

// Текущий индекс диалога
const currentIndex = ref(0);

// История диалога
const dialogueHistory = ref([]);

// Показать развернутый ответ
const showResponse = ref(false);

// Текущий развернутый ответ
const currentExpandedResponse = ref('');

// Текущий диалог
const currentDialogue = computed(() => props.dialogues[currentIndex.value]);

// Обновление скролла после изменения истории диалога
const updateScroll = () => {
  nextTick(() => {
    const container = document.querySelector('.speech__dialog-container');
    if (container) {
      currentScroll.value = container.scrollHeight;

      const scroller = document.querySelector('.scrollbar__scroller');
      if (scroller) {
        scroller.scrollTo({
          top: currentScroll.value,
          behavior: 'smooth'
        });
      }
    }
  });
};

// Функция для обработки выбора ответа
const handleAnswer = (answerIndex) => {
  // Добавляем текущий вопрос, текст ответа и развернутый ответ в историю
  dialogueHistory.value.push({
    question: currentDialogue.value.question,
    answer: currentDialogue.value.answers[answerIndex].text,
    response: currentDialogue.value.answers[answerIndex].response || ''
  });

  // Сохраняем развернутый ответ
  currentExpandedResponse.value = currentDialogue.value.answers[answerIndex].response || '';

  // Показать развернутый ответ и скрыть кнопки
  showResponse.value = true;

  // Обновляем индекс для следующего диалога через задержку
  currentIndex.value = currentDialogue.value.answers[answerIndex].next;

  setTimeout(() => {
    showResponse.value = false;

    updateScroll();
  }, 1000);
};

// Функция для сброса диалога
const resetDialogue = () => {
  currentIndex.value = 0;
  dialogueHistory.value = [];
  showResponse.value = false;
  updateScroll(); // Обновить скролл после сброса диалога
};

// Отслеживание изменений currentIndex и обновление currentDialogue
watch(currentIndex, (newIndex) => {
  if (!props.dialogues[newIndex]) {
    return;
  }
  updateScroll();
});

onMounted(() => {
  updateScroll();
});
</script>


<style lang="scss">
.speech {
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 2;

  &__btn {
    background-color: white;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.05);
    padding: 16px 24px;
    border-radius: 16px;
    margin-right: 30px;
    transition: .3s;

    &:last-child {
      margin-right: 20px;
    }

    &:hover {
      background-color: var(--btn-color-bg);
      color: var(--btn-color);
    }
  }

  &_answer {
    justify-content: flex-end;

    & .speech__dialog-modal {
      border-radius: 32px 0 24px 32px;
      padding: 20px 20px 20px 40px;
      margin: 0 20px 0 0;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 20px 0;

    &_row {
      flex-direction: row;
    }
  }

  &__character {
    line-height: 0;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
  }

  &__dialog-modal {
    width: 100%;
    max-width: 700px;
    margin-left: 20px;
    border-radius: 0 32px 32px 24px;
    padding: 20px 20px 20px 40px;
    background-color: #D5D9DB;
    color: #2F414C;
    margin-bottom: 20px;
    font-size: 16px;

    &.large {
      max-width: 650px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__dialog-container {
    padding-right: 20px;
  }
}
</style>