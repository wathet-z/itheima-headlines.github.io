// 用户相关接口模块
// 1. 导入全局axios配置中导出的请求方式
import { request } from '../utils/request.js'

// 2. 创建接口方法
// @params 表示的请求参数 （必须要说明的项目）
// @return 表示后端响应接口返回回来的值 （如果这个接口返回的数据页面需要进行展示或处理时，需要填写）
/**
 * 说明：用户登录
 *
 * @params mobile 手机号   String
 * @params code 短信验证码  String
 *
 * @return userInfo 用户登录信息 Object
 */
export const login = data => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})

/**
 * 发送验证码
 * @params mobile 手机号   String
 */
export const getSmsCode = mobile => request({
  method: 'GET',
  url: `/v1_0/sms/codes/${mobile}`
})
