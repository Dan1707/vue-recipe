<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";

const ingArray = ref<object[]>([]);

async function serchDetails(data: object | any) {
  try {
    ingArray.value.length = 0;

    for (const el of data.meals) {
      const fullData = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
      );

      if (fullData.data.meals && fullData.data.meals.length > 0) {
        const meal = fullData.data.meals[0];

        ingArray.value.push({
          id: meal.idMeal,
          img: meal.strMealThumb,
          title: meal.strMeal,
          category: meal.strCategory,
          cuisine: meal.strArea,
          url: meal.strYoutube,
          ingredients: Object.keys(meal)
            .filter((key) => key.startsWith("strIngredient") && meal[key])
            .map((key) => meal[key]),
          measure: Object.keys(meal)
            .filter((key) => key.startsWith("strMeasure") && meal[key])
            .map((key) => meal[key]),
          instructions: meal.strInstructions,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// fetching recipe data by main ingridient
const searchByIng = async (mainIng: string) => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIng}`
    );

    const data = res.data;

    if (mainIng === "" && mainIng.length === 0) {
      ingArray.value.length = 0;
    } else {
      serchDetails(data);
    }

    console.log(ingArray.value);
  } catch (error) {
    console.log(error);
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
  <h1
    class="text-center font-bold text-5xl font-title tablet:text-4xl phonel:text-3xl text-dark mt-20"
  >
    Search recipes by main ingridient
  </h1>
  <div class="container">
    <RecSearchList @searchEmit="searchByIng" :showCategories="false" />
    <div v-if="ingArray.length > 0">
      <RecItemContainer :arr="slicedArray" />
    </div>
    <RecPagination :arr="ingArray" @sendArr="copyArr" />
  </div>
  <div v-if="ingArray.length === 0">
    <hr class="my-5" />
    <p class="text-center text-lg">There's no recipies yet...</p>
  </div>
</template>
