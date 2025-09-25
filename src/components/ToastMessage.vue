<template>
  <div class="fixed top-6 right-6 z-50" v-if="toasts.length">
    <div
      class="bg-table/80 mb-4 w-[150px] rounded-md text-sm shadow-lg backdrop-blur-md lg:w-[300px]"
      v-for="toast in toasts"
      :key="toast.id"
    >
      <h5 class="border-b-muted text-info border-b p-2">{{ toast.title }}</h5>
      <p class="truncate p-2">{{ toast.content }}</p>
    </div>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useToastStore } from '@/stores/useToastStore'

  const toastStore = useToastStore()
  const { toasts } = storeToRefs(toastStore)
</script>
