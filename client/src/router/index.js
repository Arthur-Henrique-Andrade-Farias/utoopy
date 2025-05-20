// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Plans from '@/pages/Plans.vue'
import Home from '@/pages/Home.vue'
import ForgotPass from '@/pages/ForgotPass.vue'
import ConfirmCode from '@/pages/ConfirmCode.vue'
import ChangePass from '@/pages/ChangePass.vue'

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
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
    {
    path: '/forgotPass',
    name: 'ForgotPass',
    component: ForgotPass
  },
    {
    path: '/confirmCode',
    name: 'ConfirmCode',
    component: ConfirmCode
  },
      {
    path: '/changePass',
    name: 'ChangePass',
    component: ChangePass
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
