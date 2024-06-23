<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
</script>

<template>
  <div class="hidden tablet:block">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div class="w-12 h-8 cursor-pointer">
          <span class="w-full h-1 bg-dark block rounded-xl"></span>
          <span class="w-full h-1 bg-dark block mt-2 rounded-xl"></span>
          <span class="w-full h-1 bg-dark block mt-2 rounded-xl"></span></div
      ></DropdownMenuTrigger>
      <DropdownMenuContent class="z-[100]">
        <router-link :to="{ name: 'home' }">
          <DropdownMenuItem class="text-lg">Home</DropdownMenuItem>
        </router-link>
        <router-link :to="{ name: 'by-letter' }">
          <DropdownMenuItem class="text-lg">Recipes by letter</DropdownMenuItem>
        </router-link>
        <router-link :to="{ name: 'by-ingredient' }">
          <DropdownMenuItem class="text-lg"
            >Recipes by ingredient</DropdownMenuItem
          >
        </router-link>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
