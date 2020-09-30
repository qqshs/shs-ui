<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="发放对账单">
      <div class="table-page-search-wrapper">
        <a-form :form="form" layout="inline" class="bytter-search-lable">
          <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="交易日期">
                <a-range-picker v-decorator="[ 'startDate-endDate']" />
              </a-form-item>
              </a-col>
            <a-col :md="8" :sm="24">
                <a-form-item label="订单号">
                    <a-input v-decorator="['id']" class="input"></a-input>
                </a-form-item>
            </a-col>
             <div v-show="advanced">
                 <a-col :md="8" :sm="24">
              <a-form-item label="收款人姓名">
                <a-input v-decorator="['name']" class="input"></a-input>
              </a-form-item>
            </a-col>
                <a-col :md="8" :sm="24">
                    <a-form-item label="收款账号">
                        <a-input v-decorator="['bankAcc']" class="input"></a-input>
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
                  enumCode="billFromType"
                  ref="enumCode"
                  :decorator="['billFroms', { rules: []}]"
                ></enum-select>
              </a-col>
            </div>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
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
        <ExportExcel fileName="发放对账单" :form="form" :listApi="exports()" :columns="columns"></ExportExcel>
      </div>

      <div class="table-operator">
        <s-table
          ref="table"
          size="default"
          rowKey="billId"
          :columns="columns"
          :dataHandles="dataHandles"
          showPagination="auto"
          :scroll="{ x: 3000 }"
        ></s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>


<script>
import moment from 'moment'
import { Ellipsis,ExportExcel } from '@/components'
import { sendOrderList } from '@/api/statement'
import StepByStepModal from '@/views/list/modules/StepByStepModal'
import CreateForm from '@/views/list/modules/CreateForm'
import CustomerSelect from '@/components/Select/CustomerSelect' // 自定义 枚举下拉
import { number_format } from '@/utils/number'

const columns = [
  {
    title: '商户订单号',
    dataIndex: 'billId',
    align: 'center',
    width: 300
  },
  {
    title: '付款订单号',
    dataIndex: 'payId',
    align: 'center',
    width: 300
  },
  {
    title: '收款人姓名',
    dataIndex: 'name',
    align: 'center',
    width: 180
  },
   {
    title: '收款人身份证号',
    dataIndex: 'pinNo',
    align: 'center',
    width: 240
  },
   {
    title: '收款人手机号',
    dataIndex: 'phoneNo',
    align: 'center',
    width: 180
  },
  {
    title: '收款人所属公司',
    dataIndex: 'customerName',
    align: 'center',
    ellipsis: true,
    width: 260
  },
  {
    title: '收款账号',
    dataIndex: 'bankAcc',
    align: 'center',
    width: 260
  },
  {
    title: '落地公司',
    dataIndex: 'landName',
    align: 'center',
    ellipsis: true,
    width: 260
  },
  {
    title: '金额',
    dataIndex: 'fee',
    align: 'right',
    width: 180,
    customRender: (text, row, index) => {
      return number_format(text)
    },
  },
  {
    title: '税后佣金',
    dataIndex: 'feeIn',
    align: 'right',
    width: 180,
    customRender: (text, row, index) => {
      return number_format(text)
    },
  },
  {
    title: '纳税金额',
    dataIndex: 'feeTax',
    align: 'right',
    width: 180,
    customRender: (text, row, index) => {
      return number_format(text)
    },
  },
  {
    title: '复审人',
    dataIndex: 'checkUser',
    align: 'center',
    width: 180
  },
  {
    title: '来源',
    dataIndex: 'billFrom',
    align: 'center',
    width: 180
  },
  {
    title: '交易时间',
    dataIndex: 'createTime',
    align: 'center',
    width: 240
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
    ExportExcel,
    number_format,
  },
  name: 'SendOrder',
  data() {
    const formVm = this.$form.createForm(this)
    return {
      form: formVm,
      dataHandles: {
        listApi: sendOrderList,
        form: formVm,
        handleRequest: async (req) => {
          if (!req.customerIds || req.customerIds.length === 0) {
            req.customerIds = await this.$refs.CustomerSelect.getSelectAllValues()
          }

          if (!req.landIds || req.landIds.length === 0) {
            req.landIds = await this.$refs.refCustomerLandSelect.getSelectAllValues()
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
      return this.selectedRows.length === 0
        ? this.dataHandles.listApi
        : () => Promise.resolve({ data: this.selectedRows, code: 0 })
    },
  },
}
</script>

<style scoped>
</style>