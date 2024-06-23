<script setup lang="ts">
import { computed, ref } from "vue";
import axios from "axios";

const letters = ref<string[]>([]);
const letterRec = ref<object[]>([]);
const letterRecToShow = ref<object[]>([]);
const showInput = ref(false);

interface fullResipeItem {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strYoutube: string;
  strInstructions: string;
  [key: string]: string | undefined;
}

for (let i = 65; i < 91; i++) {
  letters.value.push(String.fromCharCode(i));
}

// fetching recipe data by first letter
const searchByLetter = async (letter: string) => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );

    const data = res.data;

    letterRec.value = await data.meals.map((el: fullResipeItem) => ({
      id: el.idMeal,
      img: el.strMealThumb,
      title: el.strMeal,
      category: el.strCategory,
      cuisine: el.strArea,
      url: el.strYoutube,
      ingredients: Object.keys(el)
        .filter((key) => key.startsWith("strIngredient") && el[key])
        .map((key) => el[key]),
      measure: Object.keys(el)
        .filter((key) => key.startsWith("strMeasure") && el[key])
        .map((key) => el[key]),
      instructions: el.strInstructions,
    }));

    letterRecToShow.value = [...letterRec.value];
  } catch (error) {
    console.log(error);
  }
};

// local searching recipe by its name
const localSearch = (recTitle: string) => {
  letterRecToShow.value = letterRecToShow.value.filter((el: object | any) => {
    return el.title.toUpperCase().includes(recTitle?.toUpperCase());
  });

  if (recTitle.length === 0) {
    letterRecToShow.value = [...letterRec.value];
  }
};

// coping slicedArray
const tempArr = ref<object[]>([]);

const copyArr = (arr: object[]) => {
  tempArr.value = [...arr];
};

const slicedArray = computed(() => {
  return tempArr.value;
});
</script>

<template>
  <h1 class="title text-5xl tablet:text-4xl phonel:text-3xl text-center mt-20">
    Search recipes by first letter
  </h1>
  <div v-if="showInput === false">
    <div
      class="flex justify-between flex-wrap gap-1 items-center mt-10 max-w-xl m-auto"
    >
      <span
        class="cursor-pointer text-2xl hover:text-primary duration-200"
        v-for="letter in letters"
        :key="letter"
        @click="
          searchByLetter(letter);
          showInput = true;
        "
      >
        {{ letter }}
      </span>
    </div>
  </div>
  <div v-if="showInput">
    <div class="container">
      <RecSearchList @searchEmit="localSearch" :showCategories="false">
        <div
          class="flex justify-between flex-wrap gap-1 items-center max-w-xl m-auto"
        >
          <span
            class="cursor-pointer text-2xl hover:text-primary duration-200"
            v-for="letter in letters"
            :key="letter"
            @click="searchByLetter(letter)"
          >
            {{ letter }}
          </span>
        </div>
      </RecSearchList>
      <div v-if="slicedArray.length > 0">
        <RecItemContainer :arr="slicedArray" />
      </div>
    </div>
  </div>
  <RecPagination :arr="letterRecToShow" @sendArr="copyArr" />
  <div v-if="slicedArray.length === 0">
    <hr class="my-5" />
    <p class="text-center text-lg">There's no recipies...</p>
  </div>
</template>
