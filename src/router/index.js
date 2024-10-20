import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Details from '../pages/Details.vue'
import Login from '../pages/Login.vue'
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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})

export default router
