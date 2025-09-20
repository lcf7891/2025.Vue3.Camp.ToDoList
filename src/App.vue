<template>
  <RouterView />
  <ToastMessage />
  <LoadingSpinner v-if="isLoading" />
</template>

<script setup>
  import ToastMessage from './components/ToastMessage.vue'
  import LoadingSpinner from './components/LoadingSpinner.vue'
  import { useLoadingStore } from './stores/useLoadingStore'

  const loader = useLoadingStore()
</script>
