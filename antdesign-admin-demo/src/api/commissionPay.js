import request from '@/utils/request'

const api = {
  commissionPayQuery: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/commissionPay/commissionPayQuery',
  commissionPayImport: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/commissionPay/commissionPayImport',
  commissionAddToPay: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/commissionPay/commissionAddToPay',
  commissionPayDelete: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/commissionPay/commissionPayDelete',
  checkCustomerBal: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/commissionPay/checkCustomerBal',
}

export default api

/**
 * 发放查询
 * @param parameter
 * @constructor
 */
export function commissionPayQuery(parameter) {
  return request({
    url: api.commissionPayQuery,
    method: 'post',
    data: parameter
  })
}


/**
 * 发放查询
 * @param parameter
 * @constructor
 */
export function commissionPayImport(parameter) {
  return request({
    url: api.commissionPayImport,
    method: 'post',
    data: parameter
  })
}

/**
 * 发放付款提交
 * @param parameter
 * @constructor
 */
export function commissionAddToPay(parameter) {
  return request({
    url: api.commissionAddToPay,
    method: 'post',
    data: parameter
  })
}
/**
 * 发放清单删除
 * @param parameter
 * @constructor
 */
export function commissionPayDelete(parameter) {
  return request({
    url: api.commissionPayDelete,
    method: 'post',
    data: parameter
  })
}

/**
 * 校验该批单据所属商户的余额是否充足
 * @param parameter
 * @constructor
 */
export function checkCustomerBal(parameter) {
  return request({
    url: api.checkCustomerBal,
    method: 'post',
    data: parameter
  })
}
