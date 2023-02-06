import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "@/views/Login.vue";
import EntrustArray from "@/views/acceptance/entrustArray.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      alias: "/",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/entrustArray",
          name: "entrustArray",
          component: EntrustArray,
        },
      ],
    },
  ],
});

export default router;
