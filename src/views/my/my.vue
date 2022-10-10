<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header user-info" v-if="this.$store.state.user.token">
      <!-- 基本信息 -->
      <div class="base-info">
        <div class="left">
          <van-image
            round
            class="avatar"
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" round size="mini">编辑资料</van-button>
        </div>
      </div>
      <!-- 关注数据 -->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="../../assets/mobile.png" alt="" />
        <span>登录 / 注册</span>
      </div>
    </div>

    <!-- 收藏历史 -->
    <van-grid column-num="2">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
    </van-grid>

    <!-- 单元格区域 -->
    <van-cell title="消息通知" is-link class="mt-10" />
    <van-cell title="小智同学" is-link />

    <van-cell
      title="退出登录"
      class="mt-10 login-out" @click="loginOutBtnFn"
      v-if="this.$store.state.user.token"
    />
    <van-popup v-model="show">确定退出么</van-popup>
  </div>
</template>

<script>
/*   2. 切换登录与未登录不同的状态
    - 未登录时显示 登录注册按钮
    - 以登录时显示 个人用户信息 退出登录按钮
    - 当点击退出登录时，需要退出登录（删除vuex中的token数据）
*/
import { mapState } from 'vuex'
import { getUserInfoAPI } from '../../api/index.js'
export default {
  name: 'MyIndex',
  data () {
    return {
      show: false,
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadUserInfo()
    // 如何修改vuex中的user数据  -  this.$store.commit('setUser', 需要修改的内容)
    // 如何获取vuex中的user数据  -  this.$store.state.user
    console.log(this.$store.state.user)
    // 第二章获取vuex中的数据
    console.log(this.user)
  },
  methods: {
    // 获取用户登录个人信息
    async loadUserInfo () {
      try {
        const { data: res } = await getUserInfoAPI()
        this.userInfo = res.data
        console.log(this.userInfo)
      } catch (error) {
        console.dir(error)
      }
    },
    // 退出登录+
    loginOutBtnFn () {
      this.$dialog.confirm({
        title: '确认退出么',
        theme: 'round-button'
      })
        .then(() => {
          // on confirm
          // 确定
          this.$store.commit('setUser', {})
          this.$toast.success('退出成功')
        })
        .catch(() => {
          // on cancel

        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background-image: url(../../assets/banner.png);
    background-size: cover;
  }

  .not-login {
    display: flex;
    align-items: center;
    justify-content: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 130px;
        height: 130px;
        margin-bottom: 16px;
      }

      span {
        font-size: 28px;
        color: #ffffff;
      }
    }
  }

  .base-info {
    padding: 76px 32px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;

      .avatar {
        width: 130px;
        height: 130px;
        border: 4px solid #ffffff;
        margin-right: 24px;
      }

      span {
        font-size: 28px;
        color: #ffffff;
      }
    }
  }

  .data-stats {
    display: flex;
    .data-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 24px;

      .count {
        font-size: 36px;
      }
    }
  }

  // 如果对某些第三方组件中的某一部分设置样式时，可能你的复合选择器写的没有问题，但是页面样式并不生效时
  // 使用 :deep(选择器) 穿透样式的方式来设置
  :deep(.van-icon-star-o) {
    color: red;
  }

  :deep(.van-icon-clock-o) {
    color: orange;
  }

  .login-out {
    text-align: center;
    color: #d86262;
  }

  .mt-10 {
    margin-top: 10px;
  }
}
</style>
