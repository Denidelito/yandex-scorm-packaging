<script setup>
import {computed, defineProps} from 'vue';

const props = defineProps({
  interest: {
    type: Number,
    defaults: 0,
    required: true
  },
  engagement: {
    type: Number,
    defaults: 0,
    required: true
  },
  understanding: {
    type: Number,
    defaults: 0,
    required: true
  },
  interestVisible: {
    type: Boolean,
    defaults: false
  },
  engagementVisible: {
    type: Boolean,
    defaults: false
  },
  understandingVisible: {
    type: Boolean,
    defaults: false
  },
})

// Цвета шкал прогресса
const switchColor = (param) => {
  // console.log(24, 33, 35)

  if (param >= 80) {
    return 'green';
  } else if (param >= 50) {
    return 'yellow';
  } else {
    return 'red';
  }
};

let interestPercent = computed(() => props.interest / 24 * 100);
let engagementPercent = computed(() => props.engagement / 33 * 100);
let understandingPercent = computed(() => props.understanding / 35 * 100);

const colorProgressInterest = computed(() => {
  return switchColor(interestPercent);
});
const colorProgressEngagement = computed(() => {
  return switchColor(engagementPercent);
});
const colorProgressUnderstanding = computed(() => {
  return switchColor(understandingPercent);
});
</script>

<template>
  <div class="quze__content-right">
    <div class="quze__progress-title">
      Динамика группы
    </div>
    <div class="quze__progress-container">
      <div class="quze__progress-item">
        <div class="quze__progress">
          <div :style="{bottom: `${interestPercent + 10}px`}"
               :class="['numbers-container', props.interestVisible ? 'show' : 'hide']">
            <span class="number">+ 1</span>
            <span class="number">+ 1</span>
            <span class="number">+ 1</span>
          </div>
          <div :class="['quze__progress-line', colorProgressInterest]"
               :style="{height: `${interestPercent}%`}"></div>
        </div>
        <p>Доверие</p>
      </div>
      <div class="quze__progress-item">
        <div class="quze__progress">
          <div :style="{bottom: `${engagementPercent + 10}px`}"
               :class="['numbers-container', props.engagementVisible ? 'show' : 'hide']">
            <span class="number">+ 1</span>
            <span class="number">+ 1</span>
            <span class="number">+ 1</span>
          </div>
          <div :class="['quze__progress-line', colorProgressEngagement]"
               :style="{height: `${engagementPercent}%`}"></div>
        </div>
        <p>Вовлеченность</p>
      </div>
      <div class="quze__progress-item">
        <div class="quze__progress">
          <div :style="{bottom: `${understandingPercent + 10}px`}"
               :class="['numbers-container', props.understandingVisible ? 'show' : 'hide']">
            <span class="number">+ 1</span>
            <span class="number">+ 1</span>
            <span class="number">+ 1</span>
          </div>
          <div :class="['quze__progress-line', colorProgressUnderstanding]"
               :style="{height: `${understandingPercent / 35 * 100}%`}"></div>
        </div>
        <p>Эффективность</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quze {
  &__content {
    &-right {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 40%;
    }
  }
}

.numbers-container {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: inline-block;
  transition: .3s;

  &.hide {
    opacity: 0;
  }

  &.show {
    opacity: 1;
  }
}

.number {
  position: absolute;
  opacity: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  animation: riseAndFade 2s ease-in-out infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.5s;
  }
  &:nth-child(3) {
    animation-delay: 1s;
  }
  &:nth-child(4) {
    animation-delay: 1.5s;
  }
}

@keyframes riseAndFade {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  10% {
    opacity: 1;
    transform: translateY(-20px);
  }
  80% {
    opacity: 1;
    transform: translateY(-60px);
  }
  100% {
    opacity: 0;
    transform: translateY(-80px);
  }
}

.quze {
  &__progress {
    position: relative;
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
      &.red {
        background-color: #BD2B2B;
      }
      &.green {
        background-color: #48BD2B;
      }
    }
  }
}
</style>