import request from '@/utils/request'

const contractApi = {
  agreementList: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/agreement/get',
  eContractUrl: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/contract/eContract',
}

export function agreementList (parameter) {
  return request({
    url: contractApi.agreementList,
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


