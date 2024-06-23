<template>
  <RecHeader />
  <main>
    <router-view></router-view>
  </main>
  <RecFooter />
</template>

<style>
html,
body {
  height: 100%;
}

main {
  flex: 1 1 auto;
}
</style>
