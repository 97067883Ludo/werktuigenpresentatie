import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue')
    },
    {
      path: "/admin/post/:id",
      name: "adminId",
      component: () => import('../views/AdminId.vue')
    },
    {
      path: '/admin/post',
      name: "adminPost",
      component: () => import('../views/post/index.vue')
    },
    {
      path: '/admin/categories',
      name: "Categories",
      component: () => import('../views/Categories/index.vue')
    },
    {
      path: '/admin/categories/:id',
      name: "categories",
      component: () => import('../views/Categories/detail.vue')
    }
  ]
})

export default router
