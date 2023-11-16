import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      requiresAuth: false,
      title: "Login",
    },
  },
  {
    path: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    name: "Dashboard",
    meta: {
      requiresAuth: true,
      title: "Panel",
    },
  },
  {
    path: "/authors",
    component: () =>
      import(/* webpackChunkName: "authors" */ "../views/Authors.vue"),
    name: "Authors",
    meta: {
      requiresAuth: true,
      title: "Autores",
    },
  },
  {
    path: "/genders",
    component: () =>
      import(/* webpackChunkName: "genders" */ "../views/Genders.vue"),
    name: "Genders",
    meta: {
      requiresAuth: true,
      title: "Géneros",
    },
  },
  {
    path: "/loans",
    component: () =>
      import(/* webpackChunkName: "loans" */ "../views/Loans.vue"),
    name: "Loans",
    meta: {
      requiresAuth: true,
      title: "Préstamos",
    },
  },
  {
    path: "/borrowers",
    component: () =>
      import(/* webpackChunkName: "borrowers" */ "../views/Borrowers.vue"),
    name: "Borrowers",
    meta: {
      requiresAuth: true,
      title: "Prestatarios",
    },
  },
  {
    path: "/profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    name: "profile",
    meta: {
      requiresAuth: true,
      title: "Perfil",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

async function isAuth() {
  return await store.getters.auth;
}

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} - ${process.env.VUE_APP_NAME}`;
  if (to.meta.requiresAuth) {
    if (await isAuth()) {
      next();
    } else {
      next("/");
    }
  } else {
    if (to.path == "/" && Object.keys(from.meta).length == 0) {
      if (await isAuth()) {
        console.log("no auth");
        next("/dashboard");
      }
    }
    next();
  }
});

export default router;
