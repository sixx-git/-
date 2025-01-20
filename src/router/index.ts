import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home.vue')
      }
    ]
  }
]

const router = createRouter({
  // 改用 hash 模式
  history: createWebHashHistory(),
  routes
})

export default router 