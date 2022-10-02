// 用户相关接口模块
// 1. 导入全局axios配置导出请求方式
import { request } from '../utils/request.js'

// 创建接口方法

// @params 表示的请求参数(必要的说明项目)
// @return 表示后端接口返回的值(如果这个接口返回的数据页面需要进行展示和处理时, 需要填写)

/**
 * 说明: 用户登录
 *
 * @params userName 用户名 String
 * @params password 密码   String
 *
 * @return userInfo 用户登录信息 Object
 */
export const login = data => request({
  method: 'POST',
  url: 'login',
  data
})
