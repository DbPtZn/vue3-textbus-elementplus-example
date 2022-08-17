import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "page",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Page.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
