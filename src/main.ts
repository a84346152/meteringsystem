import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import VueAxios from "vue-axios";

const myAxios = axios.create();

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app
  .use(router)
  .use(ElementPlus)
  .use(VueAxios, myAxios)
  .use(createPinia())
  .mount("#app");
