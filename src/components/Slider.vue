<script setup>
import { defineProps } from 'Vue';
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const props = defineProps({
  slidesData: {
    type: Object,
    default: [
      {
        img: 'icon-1',
        title: 'Заголовок',
        content: ['Текст', 'Текст']
      },
      {
        img: 'icon-1',
        title: 'Заголовок',
        content: ['Текст', 'Текст']
      },
    ]
  }
});

const settings = {
  itemsToShow: 1,
  snapAlign: 'center',
}


</script>

<template>
  <carousel v-bind="settings" >
    <slide v-for="(slide, index) in slidesData" :key="index">
      <div class="carousel__item">
        <div class="carousel__icon-container">
          <img width="80" height="80" :src="'/assets/images/icon/icon-1.png'" alt="icon">
        </div>
        <div class="carousel__content">
          <h4>{{ slide.title }}</h4>
          <p v-for="(text, index) in slide.content" :key="index">{{text}}</p>
        </div>
      </div>
    </slide>

    <template #addons>
      <navigation class="" />
      <pagination class="pagination" />
    </template>
  </carousel>
</template>

<style lang="scss">
  h4 {
    font-size: 20px;
    margin: 0 0 15px;
  }

  p {
    font-size: 18px;
    margin: 0 0 10px;
  }

  .carousel {
    border-radius: 24px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.15);
    background-color: white;

    &__icon-container {
      width: 200px;
      padding: 20px 60px;
      border-radius: 16px;
      background-color: #C1E6FF;
    }

    &__item {
      min-height: 200px;
      padding: 25px 40px 0 40px;
      width: 100%;
      display: flex;
      align-items: flex-start;
    }

    &__content {
      text-align: left;
      padding-left: 25px;
    }

    &__prev,
    &__next {
      box-sizing: content-box;
      border: 5px solid white;
      top: auto;
      bottom: 10px;
      transform: none;

      &:after {
        content: '';
        width: 37px;
        height: 37px;
        background-image: url("../assets/icons/arrow-carousel.svg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      svg {
        display: none;
      }

      &:hover {
        border: 5px solid white;
      }
    }


    &__prev {
      &:after {
        transform: rotate(180deg);
      }
    }

    &__pagination {
      display: flex;
      align-items: center;
      height: 40px;
      margin: 10px 0 10px;

      &-button {
        &:focus {
          outline: none;
        }
        &:after {
          width: 8px!important;
          height: 8px!important;
          border-radius: 50%;
          background-color: #D5D9DB;
        }

        &--active {
          &:after {
            background-color: #2F414C;
          }
        }
      }
    }
  }
</style>