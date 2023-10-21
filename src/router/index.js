import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../components/Dashboard.vue'),
    name: 'Dashboard'
  },
  {
    path: '/authors',
    component: () => import(/* webpackChunkName: "authors" */ '../components/Authors.vue'),
    name: 'Authors'
  },
  {
    path: '/genders',
    component: () => import(/* webpackChunkName: "genders" */ '../components/Genders.vue'),
    name: 'Genders'
  },
  {
    path: '/loans',
    component: () => import(/* webpackChunkName: "loans" */ '../components/Loans.vue'),
    name: 'Loans'
  },
  {
    path: '/borrowers',
    component: () => import(/* webpackChunkName: "borrowers" */ '../components/Borrowers.vue'),
    name: 'Borrowers'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch("getUser");
  if (to.fullPath !== '/' && !store.state.auth) {
    next('/');
  }
  next();
});

export default router
