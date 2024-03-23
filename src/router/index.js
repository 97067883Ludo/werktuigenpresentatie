import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/melken',
      name: 'melken',
      component: () => import('../views/Melken.vue')
    },
    {
      path: '/Aardappel-stokkenrooier',
      name: 'Aardappel-stokkenrooier',
      component: () => import('../views/Aardappel-stokkenrooier.vue')
    },
    {
      path: '/Aardappel-stokkenrooier',
      name: 'Aardappel-stokkenrooier',
      component: () => import('../views/Aardappel-stokkenrooier.vue')
    }
  ]
})

export default router
