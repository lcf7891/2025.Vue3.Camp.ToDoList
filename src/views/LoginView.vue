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
  import InputField from '@/components/InputField.vue'

  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const userData = ref({
    email: '',
    password: ''
  })

  const signIn = async () => {
    const config = {
      url: `${apiUrl}users/sign_in`,
      method: 'POST'
    }

    const result = await axios(config)
    console.log(result)
  }
</script>
<!-- <script setup>
  import { ref } from 'vue'
  import LayoutAuth from '@/components/LayoutAuth.vue'
  import InputField from '@/components/InputField.vue'
  import { apiRequest } from '@/composables/useApi'
  import { setToken, delToken } from '@/composables/useCookie'
  import { setStorage } from '@/composables/useNicknameStorage'
  import { useRouter } from 'vue-router'
  import { useToastStore } from '@/stores/useToastStore'

  const toast = useToastStore()
  const router = useRouter()

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
  const signIn = () => {
    const data = {
      email: userData.value.email,
      password: userData.value.password
    }

    apiRequest('users/sign_in', 'POST', data)
      .then((response) => {
        const { token, exp } = response
        toast.showToast('登入成功', `歡迎回來！ ${response.nickname}`)
        setStorage(response.nickname)
        setToken(token, exp)
        resetForm()
        router.push('/todolist')
      })
      .catch((error) => {
        toast.showToast('登入失敗', error.message)
        delToken()
        resetForm()
      })
  }
</script> -->
