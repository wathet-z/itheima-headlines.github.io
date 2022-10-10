<template>
  <div class="articleList_container">
    <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        :success-text="refreshInfo"
        success-duration="1500"
    >
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败,点击重新加载"
            @load="onLoad"
        >
            <article-item
              v-for="(item, index) in list"
              :key="index"
              :article="item"
            />
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '../../../api/index.js'
import ArticleItem from './article-item.vue'
export default {
  name: 'articleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      list: [],
      loading: false, // 防抖  = 当数据再请求的过程中,禁止发起 @load 下一次数据的请求
      finished: false, // 表示所有数据全部加载完成,当为true时禁止 @load事件
      timestamp: null, // 当前需要查找数据的时间戳
      error: false, // 当请求报错时,会将error改为true,此时不会自动出发@load事件 ,点击错误提示主动出发@load
      refreshing: false, // 防抖 - 当执行下拉更新时禁止触发 @refresh 事件
      refreshInfo: '刷新成功' // 根据下拉刷新的结果展示不同的文本

    }
  },
  methods: {
    // 获取新闻文章列表
    async onLoad () {
      try {
        // 1. 通过接口获取数据,并将数据铺设完成
        const { data: res } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now() // 查找数据的时间戳,有指定的就用指定的,没有就用当前的
        })
        console.log(res)
        // 2. 将接口返回的时间戳赋值给当前组件数据
        this.timestamp = res.data.pre_timestamp
        // 3. 将获取到的数据拼接到list数组中
        this.list.push(...res.data.results)
        // 4. 加载状态结束,可以进行下一次加载动作
        this.loading = false
        // 5. 数据全部加载完成 - 当找不到下一页内容时 表示加载完成.
        if (res.data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        // 6. 当代码报错时,主动结束加载状态
        this.loading = true
        // 7. 当请求报错时,开启错误提示
        this.error = true
        console.log(error)
      }
    },
    async onRefresh () {
      try {
        // 1. 通过接口获取数据,并将数据铺设完成
        const { data: res } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now() // 直接使用最新的时间
        })

        // 2. 将获取到的数据拼接到list数组中
        this.list.unshift(...res.data.results)

        // 3. 加载状态结束,可以进行下一次加载动作
        this.refreshing = false
        // 3.1 修改提示文本
        this.refreshInfo = `刷新成功,更新了${res.data.results.length}条数据`
      } catch (error) {
        // 4. 当代码报错时,主动结束加载状态
        this.refreshing = true

        // 4.1 修改提示文本
        this.refreshInfo = '刷新失败'
        console.log(error)
      }
    }
  }

}
</script>

<style scoped lang="less">
  .articleList_container{
    // 百分比是根据它的父组件去设置的
    // height: 100%;
    overflow-y: auto;

    // vh vw 可以设置动态的宽高,相对于视口而言 0-100
    height: 79vh;
  }

</style>
