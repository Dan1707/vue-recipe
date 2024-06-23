import { defineStore } from "pinia";
import { ref } from "vue";

const store = defineStore("store", () => {
  const recipesToShow = ref<object[] | any>([]);
  const recipeArray = ref<object[] | any>([]);
  const currentCategory = ref("All");
  const text = ref("");

  const deleteText = () => {
    text.value = "";
  };

  return { recipesToShow, recipeArray, currentCategory, text, deleteText };
});

export default store;
