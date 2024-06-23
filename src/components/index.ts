import { App } from "vue";

import RecHeader from "./header/RecHeader.vue";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import RecSearch from "./search/RecSearch.vue";
import RecLogo from "./header/RecLogo.vue";
import RecNav from "./header/RecNav.vue";
import RecHero from "./hero/RecHero.vue";
import RecRecipes from "./recipes/RecRecipes.vue";
import RecRecipesItem from "./recipes/RecRecipesItem.vue";
import RecInstructions from "./recipes/RecInstructions.vue";
import RecBurger from "./header/RecBurger.vue";
import RecCategories from "./categories/RecCategories.vue";
import RecItemContainer from "./recipes/RecItemContainer.vue";
import RecPagination from "./pagination/RecPagination.vue";
import RecFooter from "./footer/RecFooter.vue";
import RecSearchList from "./searchList/RecSearchList.vue";

interface Component {
  name: string;
  component: any;
}

const components: Component[] = [
  { name: "RecHeader", component: RecHeader },
  { name: "Input", component: Input },
  { name: "Button", component: Button },
  { name: "RecSearch", component: RecSearch },
  { name: "RecLogo", component: RecLogo },
  { name: "RecNav", component: RecNav },
  { name: "RecHero", component: RecHero },
  { name: "RecRecipes", component: RecRecipes },
  { name: "RecRecipesItem", component: RecRecipesItem },
  { name: "RecInstructions", component: RecInstructions },
  { name: "RecBurger", component: RecBurger },
  { name: "RecCategories", component: RecCategories },
  { name: "RecItemContainer", component: RecItemContainer },
  { name: "RecPagination", component: RecPagination },
  { name: "RecFooter", component: RecFooter },
  { name: "RecSearchList", component: RecSearchList },
];

const plugin = {
  install: (app: App<Element>) => {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  },
};

export default plugin;
