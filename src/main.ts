import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import axios from "axios";
import VueAxios from "vue-axios";

const myAxios = axios.create();

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app
  .use(router)
  .use(ElementPlus)
  .use(VueAxios, myAxios)
  .use(createPinia())
  .mount("#app");
