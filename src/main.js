import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
// 通过amfe-flexible修改font-size,屏幕的宽度1/10
import 'amfe-flexible'

// 引入vantUI组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入自定义公共样式表
import './styles/index.less'

// 引入dayjs处理时间工具
import './utils/dayjs.js'

// 引入lodash工具
import _ from 'lodash'
Vue.prototype.$_ = _

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
