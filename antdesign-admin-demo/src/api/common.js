import request from '@/utils/request'

const api = {
  dictionary: request.bytterRouter.businessBasic + '/businessBasic/dict/getDictByCodeAndType',
  customerLandSelect: request.bytterRouter.bytterEdmPay + '/bytterEdmPay/ajax/customerLandSelect',
  customerUserAdd:  request.bytterRouter.bytterEdmPay + '/bytterEdmPay/file/customerUser/list/add'
}
// 传参：code(字典组的code。唯一标识该下拉/radio的编码。sys_dict_group的code字段)

export default api

export function GetEnumItems(parameter) {
  return request({
    url: api.dictionary,
    method: 'post',
    data: parameter
  })
}

// export function exportDataExcel(params, url, fileName, methodType = 'post') {
export function exportDataExcel({ method, url, fileName, params }) {
  request({
    method,
    responseType: 'blob', // 防止返回乱码
    url,
    [method == 'post' ? 'data' : 'params']: params
  }).then(res => {
    if (res.status === 200) {
      const data = res.data
      if (!data) {
        console.error('导出/下载 失败，解析数据为空！')
        return
      }
      // const datetime = Date.now();
      // 创建一个新的url，此url指向新建的Blob对象
      const url = window.URL.createObjectURL(new Blob([data]))
      // 创建a标签，并隐藏改a标签
      const link = document.createElement('a')
      link.style.display = 'none'
      // a标签的href属性指定下载链接
      link.href = url
      // setAttribute() 方法添加指定的属性，并为其赋指定的值。
      fileName = fileName || '导出excel.xlsx'
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      // this.$message.success('导出成功');
      // this.modal3 = false
    } else {
      console.error('下载/导出失败，请尝试重新导出')
    }
  }).catch(function (error) {
    console.error(error)
  })
}

export function customerLandSelect() {
  return request({
    url: api.customerLandSelect,
    method: 'post',
    data:{}
  })
}

export function customerUserAdd(data) {
  return request({
    url: api.customerUserAdd,
    method: 'post',
    data
  })
}

