import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Contacts from '../pages/Contacts.vue'
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
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
