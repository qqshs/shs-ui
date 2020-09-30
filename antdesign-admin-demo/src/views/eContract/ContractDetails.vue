<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="签约详情">
      <div class="table-page-search-wrapper">
        <a-form :form="form" layout="inline" class="bytter-search-lable">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="交易日期">
                <a-range-picker v-decorator="['startDate-endDate']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户名">
                <a-input v-decorator="['name']" class="input"></a-input>
              </a-form-item>
            </a-col>
            <div v-show="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="身份证号">
                  <a-input v-decorator="['pinNo']" class="input"></a-input>
                </a-form-item>
              </a-col>
           <!-- <template v-if="advanced">-->
              <a-col :md="8" :sm="24">
                <a-form-item label="批次号">
                  <a-input v-decorator="['batchNo']" class="input"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <CustomerSelect
                  ref="CustomerSelect"
                  :localDecorator="['customerIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
                  @change="initLandSelect"
                ></CustomerSelect>
              </a-col>
              <a-col :md="8" :sm="24">
               <CustomerLandSelect
                  ref="refCustomerLandSelect"
                  :localDecorator="['landIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
                ></CustomerLandSelect>
              </a-col>
              <a-col :md="8" :sm="24">
                <enum-select
                  enumCode="signAllState"
                  ref="enumCode"
                  :decorator="['agreementStatus', { rules: []}]"
                ></enum-select>
              </a-col>
            </div>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="$refs.table.refresh()">查询</a-button>
                <a-button style="margin-left: 8px" @click="form.resetFields()">重置</a-button>
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
        <ExportExcel fileName="签约详情" :form="form" :listApi="exports()" :columns="columns"></ExportExcel>
      </div>

      <div class="table-operator">
        <s-table
          ref="table"
          size="default"
          rowKey="customerUserId"
          :columns="columns"
          :dataHandles="dataHandles"
          showPagination="auto"
          :scroll="{ x: 2400 }"
        ></s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { Ellipsis,ExportExcel } from '@/components'
import { customerUserList } from '@/api/econtract'
import CustomerSelect from '@/components/Select/CustomerSelect' // 自定义 枚举下拉
import StepByStepModal from '@/views/list/modules/StepByStepModal'
import CreateForm from '@/views/list/modules/CreateForm'

const columns = [
  {
    title: '签约人姓名',
    dataIndex: 'userName',
    align: 'center',
    width:120
  },
  {
    title: '签约人身份证号',
    dataIndex: 'userPinNo',
    align: 'center',
    width:160
  },
  {
    title: '签约人手机号',
    dataIndex: 'userPhoneNo',
    align: 'center',
    width:160
  },
  {
    title: '商户名称',
    dataIndex: 'customerName',
    align: 'center',
    ellipsis: true,
    width:240
  },
  {
    title: '落地公司',
    dataIndex: 'landName',
    align: 'center',
    ellipsis: true,
    width:240
  },
  {
    title: '签约状态',
    dataIndex: 'agreementStatus',
    align: 'center',
    width:180
  },
   {
    title: '签约编号',
    dataIndex: 'customerUserId',
    align: 'center',
    width: 260
  },
  {
    title: '批次号',
    dataIndex: 'userBatchNo',
    align: 'center',
     width:260
  },
   {
    title: '导入时间',
    dataIndex: 'userCreateTime',
    align: 'center',
    width:180
  }
  // ,
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   width: '150px',
  //   scopedSlots: { customRender: 'action' }
  // }
]

export default {
  components: {
    Ellipsis,
    CreateForm,
    StepByStepModal,
    CustomerSelect,
    ExportExcel,
  },
  data() {
    this.columns = columns
    const formVm = this.$form.createForm(this)
    return {
      form: formVm,
      dataHandles: {
        listApi: customerUserList,
        form: formVm,
        handleRequest: async (req) => {
          if (!req.customerIds || req.customerIds.length === 0) {
            req.customerIds = await this.$refs.CustomerSelect.getSelectAllValues()
          }
          if (!req.landIds || req.landIds.length === 0) {
            req.landIds = await this.$refs.refCustomerLandSelect.getSelectAllValues()
          }
          if (!req.signAllState || req.signAllState.length === 0) {
            req.signAllState = await this.$refs.enumCode.getSelectAllValues()
          }
          return req
        },
        handleResponse: (res) => {
        },
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
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
  methods: {
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
    initLandSelect(v) {
        this.$refs.refCustomerLandSelect.initSelectOptions(v instanceof Array ? v : [v])
        this.form.resetFields(['landIds'])
    },
    exports() {
        return this.selectedRows.length === 0 ? this.dataHandles.listApi : () => Promise.resolve({ data: this.selectedRows, code: 0 })
    },
  },
}
</script>

<style scoped>
</style>