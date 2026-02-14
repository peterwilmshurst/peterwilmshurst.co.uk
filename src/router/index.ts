import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import { ROUTE_NAMES } from './route-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.HOME,
      component: Home,
      meta: {
        title: 'Home',
      },
    },
  ],
})

export default router
