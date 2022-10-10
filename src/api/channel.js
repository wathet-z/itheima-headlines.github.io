// 频道相关接口模块
// 1. 导入全局axios配置中导出的请求方式
import { request } from '../utils/request.js'

// 2. 创建接口方法
// @params 表示的请求参数 （必须要说明的项目）
// @return 表示后端响应接口返回回来的值 （如果这个接口返回的数据页面需要进行展示或处理时，需要填写）
/**
 * 获取全部频道
 */
export const getAllChannels = () => request({
  method: 'GET',
  url: '/v1_0/channels'
})

/**
 * 添加频道
 *
 * @params id  频道id
 * @params seq 添加频道的排列序号  list.length
 */
export const addUSerChannel = channel => request({
  method: 'PATCH',
  url: 'v1_0/user/channels',
  data: {
    channels: [channel]
  }
})

/**
 * 删除
 *
 * @params channelId  频道id
 */
export const deleteUserChannel = channelId => request({
  method: 'DELETE',
  url: `/v1_0/user/channels/${channelId}`
})
