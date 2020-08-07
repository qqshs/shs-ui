import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/index'
import echarts from 'echarts'
import 'echarts/theme/macarons'
import VueParticles from 'vue-particles'
import '../src/assets/css/headbg.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/base.css';

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios;
Vue.use(VueParticles)
Vue.use(VueAxios, axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com/';

