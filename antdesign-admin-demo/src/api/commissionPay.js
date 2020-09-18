import request from '@/utils/request'

const api = {
  commissionPayQuery: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/commissionPay/commissionPayQuery',
  commissionPayImport: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/commissionPay/commissionPayImport',
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
