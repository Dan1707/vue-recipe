import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/view/homeView.vue";
import LetterView from "@/view/letterView.vue";
import ingView from "@/view/ingView.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    name: "Public",
    component: DefaultLayout,
    redirect: "/",
    children: [
      { path: "/", component: HomeView, name: "home" },
      { path: "/by-letter", component: LetterView, name: "by-letter" },
      { path: "/by-ingredient", component: ingView, name: "by-ingredient" },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
