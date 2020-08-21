import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/vant.js'
import Vant from 'vant'
import 'vant/lib/index.css'
// import { Swipe, SwipeItem } from 'vant';
// Vue.use(Swipe);
// Vue.use(SwipeItem);

// 引入toast
import toast from 'components/common/toast/index'
// 安装toast插件
Vue.use(toast)

// 引入   fastclick 
import FastClick from 'fastclick'
// 使用    解决移动端300ms延迟
FastClick.attach(document.body);

// 引入懒加载vue-lazyload
import VueLazyload from 'vue-lazyload'
// 使用vue-lazyload
Vue.use(VueLazyload, {
  loading: require('./assets/imgs/common/placeholder.png'), //加载中图片，一定要有，不然会一直重复加载占位图
  error: require('./assets/imgs/common/placeholder.png') //加载失败图片
});


// 向vue 的原型中添加 $bus 而且$bus是vue的实例
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function(h) {
    return h(App)
  }
}).$mount('#app')