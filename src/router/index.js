import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "../views/Login.vue"
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/postwall',
    name: 'postwall',
    component: () => import(/* webpackChunkName: "about" */ '../views/PostWall.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
