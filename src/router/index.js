import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Details from '../pages/Details.vue'
import Login from '../pages/Login.vue'

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
      path: '/details/:slug',
      name: 'details',
      component: Details
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
