<script setup lang="ts">
import axios from "axios";
import store from "@/store.ts";
import { ref } from "vue";
import { ArrowUp } from "lucide-vue-next";
import { ArrowDown } from "lucide-vue-next";

const storeData = store();
const hideSearch = ref(false);

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

// fetching main recipe data
const getData = async (newData: string | null) => {
  if (newData === null) {
    const data = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s"
    );

    storeData.recipeArray = await data.data.meals.map((el: fullResipeItem) => ({
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

    storeData.recipesToShow = [...storeData.recipeArray];

    console.log(storeData.recipesToShow);
  }
  if (
    typeof newData === "string" &&
    newData.length > 0 &&
    storeData.currentCategory === "All"
  ) {
    const data = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${newData}`
    );

    storeData.recipesToShow = await data.data.meals.map(
      (el: fullResipeItem) => ({
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
      })
    );

    console.log(storeData.recipesToShow);
  }

  if (newData === "") {
    storeData.recipesToShow = [];

    storeData.recipesToShow = [...storeData.recipeArray];
  }

  if (storeData.currentCategory !== "All") {
    storeData.recipesToShow = [];

    storeData.recipeArray.forEach((el: object | any) => {
      if (el.title.toUpperCase().includes(newData?.toUpperCase())) {
        storeData.recipesToShow.push(el);
      }
    });

    console.log(storeData.currentCategory);
  }
};

getData(null);

// coping slicedArray
const slicedArray = ref<object[]>([]);

const copyArr = (arr: object[]) => {
  slicedArray.value = [...arr];
};
</script>

<template>
  <section class="w-full">
    <div class="container">
      <div>
        <h2 class="title">Popular Recipies:</h2>
      </div>
      <div
        class="mt-10 w-full sticky top-[110px] laptop:top-[90px] z-[100] flex justify-between gap-2"
      >
        <div
          class="w-full tablet:flex-col flex-between shadow-md rounded-lg p-5 bg-gray-200 backdrop-blur-sm bg-opacity-50 tablet:p-4 flex-between gap-3 duration-300"
          :class="{ hideSearch: hideSearch }"
        >
          <RecSearch @searchData="getData" />
          <RecCategories />
        </div>
        <button
          v-if="hideSearch === false"
          @click="hideSearch = !hideSearch"
          class="p-2 bg-light rounded-lg shadow-xl self-start border"
        >
          <ArrowUp />
        </button>
        <button
          v-if="hideSearch"
          @click="hideSearch = !hideSearch"
          class="p-2 bg-light rounded-lg shadow-xl self-start border"
        >
          <ArrowDown />
        </button>
      </div>

      <RecItemContainer :arr="slicedArray" />
      <RecPagination :arr="storeData.recipesToShow" @sendArr="copyArr" />
    </div>
  </section>
</template>

<style>
.hideSearch {
  opacity: 0;
}
</style>
