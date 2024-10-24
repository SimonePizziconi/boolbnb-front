import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'
import Search from '../pages/Search.vue'
import Error404 from '@/pages/Error404.vue';
import Error500 from '@/pages/Error500.vue';

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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error404',
      component: Error404
    },
    {
      path: '/500',
      name: 'Error500',
      component: Error500
    },
  ]
})

export default router
