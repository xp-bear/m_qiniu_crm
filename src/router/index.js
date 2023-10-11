import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/view/home.vue";
const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import("../view/upload.vue"),
  },
  {
    path: "/share",
    name: "Share",
    component: () => import("../view/share.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../view/user.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../view/Detail.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(), //使用hash模式
  routes,
});

export default router;
