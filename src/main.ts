import { createApp } from "vue";
import "./assets/style.css";
import { createPinia } from "pinia";
import globalComponents from "./components/";
import App from "./App.vue";
import router from "./router/router.ts";
import { VueQueryPlugin } from "vue-query";

const app = createApp(App);
const pinia = createPinia();

app.use(VueQueryPlugin);
app.use(router);
app.use(globalComponents);
app.use(pinia);
app.mount("#app");
