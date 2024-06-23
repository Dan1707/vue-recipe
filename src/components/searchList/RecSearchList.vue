<script setup lang="ts">
import { X } from "lucide-vue-next";
import { Search } from "lucide-vue-next";
import { ref } from "vue";

const hideSearch = ref(false);

const emits = defineEmits(["searchEmit"]);
defineProps({
  showCategories: Boolean,
});

const searchEmit = (text: string) => {
  emits("searchEmit", text);
};
</script>

<template>
  <div
    class="mt-10 w-full sticky top-[110px] laptop:top-[90px] z-[100] flex justify-between gap-2"
  >
    <div class="w-full relative">
      <div
        class="max-w-[1090px] mr-12 flex-col shadow-md rounded-lg p-5 bg-gray-200 backdrop-blur-sm bg-opacity-50 tablet:p-4"
        :class="{ hideSearch: hideSearch }"
      >
        <slot></slot>
        <div class="w-full flex-between tablet:flex-col gap-3">
          <RecSearch @searchData="searchEmit" />
          <RecCategories v-if="showCategories" />
        </div>
      </div>
      <button
        @click="hideSearch = !hideSearch"
        class="p-2 bg-light rounded-lg shadow-xl self-start border absolute right-[0] top-[0]"
      >
        <div v-if="hideSearch === false">
          <X />
        </div>
        <div v-else>
          <Search />
        </div>
      </button>
    </div>
  </div>
</template>
