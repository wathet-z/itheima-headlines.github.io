// 统一接口的出口文件
// 1. 引入子模块api接口
import { login, getSmsCode, getUserInfo, getUserChannels } from './user.js'
import { getArticles } from './article'
import { getAllChannels, addUSerChannel, deleteUserChannel } from './channel.js'

// 2. 统一导出
export const loginAPI = login
export const getSmsCodeAPI = getSmsCode
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticlesAPI = getArticles
export const getAllChannelsAPI = getAllChannels
export const addUSerChannelAPI = addUSerChannel
export const deleteUserChannelAPI = deleteUserChannel
