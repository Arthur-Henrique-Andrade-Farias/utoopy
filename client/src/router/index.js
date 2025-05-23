// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Plans from '@/pages/Plans.vue'
import Home from '@/pages/Home.vue'
import ForgotPassword from '@/pages/ForgotPass.vue'
import ConfirmCode from '@/pages/ConfirmCode.vue'
import ChangePassword from '@/pages/ChangePass.vue'

const routes = [
  {
    path: '/',
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword // Seu componente da primeira etapa
  },
  {
    path: '/confirm-code/:email', // Aceita o email como parâmetro
    name: 'ConfirmCode',
    component: ConfirmCode,
    props: true // Permite que route.params seja passado como props para o componente
  },
  {
    path: '/change-password/:email/:code', // Aceita email e código
    name: 'ChangePassword',
    component: ChangePassword,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
