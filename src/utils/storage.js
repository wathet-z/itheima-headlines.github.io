/*
  封装的本地存储简易操作
*/

// 操作数据 - 增删改查

// 增加、修改本地存储
export const setItem = (key, value) => {
  // key: 存储的键名
  // value: 需要存储的值
  // window.localStorage.setItem(key, JSON.stringify(value))
  // 判断传进来的value是否需要做JSON.stringify的处理
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 查找本地存储
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    // 尝试进行转化，如果成功就返回转化的值
    return JSON.parse(data)
  } catch (error) {
    // 如果不成功，说明data时一个基本数据结构
    return data
  }
}

// 删除本地存储
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
