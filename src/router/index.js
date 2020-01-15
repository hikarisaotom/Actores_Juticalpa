import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/organizaciones',
    name: 'organizaciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/Organizaciones.vue')
  },
  {
    path: '/noticias',
    name: 'noticias',
    component: () => import('../views/Noticias.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
