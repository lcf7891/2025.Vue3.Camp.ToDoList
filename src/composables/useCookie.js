const name = 'todolistToken'

export const getToken = () => {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? match[1] : null
}
export const setToken = (token, exp) => {
  document.cookie = `${name}=${token}; expires=${exp}; path=/`
}
export const delToken = () => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}
