// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Plans from '@/pages/Plans.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
