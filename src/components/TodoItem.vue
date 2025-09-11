<template>
  <div class="group mb-4 flex items-center">
    <div class="border-tabele mr-4 flex w-full items-center border-b pb-4">
      <input
        class="border-muted checked:bg-no-repea mr-4 h-[20px] min-w-[20px] appearance-none rounded-sm border bg-white checked:border-white checked:[background-image:url('/src/assets/images/vector.png')] checked:bg-center"
        type="checkbox"
        :checked="item.status"
        @click="todoStatus"
      />
      <div class="flex w-full items-center" v-if="isEditing">
        <input
          type="text"
          :placeholder="item.content"
          class="bg-table text-primary flex-1 py-1 text-sm transition-all duration-300 focus:outline-none"
          v-model="editTodo"
          @keyup.enter="editSave(item.id)"
          @keyup.esc="editCancel"
        />
        <button
          class="material-symbols-outlined btn rounded-l-sm p-1 text-sm transition-all duration-300 group-hover:translate-x-0 hover:scale-110"
          type="button"
          @click="editCancel"
        >
          block
        </button>
        <button
          class="material-symbols-outlined btn rounded-r-sm p-1 text-sm transition-all duration-300 group-hover:translate-x-0 hover:scale-110"
          type="button"
          @click="editSave(item.id)"
        >
          save
        </button>
      </div>
      <div class="w-full truncate" :class="{ 'text-muted line-through': item.status }" v-else>
        {{ item.content }}
      </div>
      <button
        class="btn mx-0.5 rounded-sm p-1 text-sm opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hover:scale-110"
        type="button"
        :class="editClass"
        @click="editOpen(item.id)"
      >
        edit_note
      </button>
    </div>
    <button
      class="material-symbols-outlined mr-4 mb-4 cursor-pointer opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hover:scale-110"
      type="button"
      @click="delTodo(item.id)"
    >
      close
    </button>
  </div>
</template>

<script setup>
  import { useToastStore } from '@/stores/useToastStore'
  import { ref, computed } from 'vue'

  const props = defineProps({
    item: Object,
    editId: String
  })
  const emit = defineEmits(['todo-status', 'edit-open', 'edit-cancel', 'edit-save', 'del-todo'])
  const toast = useToastStore()
  const editTodo = ref('')
  const isEditing = computed(() => props.editId === props.item.id)
  const editClass = computed(() => ({
    'material-symbols-outlined': !isEditing.value,
    hidden: isEditing.value
  }))

  const todoStatus = () => {
    emit('todo-status', props.item.id)
  }
  const editOpen = (id) => {
    emit('edit-open', id)
  }
  const editCancel = () => {
    emit('edit-cancel', null)
    editTodo.value = ''
  }
  const editSave = (id) => {
    const newTodo = editTodo.value.trim()
    if (newTodo) {
      const upData = {
        id,
        content: newTodo
      }
      emit('edit-cancel', null)
      emit('edit-save', upData)
      editTodo.value = ''
    } else {
      toast.showToast('變更事項內容失敗', '請輸入要更改的內容')
    }
  }
  const delTodo = (id) => {
    emit('del-todo', id)
  }
</script>
