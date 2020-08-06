import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import listPage from '../views/page/listPage'
import Main from '../views/main.vue'
import Dashboard from '../views/dashboard/dashboard.vue'
import Temp from '../views/page/temp'
import Login from '../views/login/login'
import Reviewwechatpay from '../views/wechatpay/reviewWechatPay'
import Wechatpaylist from '../views/wechatpay/wechatPayList'
import Wechatpaysearch from '../views/wechatpay/wechatPaySearch'
import Billingdetails from '../views/billsearch/billingDetails'
import Billingcount from '../views/billsearch/billingCount'
import Bankpayimport from '../views/bankpay/bankPayImport'
import Bankpaycheck from '../views/bankpay/bankPayCheck'
import Bankpaysearch from '../views/bankpay/bankPaySearch'
import BankpaysearchForCard from '../views/bankpay/bankPaySearchForCard'
Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      name:'Login',
      component: Login
    },
  {
    path: '/main',
    name: 'Main',
    redirect: '/dashboard',
    component: Main,
    meta: { title: '主页', noCache: true },
    children:[
      {
        path:'/dashboard',
        component:Dashboard,
        name:'dashboard',
        meta: { title: '控制台', noCache: true },
      },
          {
            path : '/page/listpage',
            name : 'listPage',
            component:listPage,
            meta: { title: '功能主页面', noCache: true }
          },
          {
            path : '/page/temp',
            name : 'temp',
            component:Temp,
            meta: { title: '背景例子', noCache: true }
          },
          {
            path : '/wechatpay/reviewwechatpay',
            name : 'reviewwechatpay',
            component:Reviewwechatpay,
            meta: { title: '酬金复核-微信支付', noCache: true }
          },
      {
        path : '/wechatpay/wechatpaylist',
        name : 'wechatpaylist',
        component:Wechatpaylist,
        meta: { title: '微信支付酬金单据查询', noCache: true }
      },
      {
        name:'wechatpaysearch',
        path:'/wechatpay/wechatsearch',
        component: Wechatpaysearch,
        meta: { title: '微信支付查询', noCache: true }
      },
      {
        name:'billingdetails',
        path:'/billsearch/billingdetails',
        component: Billingdetails,
        meta: { title: '对账单查询', noCache: true }
      },
      {
        name:'billingcount',
        path:'/billsearch/billingCount',
        component: Billingcount,
        meta: { title: '酬金汇总账单查询', noCache: true }
      },
      {
        name:'bankpayimport',
        path:'/bankpay/bankpayimport',
        component: Bankpayimport,
        meta: { title: '酬金银行卡支付导入', noCache: true }
      },
      {
        name:'bankpaycheck',
        path:'/bankpay/bankpaycheck',
        component: Bankpaycheck,
        meta: { title: '酬金银行卡支付导入', noCache: true }
      },
      {
        name:'bankpaysearch',
        path:'/bankpay/bankpaysearch',
        component: Bankpaysearch,
        meta: { title: '酬金单据查询', noCache: true }
      },
      {
        name:'bankpaysearchforcard',
        path:'/bankpay/bankpaysearchForCard',
        component: BankpaysearchForCard,
        meta: { title: '银行卡支付查询', noCache: true }
      }

    ]
  }

  
  //,
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
