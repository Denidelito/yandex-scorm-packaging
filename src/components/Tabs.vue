<script setup>
import { defineProps, ref} from "Vue";

const props = defineProps({
  buttons: {
    type: Array,
    default: ["Кнопка 1", "Кнопка 2"]
  },
  contents: {
    type: Array,
    default: [
      [
        {
          title: 'Заголовок',
          text: 'Текст'
        },
        {
          title: 'Заголовок',
          text: 'Текст'
        },
      ],
      [
        {
          title: 'Заголовок 2',
          text: 'Текст 2'
        },
        {
          title: 'Заголовок 2',
          text: 'Текст 2'
        },
      ]
    ]
  }
})

let indexCurrentTab = ref(0)

const btnClass = (index) => {
  return ['tabs__button', index === indexCurrentTab.value ? 'tabs__button_active' : '']
}

</script>

<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li :class="btnClass(index)" v-for="(button, index) in buttons" :key="index" @click="indexCurrentTab = index">{{button}}</li>
    </ul>
    <div class="tabs__content">
      <div v-for="(itemTabs, index) in contents[indexCurrentTab]">
        <h4>{{itemTabs.title}}</h4>
        <div v-html="itemTabs.text"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .tabs {
    display: flex;

    &__list {
      min-width: 300px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &__button {
      position: relative;
      z-index: 2;
      text-align: center;
      width: 100%;
      background-color: var(--tabs-button-bg);
      color: white;
      transition: .3s;
      margin-bottom: 10px;
      padding: 26px 0 26px;
      border-radius: 16px;
      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        width: 120%;
        background-color: var(--tabs-button-bg-hover);
        color: #222222;
      }
      &_active {
        width: 120%;
        background-color: var(--tabs-button-bg-hover);
        color: #222222;
      }
    }

    &__content {
      width: 100%;
      padding: 20px 20px 20px 45px;
      margin-left: 20px;
      border-radius: 30px;
      background-color: white;
      box-shadow: 0 4px 30px 0 rgba(0, 0, 0, 0.25);
      font-size: 14px;

      & > p {
        margin-bottom: .8rem;
      }
      & > ol {
        padding: 0 0 0 12px;
      }
    }
  }
</style>