import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'
import Search from '../pages/Search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/details/:slug',
      name: 'details',
      component: Details
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})

export default router
