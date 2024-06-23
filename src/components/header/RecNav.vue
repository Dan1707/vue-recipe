<template>
  <nav class="max-w-fit basis-full desktop:gap-2 gap-5">
    <ul class="flex-between">
      <router-link :to="{ name: 'by-letter' }">
        <li class="light-btn tablet:hidden">Recipies By Letter</li>
      </router-link>
      <router-link :to="{ name: 'by-ingredient' }">
        <li class="light-btn tablet:hidden">Recipies By Ingredients</li>
      </router-link>
    </ul>
  </nav>
</template>
