import Vue from 'vue'
import App from './App.vue'
import antDesign from 'ant-design-vue';
import router from './router'
import 'ant-design-vue/dist/antd.css';
import './assets/css/headbg.css'
//import echarts from 'echarts/lib/echarts'
import 'echarts/theme/macarons'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueParticles from 'vue-particles'
Vue.use(antDesign)
Vue.use(VueAxios, axios)
Vue.use(VueParticles)
Vue.config.productionTip = false
//引入基本模板 -echarts 按需引入
/*let echarts = require('echarts/lib/echarts')

// 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')
require('echarts/lib/chart/pie')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例翻译滚动 -echarts 按需引入*/
//Vue.prototype.$echarts = echarts


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com/';
//axios.defaults.baseURL = 'http://127.0.0.1:9000';

//请求拦截器，添加token
axios.interceptors.request.use(
    config => {
      //config.baseURL = '/api/'
      config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
      config.timeout = 6000
      let token = localStorage.getItem('access_token')
      console.log("token add");
      //let csrf = store.getters.csrf
      if (token) {
        config.headers = {
          'access-token': token,
          // 'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
);
//请求返回拦截，如服务器判定token 已过期，则让系统进入到登陆页
//如
axios.interceptors.response.use(
    response => {
      // 定时刷新access-token
      console.log("response")
      console.log(response.headers)
      if ( response.data.code === '1001') {
        console.log("out system")
        // 刷新token
        localStorage.removeItem('access_token');
        router.push('/');

      }else if( response.data.code === '1000'){
        console.log("login in success")
        localStorage.setItem('access_token', response.headers)
      }
      return response
    },
    error => {
      return Promise.reject(error)
    }
);
