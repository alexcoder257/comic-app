import { createRouter, createWebHistory } from "vue-router";
const HomePage = () => import("@/views/home/HomePage.vue");
const DetailPage = () => import("@/views/detail/DetailPage.vue");
const ReadPage = () => import("@/views/read/ReadPage.vue");

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "HomePage",
    meta: {
      layout: "default",
    },
  },
  {
    path: "/:id",
    component: DetailPage,
    name: "DetailPage",
    meta: {
      layout: "default",
    },
  },
  {
    path: "/:id/:chapterId",
    component: ReadPage,
    name: "ReadPage",
    meta: {
      layout: "simple",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
