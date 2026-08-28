import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/Home/Portal/index.vue')
        },
        {
          path: 'geology',
          name: 'geology',
          component: () => import('@/views/Home/Geology/index.vue')
        },
        {
          path: 'weather',
          name: 'weather',
          component: () => import('@/views/Home/Weather/index.vue')
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('@/views/Home/News/index.vue')
        }
      ]
    }
  ],
})

export default router
