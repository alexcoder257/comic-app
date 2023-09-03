import { createRouter, createWebHistory } from "vue-router";
const HomePage = () => import("@/views/home/HomePage.vue");
const AboutPage = () => import("@/views/about/AboutPage.vue");

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
    path: "/about",
    component: AboutPage,
    name: "AboutPage",
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
