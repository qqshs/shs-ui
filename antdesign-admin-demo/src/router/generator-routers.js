// eslint-disable-next-line
import * as loginService from '@/api/login'
// eslint-disable-next-line
import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'
import tempAsyncRouterMap  from './tempAsyncRouterMap'
// 前端路由表
// const constantRouterComponents = {
//   // 基础页面 layout 必须引入
//   BasicLayout: BasicLayout,
//   BlankLayout: BlankLayout,
//   RouteView: RouteView,
//   PageView: PageView,
//   '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
//   '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
//   '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),

//   // 你需要动态引入的页面组件
//   'Workplace': () => import('@/views/dashboard/Workplace'),
//   'Analysis': () => import('@/views/dashboard/Analysis'),

//   // form
//   // 'BasicForm': () => import('@/views/form/BasicForm'),
//   'StepForm': () => import('@/views/form/stepForm/StepForm'),
//   'AdvanceForm': () => import('@/views/form/advancedForm/AdvancedForm'),

//   // list
//   'TableList': () => import('@/views/list/TableList'),
//   // 'StandardList': () => import('@/views/list/StandardList'),
//   'CardList': () => import('@/views/list/CardList'),
//   'SearchLayout': () => import('@/views/list/search/SearchLayout'),
//   'SearchArticles': () => import('@/views/list/search/Article'),
//   'SearchProjects': () => import('@/views/list/search/Projects'),
//   'SearchApplications': () => import('@/views/list/search/Applications'),
//   // 'ProfileBasic': () => import('@/views/profile/basic/Index'),
//   'ProfileAdvanced': () => import('@/views/profile/advanced/Advanced'),

//   // result
//   'ResultSuccess': () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
//   'ResultFail': () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),

//   // exception
//   'Exception403': () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
//   'Exception404': () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
//   'Exception500': () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),

//   // account
//   // 'AccountCenter': () => import('@/views/account/center/Index'),
//   'AccountSettings': () => import('@/views/account/settings/Index'),
//   'BaseSettings': () => import('@/views/account/settings/BaseSetting'),
//   'SecuritySettings': () => import('@/views/account/settings/Security'),
//   'CustomSettings': () => import('@/views/account/settings/Custom'),
//   'BindingSettings': () => import('@/views/account/settings/Binding'),
//   'NotificationSettings': () => import('@/views/account/settings/Notification'),

//   'TestWork': () => import(/* webpackChunkName: "TestWork" */ '@/views/dashboard/TestWork')
// }

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '/',
  component: BasicLayout,
  redirect: '/dashboard',
  meta: {
    title: '首页'
  },
  children: [
  ]
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    loginService.getCurrentUserNav().then(res => {
      const { data: result } = res
      let menuNav = []
      const treeNav = []
      // listToTree(result, treeNav, 0)
      menuNav = initNavResult(result)
      //      后端数据, 根级树数组,  根级 PID
      // 组装菜单
      // rootRouter.children = menuNav
      // menuNav.push(rootRouter)
      // console.log(JSON.stringify(menuNav))

      // 组装路由
      const routers = generator(menuNav)
      // routers.push(notFoundRouter)
      // console.log('routers', routers)

      rootRouter.children = routers
      // rootRouter.children.push(notFoundRouter)
      rootRouter.children.push(...tempAsyncRouterMap)
      resolve([rootRouter])
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap) => {
  return routerMap.map(item => {
    const { component } = item
    const { children } = item

    const currentRouter = {
      ...item,
      component: () => import(`@/${component}`),
      children: children && children.length > 0 ? generator(children) : null
    }
    // if (!component || component.indexOf('layouts') > -1) {
    //   currentRouter.component = RouteView
    // } else {
    //   currentRouter.component = () => import(`@/${component}`)
    // }
    // if (!currentRouter.path.startsWith('http')) {
    //   currentRouter.path = currentRouter.path.replace('//', '/')
    // }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      // if (child.children.length <= 0) {
      //   delete child.children
      // }
      // 加入到树中
      tree.push(child)
    }
  })
}


/**
 * 初始化后台返回的数据
 * 1 组合meta
 * 2 完善hidden 等字段
 * @param {*} navTree 
 */
const initNavResult = (navTree) => {
  // if (!navTree || navTree.length === 0) return []
  return navTree.map(item => {
    const { id, pid, redirect, component, sortNo, url, name, title, show, hideChildren, target, icon } = item
    let { hidden, children, } = item
    children = children && children.length > 0 ? initNavResult(children) : null
    hidden = hidden === '1' ? true : false
    return {
      id, key: id, pid, path: url, component, name, redirect, hidden, sortNo: sortNo || 0, hideChildrenInMenu: false, meta: { title, show, hideChildren, target, icon }, children
    }
  })
}
