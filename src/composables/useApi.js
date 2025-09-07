import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiSignIn = async (data) => {
  try {
    const config = {
      url: 'users/sign_in',
      method: 'POST'
    }

    if (data) {
      if (config.method.toUpperCase() === 'GET') {
        config.params = data
      } else {
        config.data = data
      }
    }

    const response = await api(config)
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || '請求失敗'
    throw new Error(message)
  }
}
