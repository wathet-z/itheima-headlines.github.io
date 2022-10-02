// 1. 下载axios - npm i axios
// 2. 在utils找那个创建request.js - axios全局配置模块
// 3. 引入axios
import axios from 'axios'
// 4. 创建基本地址 - axios.create()
// 5. 导出当前定义的 request
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 基础路径
})

export default request
