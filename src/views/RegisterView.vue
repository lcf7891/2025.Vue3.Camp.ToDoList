<template>
  <LayoutAuth>
    <div class="ml-0 w-full lg:ml-26 lg:w-[304px]">
      <h2 class="mb-6 text-center text-2xl font-bold lg:text-left">註冊帳號</h2>
      <form class="mb-6" @submit.prevent="signUp">
        <InputField
          type="email"
          id="inputEmail"
          label="Email"
          placeholder="請輸入 Email"
          v-model.trim="userData.email"
        />
        <InputField
          type="text"
          id="inputNick"
          label="您的暱稱"
          placeholder="請輸入您的暱稱"
          v-model.trim="userData.nickName"
        />
        <InputField
          type="password"
          id="inputPassword"
          label="密碼"
          placeholder="請輸入密碼"
          v-model.trim="userData.password"
        />
        <InputField
          class="mb-3 lg:mb-6"
          type="password"
          id="inputConfirmPassword"
          label="再次輸入密碼"
          placeholder="請輸入再次輸入密碼"
          v-model.trim="userData.confirmPassword"
        />
        <div class="text-center">
          <button class="basic-btn btn" type="submit">註冊帳號</button>
        </div>
      </form>
      <div class="text-center">
        <RouterLink to="/" class="btn text-primary hover:text-primary/80 font-bold">
          登入
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
  import { useToastStore } from '@/stores/useToastStore'

  const toast = useToastStore()
  const router = useRouter()

  const userData = ref({
    email: '',
    nickName: '',
    password: '',
    confirmPassword: ''
  })
  const resetForm = () => {
    userData.value = {
      email: '',
      nickName: '',
      password: '',
      confirmPassword: ''
    }
  }

  const signUp = () => {
    if (userData.value.password !== userData.value.confirmPassword) {
      toast.showToast('註冊失敗', '密碼與確認密碼不符')
      resetForm()
      return
    }
    const data = {
      email: userData.value.email,
      password: userData.value.password,
      nickname: userData.value.nickName
    }

    apiRequest('users/sign_up', 'POST', data)
      .then((res) => {
        if (res.status) {
          toast.showToast('註冊成功', res.uid)
          resetForm()
          router.push('/')
        }
      })
      .catch((error) => {
        toast.showToast('註冊失敗', error.message)
        resetForm()
      })
  }
</script>
