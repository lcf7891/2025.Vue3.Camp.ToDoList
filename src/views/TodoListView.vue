<template>
  <div class="min-h-screen lg:bg-linear-[175deg,#FFD370_60%,#fff_40%]">
    <nav class="flex items-center justify-between px-8 py-4 lg:mb-6">
      <RouterLink to="/">
        <img src="@/assets/images/logo.png" alt="todolist logo" />
      </RouterLink>
      <ul class="flex items-center">
        <li class="mr-6 hidden lg:inline-block">
          <span class="font-bold">{{ userName }}</span>
        </li>
        <li class="hover:text-primary/80 hover:border-primary/80 border-b border-transparent">
          <button class="btn" type="button" @click="signOut">登出</button>
        </li>
      </ul>
    </nav>
    <main class="container mx-auto flex justify-center px-9 pb-9">
      <div class="w-125">
        <form class="mb-4 flex rounded-lg bg-white p-1 shadow-xl" @submit.prevent="addTodo">
          <input
            class="w-full px-3 py-2 focus:outline-0"
            type="text"
            placeholder="新增待辦事項"
            v-model="userTodo"
          />
          <button
            class="btn bg-primary hover:bg-primary/80 material-symbols-outlined h-10 w-10 rounded-xl text-white"
            type="submit"
          >
            add
          </button>
        </form>
        <TodoList
          v-if="todoData.length > 0"
          :todos="todoData"
          @patch-todo="todoStatus"
          @del-todo="delTodo"
          @edit-todo="editTodo"
        />
        <div class="flex flex-col items-center justify-center p-11" v-else>
          <p class="mb-4">目前尚無待辦事項</p>
          <img class="w-full" src="/src/assets/images/empty.png" alt="empty img" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import TodoList from '@/components/TodoList.vue'
  import { apiRequest } from '@/composables/useApi'
  import { useToastStore } from '@/stores/useToastStore'
  import { delToken } from '@/composables/useCookie'
  import { getStorage, delStorage } from '@/composables/useNicknameStorage'

  const router = useRouter()
  const userName = ref(getStorage())
  const toast = useToastStore()
  const userTodo = ref('')
  const todoData = ref([])
  const findTodoIndex = (id) => {
    return todoData.value.findIndex((item) => item.id === id)
  }

  const signOut = () => {
    const name = userName.value
    apiRequest('users/sign_out', 'POST')
      .then((res) => {
        toast.showToast(res.message, `期待您再次回來！ ${name}`)
        delStorage()
        delToken()
        router.push('/')
      })
      .catch((error) => {
        toast.showToast('登出失敗', error.message)
      })
  }

  const addTodo = () => {
    const todo = userTodo.value.trim()
    if (!todo) {
      toast.showToast('新增失敗', '請輸入待辦事項')
      return
    }
    apiRequest('todos/', 'POST', { content: todo })
      .then((res) => {
        if (res.status) {
          toast.showToast('新增成功', res.newTodo.content)
          todoData.value.push(res.newTodo)
          userTodo.value = ''
        }
      })
      .catch((error) => {
        toast.showToast(error.message, todo)
        userTodo.value = ''
      })
  }

  const todoStatus = (id) => {
    const idx = findTodoIndex(id)
    const item = todoData.value[idx]
    apiRequest(`todos/${id}/toggle`, 'PATCH')
      .then((res) => {
        if (res.status) {
          toast.showToast(res.message, item.content)
          todoData.value[idx].status = !todoData.value[idx].status
        }
      })
      .catch((error) => {
        toast.showToast('狀態變更失敗', error.message)
      })
  }

  const editTodo = (todo) => {
    const idx = findTodoIndex(todo.id)
    apiRequest(`todos/${todo.id}`, 'PUT', { content: todo.content })
      .then((res) => {
        if (res.status) {
          toast.showToast(res.message, todo.content)
          todoData.value[idx].content = todo.content
        }
      })
      .catch((error) => {
        toast.showToast('編輯失敗', error.message)
      })
  }

  const delTodo = (id) => {
    const idx = findTodoIndex(id)
    const delTodo = todoData.value[idx]
    apiRequest(`todos/${id}`, 'DELETE')
      .then((res) => {
        if (res.status) {
          toast.showToast(res.message, delTodo.content)
          todoData.value.splice(idx, 1)
        }
      })
      .catch((error) => {
        toast.showToast('刪除失敗', error.message)
      })
  }

  onMounted(async () => {
    try {
      const result = await apiRequest('todos/')
      if (result) {
        todoData.value = result.data
      }
    } catch (error) {
      toast.showToast('請求失敗', error.message)
    }
  })
</script>
