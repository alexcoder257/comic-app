import { createRouter, createWebHistory } from "vue-router";
const HomePage = () => import("@/views/home/HomePage.vue");
const DetailPage = () => import("@/views/detail/DetailPage.vue");
const ReadPage = () => import("@/views/read/ReadPage.vue");
const GenrePage = () => import("@/views/genres/GenrePage.vue");
const HistoryPage = () => import("@/views/history/HistoryPage.vue");
const ErrorPage = () => import("@/views/error/ErrorPage.vue");

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
    path: "/detail/:id",
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
  {
    path: "/genres/:genreId",
    component: GenrePage,
    name: "GenrePage",
    meta: {
      layout: "default",
    },
  },
  {
    path: "/history",
    component: HistoryPage,
    name: "History",
    meta: {
      layout: "default",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
    name: "not-found",
    meta: {
      layout: "default",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
