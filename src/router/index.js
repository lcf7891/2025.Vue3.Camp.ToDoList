import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '@/composables/useCookie'
import { apiRequest } from '@/composables/useApi'
import { useToastStore } from '@/stores/useToastStore'

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: '導航頁'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: '首頁'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      title: '註冊'
    }
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: () => import('../views/TodoListView.vue'),
    meta: {
      title: '待辦事項清單',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '找不到頁面'
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '我的待辦清單'
  next()
})

router.beforeEach(async (to) => {
  const toast = useToastStore()
  const token = getToken()

  // 未登入 → 禁止進入受保護頁面
  if (to.meta.requiresAuth && !token) {
    return { name: 'Login' }
  }

  // 已登入 → 禁止進入登入頁
  if (token && to.name === 'Login') {
    return { name: 'TodoList' }
  }

  // 若需要驗證 token 是否有效
  if (to.meta.requiresAuth && token) {
    try {
      const result = await apiRequest('users/checkout')
      if (!result.status) {
        toast.showToast('Token 驗證失敗', '請重新登入')
        return { name: 'Login' }
      }
    } catch (error) {
      toast.showToast('Token 驗證失敗', error.message)
      return { name: 'Login' }
    }
  }

  return true
})

export default router
