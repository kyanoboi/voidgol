import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/Home/homePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: HomePage }],
})

export default router
