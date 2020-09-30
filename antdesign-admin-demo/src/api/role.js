import request from '@/utils/request'
import api from './bytterAjax'

const roleApi = {
  roleList: request.bytterRouter.businessBasic + '/businessBasic/roleManage/get',
  roleAddUrl:  request.bytterRouter.businessBasic + '/businessBasic/roleManage/add',
  updateRoleUrl:  request.bytterRouter.businessBasic + '/businessBasic/roleManage/update',
  deleteRoleUrl:  request.bytterRouter.businessBasic + '/businessBasic/roleManage/delete',
}

/**
 * 角色列表
 */
export function roleList (parameter) {
  return request({
    url: roleApi.roleList,
    method: 'post',
    data: parameter
  })
}

/**
 * 角色新增
 */
export function roleAddUrl (parameter) {
    return request({
      url: roleApi.roleAddUrl,
      method: 'post',
      data: parameter
    })
  }

/**
 * 角色修改
 */
export function updateRoleUrl (parameter) {
  return request({
    url: roleApi.updateRoleUrl,
    method: 'post',
    data: parameter
  })
}

/**
 * 角色删除
 */
export function deleteRoleUrl(data) {
  return request({
    url: roleApi.deleteRoleUrl,
    method: 'post',
    data
  })
}
