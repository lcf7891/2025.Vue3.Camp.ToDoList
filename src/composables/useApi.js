import axios from 'axios'
import { getToken } from './useCookie'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})
api.interceptors.request.use((config) => {
  const token = getToken()
  console.log('getToken', token)
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
export const apiRequest = async (url, method, data) => {
  try {
    const config = {
      url,
      method
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
    const message = error?.response?.data?.message || error?.message || '請求失敗'
    throw new Error(message)
  }
}
