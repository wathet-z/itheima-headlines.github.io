// vuex是项目全局状态管理容器， 如果说各个组件中都需要用到的公用变量，可以放到该状态管理器中
// 该状态管理器中的变量当修改时，会被动的影响所引用该变量的组件中的值
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/*
  数据持久化的两个步骤
  1. 在data获取数据时，通过JSON.parse()去本地存储中获取数据
  2. 当数据发生修改时，通过JSON.stringify()设置数据到本地存储中
*/

export default new Vuex.Store({
  // 1. 储存公共数据的地方 - 类比与vue组件中data () { return {} }, data方法返回值中的变量
  state: {
    // 一个对象，存储当前登录用户的token数据
    user: JSON.parse(window.localStorage.getItem('TOKEN_KEY')) || {}
  },
  // 2. 外部修改想要修改state中的属性时，必须通过mutation中定义的方法来进行修改 - 类比与methods中定义的方法
  mutations: {
    setUser (state, data) {
      /*
        state是内置参数： 表示的是状态管理器中state对象中所储存的所有属性
        data是外界传递过来的参数
      */
      console.log('setUser', data)
      state.user = data
      window.localStorage.setItem('TOKEN_KEY', JSON.stringify(state.user))
    }
  },

  // 3. 如果说，在mutations里的修改state中属性的方法中，涉及到异步操作，必须现在actions中进行完异步，再回到mutations里完成赋值
  actions: {
  },
  // 4. vuex中的计算属性 - 类比computed
  getters: {
  },
  // 5. 模块化vuex 可以将各个state mutations actions getters进行功能的拆分，放到不同的js文件中，在modules里进行资源整合
  modules: {
  }
})
