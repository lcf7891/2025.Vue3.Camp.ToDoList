import { createRouter, createWebHashHistory } from 'vue-router'

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

export default router
