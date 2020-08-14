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

// 向vue 的原型中添加 $bus 而且$bus是vue的实例
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function(h) { return h(App) }
}).$mount('#app')