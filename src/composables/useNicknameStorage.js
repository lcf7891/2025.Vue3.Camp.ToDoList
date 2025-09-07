const name = 'nickname'

export const getStorage = () => {
  return localStorage.getItem(name)
}

export const setStorage = (nickname) => {
  localStorage.setItem(name, nickname)
}

export const delStorage = () => {
  localStorage.removeItem(name)
}
