import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 根路由
    component: () => import('../views/layout/layout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/home/home.vue')
      },
      {
        path: 'qa',
        component: () => import('../views/qa/qa.vue')
      },
      {
        path: 'video',
        component: () => import('../views/video/video.vue')
      },
      {
        path: 'my',
        component: () => import('../views/my/my.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // 通过一下引入组件设置路由的方式（懒加载方式），可以在浏览器第一次开启项目时，有更快的渲染速度
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
