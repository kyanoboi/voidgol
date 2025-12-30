import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: () => import('@/pages/Home/indexPage.vue') },
    { path: '/threejs', component: () => import('@/pages/ThreeJS/indexPage.vue') },
    { path: '/webgl', component: () => import('@/pages/WebGL/indexPage.vue') },
    {
      path: '/:pathMatch(.*)*',
      name: '404NotFound',
      component: () => import('@/components/layout/NotFound.vue'),
    },
  ],
})

export default router
