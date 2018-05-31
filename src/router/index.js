import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JAPPITA',
      component: function (resolve) {
        require(['@/components/orders/list.vue'], resolve)
      }
    },
    {
      path: '/orders/detail',
      name: "予約",
      component: function (resolve) {
        require(['@/components/orders/detail.vue'], resolve)
      }
    },
    {
      path: '/orders/change',
      name: "予約变更",
      component: function (resolve) {
        require(['@/components/orders/change.vue'], resolve)
      }
    },
    {
      path: '/orders/success',
      name: "予約变更成功",
      component: function (resolve) {
        require(['@/components/orders/success.vue'], resolve)
      }
    },
    // 列表
    {
      path: '/orders/list',
      name: "JAPPITA",
      component: function (resolve) {
        require(['@/components/orders/list.vue'], resolve)
      }
    },
    // 绑定
    {
      path: '/orders/bind',
      name: "绑定",
      component: function (resolve) {
        require(['@/components/orders/bind.vue'], resolve)
      }
    },
    // 登录
    {
      path: '/orders/login',
      name: "登录",
      component: function (resolve) {
        require(['@/components/orders/login.vue'], resolve)
      }
    }
  ]
})