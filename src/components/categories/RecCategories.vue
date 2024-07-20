<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { ref, watch } from "vue";
import store from "@/store.ts";

const storeData = store();
const categories = ref<object[] | any>([{ strCategory: "All" }]);
const currentCategory = ref("");

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

const emits = defineEmits(["currentCategory"]);

const getCategories = async () => {
  const data = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );

  data.data.meals.forEach((el: object | any) => {
    categories.value.push(el);
  });

  console.log(categories.value);
};

getCategories();

const searchByCategory = async () => {
  try {
    storeData.text = "";

    if (currentCategory.value === "All") {
      const data = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s"
      );

      storeData.recipeArray = await data.data.meals.map(
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
          instructions: el.strInstructions,
        })
      );

      storeData.recipesToShow = [...storeData.recipeArray];
    } else {
      const data = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategory.value}`
      );

      storeData.recipesToShow = [];

      for (const el of data.data.meals) {
        const newData = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el.idMeal}`
        );

        if (newData.data.meals && newData.data.meals.length > 0) {
          const meal = newData.data.meals[0];

          storeData.recipesToShow.push({
            id: meal.idMeal,
            img: meal.strMealThumb,
            title: meal.strMeal,
            category: meal.strCategory,
            cuisine: meal.strArea,
            url: meal.strYoutube,
            ingredients: Object.keys(meal)
              .filter((key) => key.startsWith("strIngredient") && meal[key])
              .map((key) => meal[key]),
            instructions: meal.strInstructions,
          });

          storeData.recipeArray = [...storeData.recipesToShow];
        }
      }
    }
  } catch (error) {
    console.error("Error fetching meals by category:", error);
  }
};

watch(currentCategory, searchByCategory);
watch(currentCategory, () => {
  storeData.currentCategory = currentCategory.value;
  storeData.currentPage = 1;
});
</script>

<template>
  <Select v-model="currentCategory">
    <SelectTrigger>
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent class="z-[101] h-[250px]">
      <SelectItem
        v-for="category in categories"
        :key="category.strCategory"
        :value="category.strCategory"
      >
        {{ category.strCategory }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
