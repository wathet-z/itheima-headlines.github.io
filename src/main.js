import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
// 通过amfe-flexible修改fontsize,完成rem适配
import 'amfe-flexible'

// 引入vant UI 组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入公共样式
import './styles/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
