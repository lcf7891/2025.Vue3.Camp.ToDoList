<template>
  <LayoutAuth>
    <div class="ml-0 w-full lg:ml-26 lg:w-[304px]">
      <h2 class="mb-6 text-center text-2xl font-bold lg:text-left">最實用的線上代辦事項服務</h2>
      <form class="mb-6" @submit.prevent="signIn">
        <InputField
          type="email"
          id="inputEmail"
          label="Email"
          placeholder="請輸入 Email"
          v-model.trim="userData.email"
        />
        <InputField
          type="password"
          id="inputPassword"
          label="密碼"
          placeholder="請輸入密碼"
          v-model.trim="userData.password"
        />
        <div class="text-center">
          <button class="basic-btn btn" type="submit">登入</button>
        </div>
      </form>
      <div class="text-center">
        <RouterLink to="/register" class="btn text-primary hover:text-primary/80 font-bold">
          註冊帳號
        </RouterLink>
      </div>
    </div>
  </LayoutAuth>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import LayoutAuth from '@/components/LayoutAuth.vue'
  import InputField from '@/components/InputField.vue'
  import { apiRequest } from '@/composables/useApi'
  import { setToken, delToken } from '@/composables/useCookie'
  import { setStorage } from '@/composables/useNicknameStorage'
  import { useToastStore } from '@/stores/useToastStore'
  import { useLoadingStore } from '@/stores/useLoadingStore'

  const router = useRouter()
  const toast = useToastStore()
  const loader = useLoadingStore()

  const userData = ref({
    email: '',
    password: ''
  })
  const resetForm = () => {
    userData.value = {
      email: '',
      password: ''
    }
  }

  const signIn = async () => {
    const data = {
      email: userData.value.email,
      password: userData.value.password
    }
    loader.startLoading()
    try {
      const res = await apiRequest('users/sign_in', 'POST', data)
      const { token, exp } = res
      setToken(token, exp)
      setStorage(res.nickname)
      toast.showToast('登入成功', `歡迎回來！ ${res.nickname}`)
      router.push('/todolist')
    } catch (error) {
      toast.showToast('登入失敗', error.message)
      delToken()
    } finally {
      resetForm()
      loader.stopLoading()
    }
  }
</script>
