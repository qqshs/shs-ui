import request from '@/utils/request'
import api from './bytterAjax'

const basisApi = {
    //用户相关
  userList: request.bytterRouter.businessBasic + '/businessBasic/userManage/get',
  userAddUrl:  request.bytterRouter.businessBasic + '/businessBasic/userManage/add',
  updateUserUrl:  request.bytterRouter.businessBasic + '/businessBasic/userManage/update',
  deleteUserUrl:  request.bytterRouter.businessBasic + '/businessBasic/userManage/delete',
  resetPasswordUrl:  request.bytterRouter.businessBasic + '/businessBasic/userManage/resetPassword',
  updateUserPwdUrl:  request.bytterRouter.businessBasic + '/businessBasic/userManage/updateUserPwd',
  updatePayPwdUrl:  request.bytterRouter.businessBasic + '/businessBasic/userManage/updatePayPwd',
  unlockUserUrl:  request.bytterRouter.businessBasic + '/businessBasic/userManage/unlockUser',
  
}

/**
 * 用户列表
 */
export function userList (parameter) {
  return request({
    url: basisApi.userList,
    method: 'post',
    data: parameter
  })
}

/**
 * 用户新增
 */
export function userAddUrl (parameter) {
    return request({
      url: basisApi.userAddUrl,
      method: 'post',
      data: parameter
    })
  }

/**
 * 用户修改
 */
export function updateUserUrl (parameter) {
  return request({
    url: basisApi.updateUserUrl,
    method: 'post',
    data: parameter
  })
}

/**
 * 用户删除
 */
export function deleteUserUrl(data) {
  return request({
    url: basisApi.deleteUserUrl,
    method: 'post',
    data
  })
}

/**
 * 重置密码
 */
export function resetPasswordUrl(data) {
    return request({
      url: basisApi.resetPasswordUrl,
      method: 'post',
      data
    })
}

/**
 * 修改密码
 */
export function updatePayPwdUrl(data) {
  return request({
    url: basisApi.updatePayPwdUrl,
    method: 'post',
    data
  })
}


/**
 * 修改密码
 */
export function updateUserPwdUrl(data) {
    return request({
      url: basisApi.updateUserPwdUrl,
      method: 'post',
      data
    })
  }

/**
 * 用户停用启用
 */
export function unlockUserUrl(data) {
    return request({
      url: basisApi.unlockUserUrl,
      method: 'post',
      data
    })
  }
