import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/view/home.vue";
import { Dialog } from "@varlet/ui";
const routes = [
  {
    path: "/",
    redirect: "/home",
    meta: { requiresAuth: true }, // 添加此行来标记需要认证
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { requiresAuth: true }, // 添加此行来标记需要认证
  },
  {
    path: "/upload",
    name: "Upload",
    meta: { requiresAuth: true }, // 添加此行来标记需要认证
    component: (/*upload*/) => import("../view/Upload.vue"),
  },
  {
    path: "/share",
    name: "Share",
    meta: { requiresAuth: true }, // 添加此行来标记需要认证
    component: (/*share*/) => import("../view/Share.vue"),
  },
  {
    path: "/user",
    name: "User",
    meta: { requiresAuth: true }, // 添加此行来标记需要认证
    component: (/*user*/) => import("../view/User.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    meta: { requiresAuth: true }, // 添加此行来标记需要认证
    component: (/*detail*/) => import("../view/Detail.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: (/*login*/) => import("../view/Login.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(), //使用hash模式
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否登录
  let isLoggedIn = null;
  // token 没有过期
  if (+localStorage.getItem("token") > Date.now() && localStorage.getItem("token") != null) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  // 检查目标路由是否需要认证
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn) {
    // 如果未登录且目标路由需要认证，则重定向到登录页

    Dialog({
      title: "熊仔提示",
      message: "认证过期,请重新登录",
      closeOnClickOverlay: false,
      confirmButton: true,
      onClosed: function () {
        next("/login");
      },
    });
  } else {
    // 允许导航继续
    next();
  }
});
export default router;
