<script setup>

</script>

<template>
  <div class="progress">
    <div class="progress__info">
      <div class="progress__title">Прогресс</div>
      <div class="progress__score">30%</div>
    </div>
    <div class="progress__line"></div>
  </div>
</template>

<style scoped lang="scss">
.progress {
  margin: 0 24px;
  &__info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 2px;
  }
  &__line {
    width: 160px;
    height: 2px;
    border-radius: 1px;
    background-color: rgba(34, 34, 34, 0.2);
  }
}
</style>