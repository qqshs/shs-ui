import request from '@/utils/request'
import api from './bytterAjax'

const contractApi = {
  customerUserList: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/agreement/get',
  customerUserAdd:  request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customerUser/list/add',

  //用户签约
  identityAuthUrl: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/contract/identityAuth',
  eContractUrl: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/contract/eContract',
  signCustomerSelect:  request.bytterRouter.bytterEdmPay + '/bytterEdmPay/ajaxSign/customerSelect',
  signLandSelect:  request.bytterRouter.bytterEdmPay + '/bytterEdmPay/ajaxSign/customerLandSelect'
}

export function customerUserList (parameter) {
  return request({
    url: contractApi.customerUserList,
    method: 'post',
    data: parameter
  })
}

export function identityAuthUrl (parameter) {
    return request({
      url: contractApi.identityAuthUrl,
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


/**
 * 商户下拉
 * @param data
 */
export function signCustomerSelect(data) {
    return request({
      url: contractApi.signCustomerSelect,
      method: 'post',
      data
    })
  }


  /**
 * 落地下拉
 * @param data
 */
export function signLandSelect(data) {
    return request({
      url: contractApi.signLandSelect,
      method: 'post',
      data
    })
  }
