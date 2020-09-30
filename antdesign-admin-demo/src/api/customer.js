import request from '@/utils/request'

const customerApi = {
  addCustomer: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customer/add',
  getAllLand: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customer/getAllLand',
  updateCustomerBank: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customer/update/bank',
  updateCustomerAdmin: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customer/update/admin',
  getCustomerDetail: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/customer/detail',
  getCustomerBal: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/change/getCustomerBal',
  getChangeRecord: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/change/getChangeRecord',
  getChangeRecordList: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/change/getChangeRecordList',
  getPayFlowRecordList: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/payFlow/getPayFlowRecordList',
}

export function getAllLand (parameter) {
  return request({
    url: customerApi.getAllLand,
    method: 'post',
    data: parameter
  })
}

export function updateCustomerBank (parameter) {
  return request({
    url: customerApi.updateCustomerBank,
    method: 'post',
    data: parameter
  })
}

export function updateCustomerAdmin (parameter) {
  return request({
    url: customerApi.updateCustomerAdmin,
    method: 'post',
    data: parameter
  })
}

export function registerCustomer (parameter) {
  return request({
    url: customerApi.addCustomer,
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

export function getChangeRecordList (parameter) {
  return request({
    url: customerApi.getChangeRecordList,
    method: 'post',
    data: parameter
  })
}

export function getPayFlowRecordList (parameter) {
  return request({
    url: customerApi.getPayFlowRecordList,
    method: 'post',
    data: parameter
  })
}
