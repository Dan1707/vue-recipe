<script setup lang="ts">
import { ref } from "vue";

defineProps({
  recipe: Object,
});

const readMore = ref(false);
</script>

<template>
  <div
    class="rounded-lg p-4 border-2 w-full min-h-full flex flex-col justify-between"
  >
    <div class="max-w-full h-[275px] overflow-hidden rounded-lg">
      <img class="w-full" :src="recipe?.img" alt="meal" />
    </div>
    <div class="mt-5 flex flex-col gap-3">
      <h3 class="font-title text-dark font-bold text-3xl">
        {{ recipe?.title }}
      </h3>
      <p>
        <span class="text-dark font-bold text-lg">Cuisine: </span>
        {{ recipe?.cuisine }}
      </p>
      <p>
        <span class="text-dark font-bold text-lg">Category: </span>
        {{ recipe?.category }}
      </p>
      <div>
        <span class="text-dark font-bold text-lg">ingredients:</span>

        <ul
          class="flex gap-3 flex-wrap mt-4 h-[92px] overflow-hidden bg-secondary p-2 rounded-lg"
          :class="{ 'read-more': readMore }"
        >
          <li
            class="font-main text-dark p-1 bg-light text-sm font-bold border-2 rounded-lg"
            v-for="ing in recipe?.ingredients"
            :key="ing"
          >
            {{ ing }}
          </li>
        </ul>
      </div>
      <div class="flex-between tablet:flex-col overflow-hidden rounded-lg">
        <a
          target="_blanck"
          :href="recipe?.url"
          class="p-2 text-light flex-between tablet:justify-center tablet:gap-5 desktop:text-sm bg-red-600 w-full"
        >
          <img
            src="https://pngfre.com/wp-content/uploads/You-Tube-14.png"
            class="max-w-[20px] min-h-[20px]"
          />
          Watch the video
        </a>

        <RecInstructions :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.read-more {
  height: auto;
  overflow: auto;
}
</style>
