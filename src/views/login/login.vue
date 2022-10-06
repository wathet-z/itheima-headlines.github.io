<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar-page" title="登录" />

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="userFormRules.mobile"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.smsCode"
        name="smsCode"
        label="验证码"
        placeholder="验证码"
        :rules="userFormRules.smsCode"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>

        <template #button>
          <van-button v-if="!isCountDownShow" class="send-sms-btn" round size="small" native-type="button" @click="onSendSms">
            发送验证码
          </van-button>

          <van-count-down v-else :time="5 * 1000" format="ss 秒" @finish="isCountDownShow = false" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <div style="font-size:20px">账号：随意的手机号 13911111111  &emsp;&emsp;&emsp;验证码： 246810</div>
  </div>
</template>

<script>
/*
  目标1：实现基本的登录操作 （已知手机号和验证码）
  1. 整合页面上的变量数据，将他们变得更符合当前业务
  2. 请求登录接口，实现登录
*/

/*
  关于在js中使用vant组件的两种方式
  1. 通过import 按需引入的方式进行使用
  2. 通过this.$组件名 的方式直接使用
  注意： 如果this.$的形式无法使用某个组件时，直接转化使用按需引入的方式
        先用方法2，方法2报错用方法1
*/

/*
  目标2：登录表单验证
  手机号：
    1. 必填
    2. 必须是一个手机号格式
  验证码
    1. 必填
    2. 必须是6位数
  先创建规则对象，设置对应规则，再在标签中设置对应的动态rules属性
*/

/*
  目标3： 通过点击发送验证来实现后去验证码
  1. 在请求发送验证码接口之前，需要对表单中的手机号进行规则验证
  2. 通过手机号规则验证后，切换倒计时模式
  3. 调用接口
*/

/*
  如何判断一个数据，是否需要双向绑定
  1. 当前数据在页面上展示时，是否会被动的发生变化？ 如果需要，则需要双向绑定
*/
import { loginAPI, getSmsCodeAPI } from '../../api/index.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        smsCode: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式不正确' }
        ],
        smsCode: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ]
      },
      isCountDownShow: false // 倒计时展示开关
    }
  },
  methods: {
    // 提交
    async onSubmit () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...', // 加载文本
        forbidClick: true // 是否禁用背景中控件的点击操作 true表示的是不能点击
      })

      try {
        const { data: res } = await loginAPI({
          mobile: this.user.mobile,
          code: this.user.smsCode
        })

        console.log(res)
        // 将用户token存储到vuex中
        // 通过$store.commit('在mutation中定义的方法名', 需要传递的参数)
        this.$store.commit('setUser', res.data)

        // 关闭加载轻提示有两种方式
        // 1. .clear() 来进行主动关闭
        // this.$toast.clear()
        // 2. 通过开启其他的轻提示来主动关闭
        this.$toast.success('登录成功')
        window.location = '/src/views/home/home.vue'
      } catch (error) {
        if (error.response.status === 400) this.$toast.fail('手机号或验证码输入错误')
        else this.$toast.fail('服务器内部错误，请稍后重试')
      }
    },

    // 发送验证码
    async onSendSms () {
      // 验证手机输入框是否符合规则
      try {
        await this.$refs.loginForm.validate('mobile')
        // 通过接口发送验证码请求
        await getSmsCodeAPI(this.user.mobile)
        // 当校验通过时，切换倒计时操作
        this.isCountDownShow = true
      } catch (error) {
        console.log(error)
        // 通过短路运算来规避代码错误
        if (error.response.status === 429) this.$toast.fail('手机号或验证码输入错误')
        else this.$toast.fail('服务器内部错误，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 每一个组件，都应该具有该组件唯一的根类名 */
.login-container {
  .toutiao {
    font-size: 40px;
  }

  .send-sms-btn {
    background-color: #ededed;
    color: #666666;
  }
}
</style>
