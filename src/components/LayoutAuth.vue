<template>
  <div
    class="container mx-auto flex h-screen flex-col items-center px-8 pt-12 lg:flex-row lg:justify-center lg:p-0"
  >
    <div class="w-full lg:w-[386px]">
      <img
        class="mx-auto mb-4 w-full lg:w-[85%]"
        :src="authLogo"
        alt="todolist logo"
      />
      <img class="hidden lg:block" :src="authLeft" alt="登入與註冊插圖" />
    </div>
    <div class="ml-0 w-full lg:ml-26 lg:w-[304px]">
      <slot />
    </div>
  </div>
</template>
<script setup>
import authLogo from '@/assets/images/authlogo.png'
import authLeft from '@/assets/images/authleft.png'
</script>
