import request from '@/utils/request'

const managementApi = {
  getCustomerList: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/management/getCustomerList',
  reviewCustomer: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/management/reviewCustomer',
  getBalDtl: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/management/getBalDtl',
  reviewBalDtl: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/management/reviewBalDtl',
}

export function getBalDtl (parameter) {
  return request({
    url: managementApi.getBalDtl,
    method: 'post',
    data: parameter
  })
}

export function reviewBalDtl (parameter) {
  return request({
    url: managementApi.reviewBalDtl,
    method: 'post',
    data: parameter
  })
}

export function getCustomerList (parameter) {
  return request({
    url: managementApi.getCustomerList,
    method: 'post',
    data: parameter
  })
}

export function reviewCustomer (parameter) {
  return request({
    url: managementApi.reviewCustomer,
    method: 'post',
    data: parameter
  })
}