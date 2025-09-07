const name = 'todolistToken'

export const getToken = () => {
  const regExp = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*=\\s*([^;]*).*$)|^.*$`)
  return document.cookie.replace(regExp, '$1')
}
export const setToken = (token, exp) => {
  document.cookie = `${name}=${token}; expires=${exp}; path=/`
}
export const delToken = () => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}
