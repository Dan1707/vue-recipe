<script setup lang="ts">
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
  >
    <RecRecipesItem v-for="recipe in arr" :key="recipe" :recipe="recipe" />
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 576px) {
  .recipes__container {
    grid-template-columns: 1fr;
  }
}
</style>
