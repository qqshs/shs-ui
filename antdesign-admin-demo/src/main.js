// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { STable } from '@/components'
import EnumSelect from '@/components/Select/EnumSelect' // 自定义 枚举下拉
import CustomerLandSelect from '@/components/Select/CustomerLandSelect' // 自定义 枚举下拉
import CustomerSelect from '@/components/Select/CustomerSelect' // 自定义 枚举下拉

import { GetEnumItems, exportDataExcel } from '@/api/common'
import themePluginConfig from '../config/themePluginConfig'
import '@/permission'

import bootstrap from './core/bootstrap'
import './core/lazy_use'

import './utils/filter' // global filter
import './global.less'

Vue.config.productionTip = false
Vue.prototype.comAPI = { GetEnumItems, exportDataExcel }

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('enum-select', EnumSelect)
Vue.component('CustomerLandSelect', CustomerLandSelect)
Vue.component('CustomerSelect', CustomerSelect)
Vue.component('STable', STable)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
