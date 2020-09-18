import request from '@/utils/request'
import api from './bytterAjax'

const statementApi = {
  rechargeOrderList: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/rechargeRecord/get',
  sendOrderList: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/payBillBank/get',
}

export function rechargeOrderList (parameter) {
  return request({
    url: statementApi.rechargeOrderList,
    method: 'post',
    data: parameter
  })
}

export function sendOrderList (parameter) {
  return request({
    url: statementApi.sendOrderList,
    method: 'post',
    data: parameter
  })
}

