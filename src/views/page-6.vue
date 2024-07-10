<script setup>
import Tabs from "../components/Tabs.vue";

const buttons = ["Кнопка 1", "Кнопка 2"];
const contents = [
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
</script>

<template>
  <tabs :buttons="buttons" :contents="contents" class="mt-60"/>
</template>

<style scoped lang="scss">

</style>