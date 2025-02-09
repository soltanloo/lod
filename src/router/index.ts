// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/login', component: () => import('../views/LoginForm.vue') },
  { path: '/register', component: () => import('../views/RegisterForm.vue') },
  { path: '/', component: () => import('../views/EnergyStats.vue'), meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  console.log(`Navigating to ${to.path}, isAuthenticated:`, authStore.isAuthenticated)

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
