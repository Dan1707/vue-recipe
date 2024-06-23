<script setup lang="ts">
import axios from "axios";
import store from "@/store.ts";
import { ref } from "vue";

const storeData = store();

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
      <RecSearchList @searchEmit="getData" :showCategories="true" />
      <RecItemContainer :arr="slicedArray" />
      <RecPagination :arr="storeData.recipesToShow" @sendArr="copyArr" />
    </div>
  </section>
</template>

<style>
.hideSearch {
  opacity: 0;
  display: none;
}
</style>
