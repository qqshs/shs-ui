import request from '@/utils/request'
import api from './bytterAjax'

const contractApi = {
  customerUserList: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customerUser/get',
  eContractUrl: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/contract/eContract',
  customerUserAdd:  request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customerUser/list/add'
}

export function customerUserList (parameter) {
  return request({
    url: contractApi.customerUserList,
    method: 'post',
    data: parameter
  })
}


export function eContractUrl (parameter) {
  return request({
    url: contractApi.eContractUrl,
    method: 'post',
    data: parameter
  })
}


/**
 * 商户用户导入新增
 * @param data
 */
export function customerUserAdd(data) {
  return request({
    url: contractApi.customerUserAdd,
    method: 'post',
    data
  })
}

