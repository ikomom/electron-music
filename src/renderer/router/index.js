import Vue from 'vue'
import VueRouter from 'vue-router'
import {IS_ELECTRON} from "@/config/environment";

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tray',
    name: 'Tray',
    component: () => import(/* webpackChunkName: "Tray" */'../views/Tray')
  }
]

const router = new VueRouter({
  mode: IS_ELECTRON ? 'hash' : 'history',
  routes
})

export default router
