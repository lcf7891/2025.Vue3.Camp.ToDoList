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
        @todo-status="emit('patch-todo', $event)"
        @edit-open="editId = $event"
        @edit-cancel="editId = null"
        @edit-save="emit('edit-todo', $event)"
        @del-todo="emit('del-todo', $event)"
      />
      <p class="py-2 text-sm">{{ waitTodos.length }} 個待完成項目</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import TodoItem from './TodoItem.vue'

  const props = defineProps({
    todos: {
      type: Array,
      default: () => []
    }
  })
  const emit = defineEmits(['del-todo', 'edit-todo', 'patch-todo'])
  const editId = ref(null)
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
</script>
