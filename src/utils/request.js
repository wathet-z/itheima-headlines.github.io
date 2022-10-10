// 1. 下载axios - npm i axios
// 2. 在utils中创建request.js - axios全局配置模块
// 3. 引入axios
import store from '../store/index.js'
import axios from 'axios'

// 4. 创建基本地址 - axios.create()
// 5. 导出当前定义的request
export const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 通过请求拦截器为接口添加公共请求头
request.interceptors.request.use(config => {
  // 统一插入token请求头
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  // console.log(config)
  return config
})
