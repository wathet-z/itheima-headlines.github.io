<template>
  <div class="home_container">
     <!-- 导航栏 -->
    <van-nav-bar class="nav-bar-page" fixed>
      <template #title>
        <van-button
          class="search_btn"
          round
          type="info"
          size="small"
          icon="search"
        >搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable animated>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
      <!-- 子组件传参  -->
      <article-list :channel="channel"></article-list>
    </van-tab>

      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger_btn" @click="isShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>

    <!-- 频道编辑弹框 -->
    <van-popup
        v-model="isShow"
        position="bottom"
        style="height: 100%"
        closeable
        close-icon-position="top-left"
        class="channel_child"
    >
      <channel-edit :active="active" :channels="channels" @checkChannel="checkChannelFn"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '../../api/index.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { getItem } from '../../utils/storage.js'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isShow: false // 频道编辑弹框的开关
    }
  },
  created () {
    // 获取用户频道
    /*
        2. 获取数据时的业务要求
    2.1 用户已登录               通过接口获取
    2.2 用户未登录 本地存储有数据 通过本地存储
    2.3 用户未登录 本地存储无数据 通过接口获取
    */
    this.loadGetUserChannels()
  },
  methods: {
    // 调用获取用户频道接口
    async loadGetUserChannels () {
      try {
        // 用户已登录 , 或者是 未登录时本地存储无数据
        if (this.$store.state.user.token || !getItem('TOUTIAO_CHANNELS')) {
          // 调用接口获取数据
          const { data: res } = await getUserChannelsAPI()
          // console.log(res)
          this.channels = res.data.channels
        } else {
          // 本地存储获取数据
          this.channels = getItem('TOUTIAO_CHANNELS')
        }
        // console.log(this.channels)
      } catch (error) {
        console.log(error)
      }
    },
    // 切换频道
    checkChannelFn (index, flag = false) {
      this.active = index
      // flag 来确定是否需要关闭频道编辑器
      if (!flag) this.isShow = false
    }
  }

}
</script>

<style scoped lang="less">
  .home_container {
    padding: 180px, 0, 100px;
    padding-top: 180px;
    padding-bottom: 100px;
    /deep/ .van-nav-bar__title {
      max-width:unset
    }
    .search_btn {
      width: 600px;
      height: 64px;
      background-color: #5babf4;
      border: none;
      .van-icon-search {
        color: #fff;
      }
    }
    /deep/ .van-tabs {
      .van-tab {
        min-width: 200px;
        border-right: 1px solid #eee;
      }
      .van-tabs__wrap {
        position: fixed;
        top: 92px;
        left: 0;
        right: 0;
        z-index: 1;
        .van-tabs__line {
          height: 8px;
          width: 36px;
          background-color: #3296fa;
        }
      }

      .hamburger_btn {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 88px;
        background-color: #fff;

        i {
          font-size: 32px;
        }

        &:before {
        content:'';
        position: absolute;
        left: 0;
        width: 2px;
        height: 88px;
        background-image: url(../../assets/gradient-gray-line.png);
        }
      }
      .placeholder {
        flex-shrink: 0 ;  /* 不产生flex计算 */
        width: 66px;
      }

    }
    .channel_child{
      padding-top: 150px;
      box-sizing: border-box;
    }
  }

</style>
