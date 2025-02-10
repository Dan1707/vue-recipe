<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface sliderItem {
  path: string;
  title: string;
  titleStyles: string;
}

const sliderArray: sliderItem[] = [
  {
    path: "/public/slider/slider-1.jpg",
    title: "Easy to use",
    titleStyles: "bottom-0 m-10",
  },
  {
    path: "/public/slider/slider-2.jpg",
    title: "Cook with your family",
    titleStyles: "top-0 right-0 m-10",
  },
  {
    path: "/public/slider/slider-3.jpg",
    title: "Discover new recipes",
    titleStyles:
      "left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] m-0 p-0 text-center",
  },
];
</script>

<template>
  <section class="bg-primary max-w-full">
    <div class="container">
      <div>
        <h2 class="title">Welcome to your online recipe book!</h2>
        <p class="secondary-text">Here you can find any dish you want</p>
      </div>

      <Carousel
        class="max-w-5xl m-auto mt-10 desktop:max-w-4xl tablet:max-w-full"
      >
        <div class="rounded-lg overflow-hidden">
          <CarouselContent class="w-full m-auto laptop:mb-10">
            <CarouselItem
              class="bg-cover h-[380px] tablet:h-[270px] overflow-hidden w-full relative p-0 rounded-lg"
              v-for="slider in sliderArray"
              :key="slider.path"
              :style="{ 'background-image': `url('${slider.path}')` }"
            >
              <div class="absolute inset-0 bg-dark opacity-40"></div>
              <div class="p-10 relative w-full min-h-full">
                <h2
                  :class="`${slider.titleStyles} absolute font-title text-6xl laptop:text-5xl tablet:text-4xl text-light font-medium`"
                >
                  {{ slider.title }}
                </h2>
              </div>
            </CarouselItem>
          </CarouselContent>
        </div>
        <div
          class="laptop:absolute laptop:left-[50%] laptop:translate-x-[-50%] tablet:hidden"
        >
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  </section>
</template>
