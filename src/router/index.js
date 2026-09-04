import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: {
        name: 'index'
      },
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/Home/Portal/index.vue')
        },
        {
          path: 'geology',
          name: 'geology',
          redirect: {
            name: 'catalog'
          },
          component: () => import('@/views/Home/Geology/index.vue'),
          children: [
            {
              path: 'catalog',
              name: 'catalog',
              component: () => import('@/views/Home/Geology/Catalog/index.vue')
            },
            {
              path: 'upload',
              name: 'upload',
              component: () => import('@/views/Home/Geology/Upload/index.vue')
            }
          ]
        },
        {
          path: 'earthquake',
          name: 'earthquake',
          component: () => import('@/views/Home/Earthquake/index.vue')
        },
        {
          path: 'weather',
          name: 'weather',
          component: () => import('@/views/Home/Weather/index.vue')
        },
        {
          path: "theme",
          name: "theme",
          component: () => import('@/views/Home/Theme/index.vue')
        },
        {
          path: 'help',
          name: 'help',
          component: () => import('@/views/Home/Help/index.vue'),
          redirect: '/help/news',
          children: [
            {
              path: 'news',
              name: 'news',
              component: () => import('@/views/Home/Help/News/index.vue')
            },
            {
              path: 'service',
              name: 'service',
              component: () => import('@/views/Home/Help/Service/index.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register/index.vue')
    }
  ],
})

export default router
