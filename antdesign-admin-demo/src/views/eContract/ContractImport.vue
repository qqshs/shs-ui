<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="用户导入">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="导入日期">
                <a-range-picker v-model="searchDate" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-button type="primary">查询</a-button>
            </a-col>

            <a-col :md="8" :sm="24">
                <UploadButton title="导入" request-url="/billCheck/importProvInfo" @afterUpload="afterUpload" />
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false" :loading="loading">
      <div class="table-operator">
        <a-table :columns="columns" :bordered="true" :data-source="data" :pagination="true"></a-table>
      </div>
      


       <s-table
    ref="table"
    size="default"
    :rowKey="(record) => record.data.id"
    :columns="columns"
    :data="loadData"
    :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
  >
  </s-table>





    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getCustomerDetail } from '@/components'
import UploadButton from '@/components/_pageSearch/UploadButton'

export default {
  name: 'ContractImport',
  components: {
      getCustomerDetail
    },
    data() {
      return {
        columns: [
          {
            title: '批次号',
            dataIndex: 'batch'
          },
          {
            title: '姓名',
            dataIndex: 'name'
          },
          {
            title: '身份证号',
            dataIndex: 'pinNo',
          },
          {
            title: '手机号码',
            dataIndex: 'phoneNo',
          },
          {
            title: '银行卡号',
            dataIndex: 'bankAcc',
          },
          {
            title: '合同类型',
            dataIndex: 'customerLand',
          },
          {
            title: '导入日期',
            dataIndex: 'createTime',
          }
        ],
        // 查询条件参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return this.$http.get('/service', {
            params: Object.assign(parameter, this.queryParam)
          }).then(res => {
            return res.result
          })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
  mounted() {
    this.loadAll() //模拟从后台获取数据后，显示数据，隐藏骨架屏
  },
  methods: {
    loadAll() {
      //加载完数据后，隐藏骨架屏

      this.loading = false
    },
   afterUpload(res) {
      // 导入匹配分公司
      if (res.code === 0) {
        this.$message.success({
          message: res.msg || '导入成功！',
          duration: 5 * 1000
        })
      } else {
        this.$message.error(res.msg)
      }
      this.loadData()
    },
    prov: function() {
      // 各省汇总对账单
      this.$confirm('各省汇总对账单导出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = this.queryParam
        params.templetType = 'export'
        params.exportType = 'excel'
        params.sumFlag = 'prov'
        params.exportDemension = 'group'
        params.resCode = '700001'
        params.billGroup = 'prov'
        exportDataExcel(params, '/billCheck/billExport', this.getFileName('各省汇总账单'))
      })
    },
  },
}
</script>

<style scoped>
</style>