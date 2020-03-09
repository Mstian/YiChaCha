// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
// import echarts from 'echarts'
import '@/assets/css/reset.css'
import common from './common/common.js'
import store from './store'
import lookMore from './components/chacha/lookMore';
Vue.component('lookmore',lookMore);

// Vue.prototype.$https = axios;
// Vue.prototype.$echarts = echarts;
Vue.prototype.common = common;
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
