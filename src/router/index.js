import { createRouter, createWebHashHistory } from 'vue-router'
import { checkAuth } from '@/composables/useApi'
import { getToken } from '@/composables/useCookie'
import { setStorage, getStorage } from '@/composables/useNicknameStorage'
import { useToastStore } from '@/stores/useToastStore'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: '首頁'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      title: '註冊'
    }
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: () => import('@/views/TodoListView.vue'),
    meta: {
      title: '待辦事項清單',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '找不到頁面'
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || '我的待辦清單'
  const toast = useToastStore()
  const token = getToken()
  const nickname = getStorage()

  if (!to.meta.requiresAuth) {
    return next()
  }

  if (token && nickname) {
    return next()
  }

  try {
    const res = await checkAuth()
    setStorage(res.data.nickname)
    return next()
  } catch (error) {
    const message = error?.message || '驗證已過期，請重新登入'
    toast.showToast('證已過期', message)
    return next('/login')
  }
})

export default router
