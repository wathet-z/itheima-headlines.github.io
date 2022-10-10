<template>
  <div class="channel_edit_container">
    <!-- 我的频道和编辑 -->
    <van-cell title="我的频道">
        <template #default>
                <van-button
                    plain
                    type="danger"
                    round size="mini"
                    class="edit_btn"
                    @click="isEditShow = !isEditShow"
                >{{ isEditShow ? '完成' : '编辑' }}</van-button>
        </template>
    </van-cell>

    <!-- 我的频道选项 -->
    <van-grid :gutter="10" style="margin-top: 10px">
        <van-grid-item
            v-for="(myChannel,index) in channels"
            :key="index"
            class="grid-item-edit"
            @click="onMyChannelClickFn(index, myChannel.id)"
        >
             <template #icon>
                <van-icon name="close" v-show="isEditShow && index !== 0"/>
             </template>
             <template #text>
                <span class="text" :class="{ active: active === index }">{{ myChannel.name }}</span>
            </template>
        </van-grid-item>

    </van-grid>

    <!-- 频道推荐标题 -->
    <van-cell title="频道推荐" style="margin-top: 20px"></van-cell>

    <!-- 频道推荐选项 -->
    <van-grid :gutter="10" style="margin-top: 10px">
        <van-grid-item
            v-for="(channel,index) in recommendChannels"
            :key="index"
            :text="channel.name"
            class="grid-item-plus" icon="plus"
            @click="addChannelFn(channel)"
        />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelsAPI, addUSerChannelAPI, deleteUserChannelAPI } from '../../../api/index.js'
import { setItem } from '../../../utils/storage.js'
export default {
  name: 'channelEdit',
  props: {
    channels: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道列表
      channelsClone: this.channels, // 克隆一份父组件传过来的数据用作修改
      isEditShow: false // 编辑完成按钮展示的状态

    }
  },
  //   通过计算属性来计算频道
  computed: {
    // 推荐频道
    recommendChannels () {
    //   // 通过过滤来实现减法操作
    //   const resList = this.allChannels.filter(obj => {
    //     // 判断当前的obj元素是否存在于我的频道数组中,如果存在,则返回false,如不存在则返回true
    //     const findIndex = this.channels.findIndex(myChannel => {
    //       return myChannel.id === obj.id
    //     })

      //     // findIndex 如果为 -1 则表示为不存在于我的频道

      //     return findIndex === -1
      //   })
      //   return resList

      // 通过lodash工具来计算
      return [...this.$_.differenceBy(this.allChannels, this.channels, 'id')]
    }
  },
  created () {
    // 获取到所有频道
    this.loadGetAllChannelsFn()
  },
  methods: {
    // 获取所有频道接口
    async loadGetAllChannelsFn () {
      try {
        const { data: res } = await getAllChannelsAPI()
        this.allChannels = res.data.channels
        // console.log(this.allChannels)
      } catch (error) {
        console.log(error)
      }
    },
    // 添加频道 到 我的频道
    addChannelFn (channel) {
      this.channelsClone.push(channel)

      // 数据持久化
      // 通过用户信息的token来判断是否已登录
      if (this.$store.state.user.token) {
        // 已登录
        this.addChannels(channel)
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },

    // 我的频道的小方块的功能
    onMyChannelClickFn (index, id) {
      if (this.isEditShow) {
        // 编辑状态 - 进行移除操作
        // 1. 推荐禁止删除
        if (index !== 0) this.channelsClone.splice(index, 1)
        // 2. 判断当前删除的索引位置,如果小于等于当前高亮额频道索引,则active - 1
        if (index <= this.active) this.$emit('checkChannel', this.active - 1, true)

        // 数据持久化
        // 通过用户信息的token来判断是否已登录
        if (this.$store.state.user.token) {
        // 已登录
          this.delChannel(id)
        } else {
        // 未登录
          setItem('TOUTIAO_CHANNELS', this.channels)
        }
      } else {
        // 完成状态 - 进行切换操作
        // 子父组件间的通信
        this.$emit('checkChannel', index)
      }
    },

    // 添加
    async addChannels (channel) {
      try {
        await addUSerChannelAPI({
          id: channel.id,
          seq: this.channels.length - 1
        })
        this.$toast.success('添加成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('添加失败')
      }
    },
    // 删除
    async delChannel (channelId) {
      try {
        await deleteUserChannelAPI(channelId)
        this.$toast.success('删除成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('删除成功')
      }
    }
  }

}
</script>

<style scoped lang="less">
    .channel_edit_container {
            /deep/ .edit_btn {
                width: 100px;
                height: 46px;
            }
            /deep/ .grid-item-edit {
                /deep/ .van-grid-item__content {
                    background-color: #f5f5f6;
                }
                 .van-grid-item__icon-wrapper{
                        position: absolute;
                        top: -14px;
                        right: -14px;
                        color: #cacaca;
                        font-size: 28px;
                    }

                .text {
                    font-size: 26px;
                    margin-top: 0;
                }
                .active {
                    color: rgb(28, 168, 224);
                }
            }

        }

        // 推荐频道
        /deep/ .grid-item-plus{
                .van-grid-item__content {
                    background-color: #f5f5f6;
                    white-space: nowrap;
                    flex-direction: row;
                    padding: 16px 0;
                }

                .van-grid-item__icon {
                    font-size: 28px;
                    margin-right: 8px;
                    margin-top: 15px;
                }
            }

</style>
