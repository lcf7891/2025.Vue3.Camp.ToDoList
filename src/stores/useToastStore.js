import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  const showToast = (title, content) => {
    const msg = {
      id: Date.now(),
      title,
      content
    }
    toasts.value.push(msg)
    setTimeout(() => {
      toasts.value.shift()
    }, 3000)
  }

  return {
    toasts,
    showToast
  }
})
