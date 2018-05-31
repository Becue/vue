import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'


import { Button } from 'vant';
Vue.use(Button);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
import { Circle } from 'vant';
Vue.use(Circle);
import { List } from 'vant';
Vue.use(List);
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import { Icon } from 'vant';
Vue.use(Icon);
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import { NoticeBar } from 'vant';
Vue.use(NoticeBar);
import { GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn } from 'vant';
Vue.use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn);
import { NavBar } from 'vant';
Vue.use(NavBar);
import { Field } from 'vant';
Vue.use(Field);
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);
import { Loading } from 'vant';
Vue.use(Loading);
import { Popup } from 'vant';
Vue.use(Popup);
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);
import { Actionsheet } from 'vant';
Vue.use(Actionsheet);
import { Picker } from 'vant';
Vue.use(Picker);

Vue.config.productionTip = false
Vue.prototype.httpUrl = "https://japitta.leeking.cn/booking_api";  //注册全局
// 读取Cookie
Vue.prototype.getCookie = function
  (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
// axios配置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['token'] = Vue.prototype.getCookie("token")//599e0307-1cb8-4cfa-8809-7cac0c3882dc
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.code == 0) {
    return response;
  }else{
    return false;
  }
}, function (error) {
  if(error.response.status == 401){
    console.log(error.response.status)
    window.location.href="#/orders/login"
  }
});
Vue.prototype.$http = axios;


import '../static/css/style.css';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name
  }
  next()
})