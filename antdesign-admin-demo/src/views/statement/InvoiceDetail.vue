<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="发票管理">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="开票时间">
                  <a-range-picker v-model="createTime" />
                </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="商户名称">
                <a-input v-model="pinNo"></a-input>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="发票类型">
                  <a-input v-model="batchNo"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <enum-select
                  enumCode="voucherStat"
                  ref="enumCode"
                  :decorator="['status', { rules: []}]"
                ></enum-select>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false">
      <div class="table-operator">
        <a-button type="primary" @click="handleAdd">导出</a-button>
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <div class="table-operator">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :dataHandles="dataHandles"
          showPagination="auto"
        ></s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { Ellipsis } from '@/components'
import { agreementList } from '@/api/econtract'

import StepByStepModal from '@/views/list/modules/StepByStepModal'
import CreateForm from '@/views/list/modules/CreateForm'

const columns = [
  {
    title: '开票时间',
    dataIndex: 'id',
  },
  {
    title: '客户公司',
    dataIndex: 'userCreateTime',
  },
  {
    title: '发票类目',
    dataIndex: 'userBatchNo',
  },
  {
    title: '发票类型',
    dataIndex: 'userName',
  },
  {
    title: '发票代码',
    dataIndex: 'userPinNo',
  },
  {
    title: '发票号码',
    dataIndex: 'userPhoneNo',
  },
  {
    title: '商户名称',
    dataIndex: 'customerName',
  },
  {
    title: '金额',
    dataIndex: 'landName',
  },
  {
    title: '税额',
    dataIndex: 'agreementStatus',
  },
  {
    title: '价税合计',
    dataIndex: 'agreementStatus',
  }
  // ,
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   width: '150px',
  //   scopedSlots: { customRender: 'action' }
  // }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭',
  },
  1: {
    status: 'processing',
    text: '运行中',
  },
  2: {
    status: 'success',
    text: '已上线',
  },
  3: {
    status: 'error',
    text: '异常',
  },
}

export default {
  components: {
    Ellipsis,
    CreateForm,
    StepByStepModal,
  },
  name: 'RechargeOrder',
  data() {
    const formVm = this.$form.createForm(this)
    return {
      form: formVm,
      dataHandles: {
        listApi: agreementList,
        form: formVm,
        
        initialParams: {},
      },
      columns,
      loading: true,
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        namem: '',
        batchNo: '',
        pinNo: '',
        dataIndex: '',
        customerLandId: '',
        createTime: '',
        status: '',
      },
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  methods: {
    handleAdd() {
      this.mdl = null
      this.visible = true
    },
    handleEdit(record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk() {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then((res) => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then((res) => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date()),
      }
    },
  },
}
</script>

<style scoped>
</style>