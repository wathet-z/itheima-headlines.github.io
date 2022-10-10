// 用户相关接口模块
// 1. 导入全局axios配置中导出的请求方式
import { request } from '../utils/request.js'
// import store from 'store'

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

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => request({
  method: 'GET',
  url: '/v1_0/user'
  // headers: {
  //   // 在 请求接口时,有很多接口都是需要token作为请求头的参数
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})

/**
 * 获取用户频道
 */
export const getUserChannels = () => request({
  method: 'GET',
  url: '/v1_0/user/channels'
})
