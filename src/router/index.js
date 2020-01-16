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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/organization',
    name: 'organization',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Organization.vue')
  },
  {
    path: '/organizaciones',
    name: 'organizaciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/Organizaciones.vue')
  },
  {
    path: '/organizacion',
    name: 'organizacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Organizacion.vue')
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
