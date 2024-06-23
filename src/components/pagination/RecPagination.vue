<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

const props = defineProps({
  arr: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits(["sendArr"]);

// pagination logic
const recOnPage = 6;
const currentPage = ref(1);

const amountOnPage = computed(() => {
  return Math.ceil(props.arr.length / recOnPage);
});

const slicedArray = computed(() => {
  const start = recOnPage * (currentPage.value - 1);
  const end = start + recOnPage;
  return props.arr.slice(start, end);
});

watch(slicedArray, () => {
  emits("sendArr", slicedArray.value);
});
</script>

<template>
  <template v-if="amountOnPage > 1">
    <Pagination
      v-slot="{ page }"
      :total="amountOnPage * 10"
      :sibling-count="1"
      show-edges
      :default-page="1"
      class="w-full flex items-center justify-center mt-10"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="currentPage = 1" />
        <PaginationPrev @click="currentPage--" />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0 text-dark"
              :variant="item.value === page ? 'default' : 'outline'"
              @click="currentPage = item.value"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="currentPage++" />
        <PaginationLast @click="currentPage = amountOnPage" />
      </PaginationList>
    </Pagination>
  </template>
</template>
