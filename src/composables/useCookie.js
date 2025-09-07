const name = 'todolist-token'

// export const getToken = () => {
//   const regExp = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*=\\s*([^;]*).*$)|^.*$`)
//   return document.cookie.replace(regExp, '$1')
// }
// export const getToken = () => {
//   const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
//   return match ? match[1] : null
// }
// export const getToken = () => {
//   const cookies = document.cookie.split('; ')
//   const tokenCookie = cookies.find((row) => row.startsWith(name + '='))
//   return tokenCookie ? tokenCookie.split('=')[1] : ''
// }
export const getToken = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)todolist-token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  return token
}
export const setToken = (token, exp) => {
  document.cookie = `${name}=${token}; expires=${exp}; path=/`
}
export const delToken = () => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}
