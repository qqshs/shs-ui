import request from '@/utils/request'

const api = {
  dictionary: request.bytterRouter.businessBasic + '/businessBasic/dict/getDictByCodeAndType',
  customerSelect: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/ajax/customerSelect',
  customerLandSelect: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/ajax/customerLandSelect',
  preImport: request.bytterRouter.fileService + '/fileService/preImport',
  importFile: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/fileService/save/importFile',
}

export default api

/**
 * 字典下拉
 * @param parameter
 * @constructor
 */
export function GetEnumItems(parameter) {
  return request({
    url: api.dictionary,
    method: 'post',
    data: parameter
  })
}

/**
 * 商户下拉
 */
export function CustomerSelect() {
  return request({
    url: api.customerSelect,
    method: 'post',
    data:{}
  })
}

/**
 * 商户落地下拉
 */
export function customerLandSelect(param) {
  return request({
    url: api.customerLandSelect,
    method: 'post',
    data:param
  })
}
/**
 * 文件导入解析
 */
export function preImport(param) {
  return request({
    url: api.preImport,
    method: 'post',
    data:param
  })
}

/**
 * 上传文件并且添加到文件记录表
 */
export function importFile(param) {
  return request({
    url: api.importFile,
    method: 'post',
    data:param
  })
}


