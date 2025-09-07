<template>
  <div class="rounded-xl bg-white shadow-xl">
    <ul class="tab-btn-group">
      <li class="w-full">
        <button
          class="btn tab-btn rounded-tl-xl text-sm"
          :class="{ 'tab-btn-active': filterStatus === 'all' }"
          type="button"
          @click="allBtn"
        >
          全部
        </button>
      </li>
      <li class="w-full">
        <button
          class="btn tab-btn text-sm"
          type="button"
          :class="{ 'tab-btn-active': filterStatus === 'wait' }"
          @click="waitBtn"
        >
          待完成
        </button>
      </li>
      <li class="w-full">
        <button
          class="btn tab-btn rounded-tr-xl text-sm"
          :class="{ 'tab-btn-active': filterStatus === 'done' }"
          type="button"
          @click="doneBtn"
        >
          已完成
        </button>
      </li>
    </ul>
    <div class="py-6 pl-6">
      <TodoItem
        v-for="todo in filterTodos"
        :key="todo.id"
        :item="todo"
        :edit-id="editId"
        @todo-status="patchTodo"
        @edit-open="editId = $event"
        @edit-cancel="editId = null"
        @edit-save="updateTodo"
        @del-todo="deleteTodo"
      />
      <p class="py-2 text-sm">{{ waitTodos.length }} 個待完成項目</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import TodoItem from './TodoItem.vue'
  import { apiRequest } from '@/composables/useApi'
  import { useToastStore } from '@/stores/useToastStore'

  const props = defineProps({
    todos: {
      type: Array,
      default: () => []
    }
  })
  const toast = useToastStore()
  const waitTodos = computed(() => {
    return props.todos.filter((todo) => !todo.status)
  })
  const filterStatus = ref('all')
  const filterTodos = computed(() => {
    if (filterStatus.value === 'wait') {
      return waitTodos.value
    }
    if (filterStatus.value === 'done') {
      return props.todos.filter((todo) => todo.status)
    }
    return props.todos
  })
  const waitBtn = () => {
    filterStatus.value = 'wait'
  }
  const doneBtn = () => {
    filterStatus.value = 'done'
  }
  const allBtn = () => {
    filterStatus.value = 'all'
  }
  const editId = ref(null)
  const findTodoIndex = (id) => {
    return filterTodos.value.findIndex((item) => item.id === id)
  }
  const updateTodo = (todo) => {
    const idx = findTodoIndex(todo.id)
    apiRequest(`todos/${todo.id}`, 'PUT', { content: todo.content })
      .then((response) => {
        if (response.status) {
          toast.showToast(response.message, todo.content)
          filterTodos.value[idx].content = todo.content
        }
      })
      .catch((error) => {
        toast.showToast('編輯失敗', error.message)
      })
  }
  const deleteTodo = (id) => {
    const idx = findTodoIndex(id)
    const delTodo = filterTodos.value[idx]
    apiRequest(`todos/${id}`, 'DELETE')
      .then((response) => {
        if (response.status) {
          toast.showToast(response.message, delTodo.content)
          filterTodos.value.splice(idx, 1)
        }
      })
      .catch((error) => {
        toast.showToast('刪除失敗', error.message)
      })
  }
  const patchTodo = (id) => {
    const idx = findTodoIndex(id)
    const todo = filterTodos.value[idx]
    apiRequest(`todos/${id}/toggle`, 'PATCH')
      .then((response) => {
        if (response.status) {
          toast.showToast(response.message, todo.content)
          filterTodos.value[idx].status = !filterTodos.value[idx].status
        }
      })
      .catch((error) => {
        toast.showToast('狀態變更失敗', error.message)
      })
  }
</script>
