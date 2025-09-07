import { createRouter, createWebHashHistory } from 'vue-router'
// import { getToken } from '@/composables/useCookie'

const routes = [
  {
    path: '/',
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
      title: '待辦事項清單'
      // requiresAuth: true
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

// router.beforeEach((to, from, next) => {
//   const token = getToken()

//   if (to.meta.requiresAuth && !token) {
//     next('/login') // 未登入導向 login
//   } else if ((to.path === '/login' || to.path === '/register') && token) {
//     next('/todolist') // 已登入直接到至 todoList
//   } else {
//     next() // 通過驗證
//   }
// })

export default router
