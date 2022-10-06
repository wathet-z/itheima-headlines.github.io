// 统一接口的出口文件
// 1. 引入子模块api接口
import { login, getSmsCode } from './user.js'

// 2. 统一导出
export const loginAPI = login
export const getSmsCodeAPI = getSmsCode
