<template>
  <router-link :to="{ name: 'home' }">
    <div
      class="header-logo desktop:text-xl text-dark-foreground text-3xl flex justify-center items-center gap-3"
    >
      <div
        class="w-[70px] h-[70px] desktop:w-[50px] desktop:h-[50px] rounded-xl bg-dark overflow-hidden"
      >
        <img
          src="https://cdn.logojoy.com/wp-content/uploads/20231030115114/cooking-logo-featured-image.png"
          alt="logo"
        />
      </div>
      <h1 class="font-semibold font-title">Vue-recipe</h1>
    </div>
  </router-link>
</template>
