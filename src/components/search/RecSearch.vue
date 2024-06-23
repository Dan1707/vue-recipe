<script setup lang="ts">
import store from "@/store.ts";

const storeData = store();
const emits = defineEmits(["searchData"]);

// searching recipes by recipe name
const recSearch = async () => {
  emits("searchData", storeData.text);
};
</script>

<template>
  <form class="flex-between w-full gap-1">
    <Input
      id="search"
      type="text"
      class="w-full"
      placeholder="Search..."
      v-model="storeData.text"
      @input.prevent="recSearch"
      @keypress.enter.prevent="recSearch"
    />

    <Button
      type="submit"
      class="bg-dark text-light hover:bg-light border-2 border-dark hover:text-dark shadow-md"
      @click.prevent="recSearch"
    >
      Submit
    </Button>
  </form>
</template>
