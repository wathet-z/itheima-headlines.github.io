// 文章相关接口模块
// 1. 导入全局axios配置中导出的请求方式
import { request } from '../utils/request.js'

// 2. 创建接口方法
// @params 表示的请求参数 （必须要说明的项目）
// @return 表示后端响应接口返回回来的值 （如果这个接口返回的数据页面需要进行展示或处理时，需要填写）
/**
 * 说明：通过频道id获取文章列表
 *
 * @params channel_id 频道id
 * @params timestamp 时间戳,请求新的数据
 *
 */
export const getArticles = params => request({
  method: 'GET',
  url: '/v1_0/articles',
  params
})
