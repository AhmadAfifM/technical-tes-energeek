import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "applypages.index",
    component: () => import("../views/ApplyPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
