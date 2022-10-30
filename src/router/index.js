import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "login" */ '../components/Dashboard.vue'),
    name: 'Dashboard'
  },
  {
    path: '/authors',
    component: () => import(/* webpackChunkName: "login" */ '../components/Authors.vue'),
    name: 'Authors'
  },
  {
    path: '/genders',
    component: () => import(/* webpackChunkName: "login" */ '../components/Genders.vue'),
    name: 'Genders'
  },
  {
    path: '/loans',
    component: () => import(/* webpackChunkName: "login" */ '../components/Loans.vue'),
    name: 'Loans'
  }
]

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
