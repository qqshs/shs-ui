import request from '@/utils/request'

const customerApi = {
  addCustomer: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customer/add',
  updateCustomer: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customer/update',
  getCustomerDetail: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customer/detail',
  getCustomerBal: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/change/getCustomerBal',
  getChangeRecord: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/change/getChangeRecord',
}

export function registerCustomer (parameter) {
  return request({
    url: customerApi.addCustomer,
    method: 'post',
    data: parameter
  })
}

export function updateCustomer (parameter) {
  return request({
    url: customerApi.updateCustomer,
    method: 'post',
    data: parameter
  })
}

export function getCustomerDetail (parameter) {
  return request({
    url: customerApi.getCustomerDetail,
    method: 'post',
    data: parameter
  })
}

export function getCustomerBal (parameter) {
  return request({
    url: customerApi.getCustomerBal,
    method: 'post',
    data: parameter
  })
}

export function getChangeRecord (parameter) {
  return request({
    url: customerApi.getChangeRecord,
    method: 'post',
    data: parameter
  })
}
