import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Router from '@/router'
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

request.bytterRouter = {
  bytterEdmPay: '/bytterEdmPay',
  fileService: '/fileService',
  businessBasic: '/businessBasic',
}


// 异常拦截处理器
const errorHandler = (error) => {

  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  // const tempRequest = [
  //   '/businessBasic/businessBasic/dict/getDictByCodeAndType']
  // // console.warn('以下接口 临时走前端服务,如需调试移除后保存即可 无需重启. \n', tempRequest.join('\n'))
  // if (tempRequest.includes(config.url)) {
  //   config.baseURL = '/local'
  // }

  // config.baseURL = '/local'
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = token
  }
  config.headers['B-R-CODE'] = Router.app.$route.meta.id || '-1'

  config.method = config.method || 'get'
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  const res = response.data
  if (response.data.code === -1000) {
    store.dispatch('Logout')
  }
  if (res instanceof Blob) {
    return response
  }
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
