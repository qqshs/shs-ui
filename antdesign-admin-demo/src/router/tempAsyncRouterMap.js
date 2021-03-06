import { UserLayout, RouteView, PageView, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export default
  [
    // dashboard
    {
      path: '/demos',
      name: 'demos',
      redirect: '/dashboard/demos',
      component: RouteView,
      meta: { title: '临时路径', keepAlive: true, icon: bxAnaalyse, },
      children: [
        {
          // path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
          path: '/dashboard/demos',
          name: 'DashboardDemos',
          component: () => import('@/views/dashboard/Demos'),
          meta: { title: '演示区域1', keepAlive: false, }
        },
        // 外部链接
        // {
        //   path: 'https://www.baidu.com/',
        //   name: 'Monitor',
        //   meta: { title: 'menu.dashboard.monitor', target: '_blank' }
        // },
        // {
        //   path: '/dashboard/workplace',
        //   name: 'Workplace',
        //   component: () => import('@/views/dashboard/Workplace'),
        //   meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
        // },
        // {
        //   path: '/dashboard/pay-info',
        //   name: 'PayInfo',
        //   component: () => import('@/views/dashboard/Dashboard'),
        //   meta: { title: '主页', keepAlive: true, permission: ['dashboard'] }
        // }
      ]
    },

    //customer
    // {
    //   path: '/customer',
    //   redirect: '/customer/customer-registered',
    //   component: RouteView,
    //   meta: { title: '商户平台', icon: 'team', permission: ['customer'] },
    //   children: [
    //     {
    //       path: '/customer/customer-registered',
    //       name: 'CustomerRegistered',
    //       meta: { title: '商户注册', keepAlive: true, permission: ['customer'] },
    //       component: () => import('@/views/customer/CustomerRegistered')
    //     },
    //     {
    //       path: '/customer/customer-details',
    //       name: 'CustomerDetails',
    //       meta: { title: '商户详情', keepAlive: true, permission: ['customer'] },
    //       component: () => import('@/views/customer/CustomerDetails')
    //     }
    //   ]
    // },
    //commissionAcc
    {
      path: '/commission-acc',
      redirect: '/commission-acc/acc-info',
      component: RouteView,
      meta: { title: '酬金账户平台', icon: 'bank', permission: ['commission-acc'] },
      children: [
        {
          path: '/commission-acc/acc-info',
          name: 'CommissionAccInfo',
          meta: { title: '酬金账户详情', keepAlive: true, permission: ['commission-acc'] },
          component: () => import('@/views/commissionAcc/AccInfo')
        },
        {
          path: '/commission-acc/acc-bal',
          name: 'CommissionAccBal',
          meta: { title: '酬金账户充值查询', keepAlive: true, permission: ['commission-acc'] },
          component: () => import('@/views/commissionAcc/AccBal')
        },
        {
          path: '/commission-acc/acc-dtl',
          name: 'CommissionAccDtl',
          meta: { title: '酬金账户交易流水查询', keepAlive: true, permission: ['commission-acc'] },
          component: () => import('@/views/commissionAcc/AccDtl')
        }
      ]
    },
    //electronicContract
    // {
    //   path: '/electronic-contract',
    //   redirect: '/electronic-contract/contract-import',
    //   component: RouteView,
    //   meta: { title: '签约中心', icon: 'bank', permission: ['electronic-contract'] },
    //   children: [
    //     {
    //       path: '/electronic-contract/contract-import',
    //       name: 'ContractImport',
    //       meta: { title: '用户导入', keepAlive: true, permission: ['electronic-contract'] },
    //       component: () => import('@/views/eContract/ContractImport')
    //     },
    //     {
    //       path: '/electronic-contract/contract-sign',
    //       name: 'ContractSign',
    //       meta: { title: '用户签约', keepAlive: true, permission: ['electronic-contract'] },
    //       component: () => import('@/views/eContract/ContractSign')
    //     },
    //     {
    //       path: '/electronic-contract/contract-details',
    //       name: 'ContractDetails',
    //       meta: { title: '签约详情', keepAlive: true, permission: ['commission-acc'] },
    //       component: () => import('@/views/eContract/ContractDetails')
    //     }
    //   ]
    // },
    // forms
    {
      path: '/form',
      redirect: '/form/base-form',
      component: RouteView,
      meta: { title: '表单页', icon: 'form', permission: ['form'] },
      children: [
        {
          path: '/form/base-form',
          name: 'BaseForm',
          component: () => import('@/views/form/basicForm'),
          meta: { title: '基础表单', keepAlive: true, permission: ['form'] }
        },
        {
          path: '/form/step-form',
          name: 'StepForm',
          component: () => import('@/views/form/stepForm/StepForm'),
          meta: { title: '分步表单', keepAlive: true, permission: ['form'] }
        },
        {
          path: '/form/advanced-form',
          name: 'AdvanceForm',
          component: () => import('@/views/form/advancedForm/AdvancedForm'),
          meta: { title: '高级表单', keepAlive: true, permission: ['form'] }
        }
      ]
    },

    // list
    {
      path: '/list',
      name: 'list',
      component: RouteView,
      redirect: '/list/table-list',
      meta: { title: '列表页', icon: 'table', permission: ['table'] },
      children: [
        {
          path: '/list/table-list/:pageNo([1-9]\\d*)?',
          name: 'TableListWrapper',
          hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
          component: () => import('@/views/list/TableList'),
          meta: { title: '查询表格', keepAlive: true, permission: ['table'] }
        },
        {
          path: '/list/basic-list',
          name: 'BasicList',
          component: () => import('@/views/list/BasicList'),
          meta: { title: '标准列表', keepAlive: true, permission: ['table'] }
        },
        {
          path: '/list/card',
          name: 'CardList',
          component: () => import('@/views/list/CardList'),
          meta: { title: '卡片列表', keepAlive: true, permission: ['table'] }
        },
        {
          path: '/list/search',
          name: 'SearchList',
          component: () => import('@/views/list/search/SearchLayout'),
          redirect: '/list/search/article',
          meta: { title: '搜索列表', keepAlive: true, permission: ['table'] },
          children: [
            {
              path: '/list/search/article',
              name: 'SearchArticles',
              component: () => import('../views/list/search/Article'),
              meta: { title: '搜索列表（文章）', permission: ['table'] }
            },
            {
              path: '/list/search/project',
              name: 'SearchProjects',
              component: () => import('../views/list/search/Projects'),
              meta: { title: '搜索列表（项目）', permission: ['table'] }
            },
            {
              path: '/list/search/application',
              name: 'SearchApplications',
              component: () => import('../views/list/search/Applications'),
              meta: { title: '搜索列表（应用）', permission: ['table'] }
            }
          ]
        }
      ]
    },

    // profile
    {
      path: '/profile',
      name: 'profile',
      component: RouteView,
      redirect: '/profile/basic',
      meta: { title: '详情页', icon: 'profile', permission: ['profile'] },
      children: [
        {
          path: '/profile/basic',
          name: 'ProfileBasic',
          component: () => import('@/views/profile/basic'),
          meta: { title: '基础详情页', permission: ['profile'] }
        },
        {
          path: '/profile/advanced',
          name: 'ProfileAdvanced',
          component: () => import('@/views/profile/advanced/Advanced'),
          meta: { title: '高级详情页', permission: ['profile'] }
        }
      ]
    },

    // result
    {
      path: '/result',
      name: 'result',
      component: RouteView,
      redirect: '/result/success',
      meta: { title: '结果页', icon: 'check-circle-o', permission: ['result'] },
      children: [
        {
          path: '/result/success',
          name: 'ResultSuccess',
          component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
          meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
        },
        {
          path: '/result/fail',
          name: 'ResultFail',
          component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
          meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
        }
      ]
    },

    // Exception
    {
      path: '/exception',
      name: 'exception',
      component: RouteView,
      redirect: '/exception/403',
      meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
      children: [
        {
          path: '/exception/403',
          name: 'Exception403',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
          meta: { title: '403', permission: ['exception'] }
        },
        {
          path: '/exception/404',
          name: 'Exception404',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
          meta: { title: '404', permission: ['exception'] }
        },
        {
          path: '/exception/500',
          name: 'Exception500',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
          meta: { title: '500', permission: ['exception'] }
        }
      ]
    },

    // account
    {
      path: '/account',
      component: RouteView,
      redirect: '/account/center',
      name: 'account',
      meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
      children: [
        {
          path: '/account/center',
          name: 'center',
          component: () => import('@/views/account/center'),
          meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
        },
        {
          path: '/account/settings',
          name: 'settings',
          component: () => import('@/views/account/settings/Index'),
          meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
          redirect: '/account/settings/base',
          hideChildrenInMenu: true,
          children: [
            {
              path: '/account/settings/base',
              name: 'BaseSettings',
              component: () => import('@/views/account/settings/BaseSetting'),
              meta: { title: '基本设置', hidden: true, permission: ['user'] }
            },
            {
              path: '/account/settings/security',
              name: 'SecuritySettings',
              component: () => import('@/views/account/settings/Security'),
              meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
            },
            {
              path: '/account/settings/custom',
              name: 'CustomSettings',
              component: () => import('@/views/account/settings/Custom'),
              meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
            },
            {
              path: '/account/settings/binding',
              name: 'BindingSettings',
              component: () => import('@/views/account/settings/Binding'),
              meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
            },
            {
              path: '/account/settings/notification',
              name: 'NotificationSettings',
              component: () => import('@/views/account/settings/Notification'),
              meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
            }
          ]
        }
      ]
    },
    {
      path: '/userSetting',
      component: RouteView,
      redirect: '/userSetting',
      name: 'userSetting',
      meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
      children: [
        {
          path: '/userSetting/center',
          name: 'userCenter',
          component: () => import('@/views/account/center'),
          meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
        },
        {
          path: '/user/setting',
          name: 'userSettings',
          component: () => import('@/views/userSetting/Index'),
          meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
          redirect: '/user/setting/base',
          hideChildrenInMenu: true,
          children: [
            {
              path: '/user/setting/base',
              name: 'userBaseSettings',
              component: () => import('@/views/userSetting/UserBase'),
              meta: { title: '基本设置', hidden: true, permission: ['user'] }
            },
            {
              path: '/user/setting/security',
              name: 'userSecuritySettings',
              component: () => import('@/views/userSetting/UserSecurity'),
              meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
            },
          ]
        }
      ]
    },
    // other
    {
      path: '/other',
      name: 'otherPage',
      component: PageView,
      meta: { title: '其他组件', icon: 'slack', permission: ['dashboard'] },
      redirect: '/other/icon-selector',
      children: [
        {
          path: '/other/icon-selector',
          name: 'TestIconSelect',
          component: () => import('@/views/other/IconSelectorView'),
          meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: ['dashboard'] }
        },
        {
          path: '/other/list',
          component: RouteView,
          meta: { title: '业务布局', icon: 'layout', permission: ['support'] },
          redirect: '/other/list/tree-list',
          children: [
            {
              path: '/other/list/tree-list',
              name: 'TreeList',
              component: () => import('@/views/other/TreeList'),
              meta: { title: '树目录表格', keepAlive: true }
            },
            {
              path: '/other/list/edit-table',
              name: 'EditList',
              component: () => import('@/views/other/TableInnerEditList'),
              meta: { title: '内联编辑表格', keepAlive: true }
            },
            {
              path: '/other/list/user-list',
              name: 'UserList',
              component: () => import('@/views/other/UserList'),
              meta: { title: '用户列表', keepAlive: true }
            },
            {
              path: '/other/list/role-list',
              name: 'RoleList',
              component: () => import('@/views/other/RoleList'),
              meta: { title: '角色列表', keepAlive: true }
            },
            {
              path: '/other/list/system-role',
              name: 'SystemRole',
              component: () => import('@/views/role/RoleList'),
              meta: { title: '角色列表2', keepAlive: true }
            },
            {
              path: '/other/list/permission-list',
              name: 'PermissionList',
              component: () => import('@/views/other/PermissionList'),
              meta: { title: '权限列表', keepAlive: true }
            }
          ]
        }
      ]
    }
  ]
