import Vue from 'vue'
import App from './App.vue'

import luckDraw from './plugins/luckDraw.js' // 抽奖
import 'vant/lib/index.less';

Vue.use(luckDraw) // 抽奖

new Vue({
  render: h => h(App),
}).$mount('#app')
