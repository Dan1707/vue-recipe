<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

defineProps({
  recipe: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>

<template>
  <Dialog class="rounded-lg">
    <DialogTrigger class="p-2 text-light bg-dark w-full desktop:text-sm">
      Read more...
    </DialogTrigger>
    <DialogContent class="max-w-[1000px] tablet:max-w-[600px] z-[200]">
      <DialogHeader>
        <DialogTitle class="text-dark text-3xl tablet:text-center">
          Recipe information:
        </DialogTitle>
      </DialogHeader>
      <DialogDescription class="text-md flex-between w-full gap-5">
        <ScrollArea
          class="h-[380px] tablet:max-w-[500px] m-auto rounded-md border p-4"
        >
          <img class="hidden tablet:block" :src="recipe.img" alt="meal" />
          <table class="w-full mt-5">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ingredient, index) in recipe?.ingredients"
                :key="index"
              >
                <td>{{ ingredient }}</td>
                <td>{{ recipe?.measure[index] }}</td>
              </tr>
            </tbody>
          </table>

          <h2 class="mt-5 font-bold text-[24px] text-dark">Istructions:</h2>
          <p class="max-w-[650px] basis-full">
            {{ recipe.instructions }}
          </p>
        </ScrollArea>
        <div
          class="max-w-[375px] h-[375px] basis-full overflow-hidden tablet:hidden rounded-lg"
        >
          <img class="w-full" :src="recipe.img" alt="meal" />
        </div>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>
