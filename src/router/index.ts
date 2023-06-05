import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('../views/RoleView.vue')
  },
  {
    path: '/texture',
    name: 'texture',
    component: () => import('../views/TextureView.vue')
  },
  {
    path: '/type',
    name: 'type',
    component: () => import('../views/TypeView.vue')
  },
  {
    path: '/publisher',
    name: 'publisher',
    component: () => import('../views/PublisherView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
