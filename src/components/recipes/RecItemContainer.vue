<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";

defineProps({
  arr: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div
    class="grid grid-cols-3 items-center justify-between mt-10 gap-5 tablet:grid-cols-2 recipes__container"
    v-if="arr.length !== 0"
  >
    <RecRecipesItem v-for="recipe in arr" :key="recipe" :recipe="recipe" />
  </div>
  <div
    class="grid grid-cols-3 items-center justify-between mt-10 gap-5 tablet:grid-cols-2 recipes__container"
    v-else
  >
    <div class="flex flex-col gap-2 p-4 w-full" v-for="el in 6" :key="el">
      <Skeleton class="h-[330px] w-full tablets:h-[200px] rounded-xl" />
      <div class="flex flex-col gap-2">
        <Skeleton class="h-4 max-w-[300px]" />
        <Skeleton class="h-4 max-w-[250px]" />
        <Skeleton class="h-4 max-w-[200px]" />
      </div>
      <Skeleton class="max-w-full h-[80px]" />
      <Skeleton class="max-w-full h-[40px]" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 576px) {
  .recipes__container {
    grid-template-columns: 1fr;
  }
}
</style>
