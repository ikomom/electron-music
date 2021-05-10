import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import BaseLayout from "@/layouts/BaseLayout";
import {recommendRoutes} from "@/router/modules/recommend";
import {IS_ELECTRON} from "@/config/environment";

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: BaseLayout,
    children: [
      ...recommendRoutes,
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About/index.vue')
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
