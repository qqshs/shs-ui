import Vue from 'vue'
import VueRouter from 'vue-router'
//import Main from '../views/main'
//import Dashboard from '../views/dashboard/dashboard'
//import Login from '../views/user/login'
const Main =()=> import('../views/main')
const Dashboard =()=> import('../views/dashboard/dashboard')
const Userinfo =()=> import('../views/user/userInfo')
const Login =()=> import('../views/user/login')
const ListPage =()=> import('../views/page/listPage')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect:'/dashboard',
    breadcrumbName:'home',
    children:[
      {
        path:'/dashboard',
        name:'Dashboard',
        component:Dashboard,
        breadcrumbName:'控制台'
      },
      {
        path:'/userinfo',
        name:'Userinfo',
        component:Userinfo,
        breadcrumbName:'个人信息'
      },
      {
        path:'/page/listpage',
        name:'listpage',
        component:ListPage,
        breadcrumbName:'功能主页面'
      }
    ]
  },
    {
      path:'/',
      name:'Login',
      component: Login,
    }

]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router