<script setup>
import { ref, onMounted } from "vue";
import { useScormStore } from "../store/scormStore.js";

const scormStore = useScormStore();
const selectedCharacter = ref('girl');

const selectCharacter = (character) => {
  selectedCharacter.value = character;
  scormStore.setCustomData('selectedCharacter', character);
};

onMounted(() => {
  const savedCharacter = scormStore.getCustomData('selectedCharacter');
  if (savedCharacter) {
    selectedCharacter.value = savedCharacter;
  }
});
</script>

<template>
  <div>
    <h2>Выбор персонажа</h2>
    <p>Выберите персонажа, за которого будешь проходить курс. Для этого нажми на его имя.</p>
    <div class="character character__girl">
      <div class="character__btn">
        <input id="radio-1" type="radio" name="radio" value="girl" :checked="selectedCharacter === 'girl'" @change="selectCharacter('girl')" />
        <label for="radio-1">Ника</label>
      </div>
      <img width="547" height="520" src="../assets/images/character/character-girl-1.png" alt="Иллюстрация персонажа девушки">
    </div>

    <div class="character character__man">
      <div class="character__btn">
        <input id="radio-2" type="radio" name="radio" value="man" :checked="selectedCharacter === 'man'" @change="selectCharacter('man')" />
        <label for="radio-2">Влад</label>
      </div>
      <img width="405" height="520" src="../assets/images/character/character-man-1.png" alt="Иллюстрация персонажа мужчины">
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
 margin: 25px 0 20px;
}

.character {
  display: flex;
  position: absolute;
  bottom: 0;

  &__btn {
    width: 356px;
    border-radius: 100px;
    background-color: white;
    position: absolute;
    bottom: 124px;
    text-align: center;
    font-size: 32px;

    input[type="radio"] {
      display: none;
    }

    & > label {
      display: block;
      padding: 25px 0;
      cursor: pointer;
      &:after {
        content: '';
        width: 53px;
        height: 53px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 16px;
        border-radius: 50%;
        transition: .3s;
        background-color: rgba(34, 34, 34, 0.2);
      }
    }

    & > input[type="radio"]:checked + label:after {
      background-color: var(--btn-color-bg);
    }
  }

  &__girl {
    left: 40px;
  }

  &__man {
    right: 40px;
  }
}
</style>


