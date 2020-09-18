<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="发放订单处理">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="提交日期">
                <a-range-picker v-decorator="['startDate-endDate']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="收款姓名">
                <a-input v-decorator="['payeeAccName']" class="input"></a-input>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <CustomerSelect
                  :localStyle="{width:'200px'}"
                  :localDecorator="['customerIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
                  @change="initLandSelect"
                ></CustomerSelect>
              </a-col>
              <a-col :md="8" :sm="24">
                <CustomerLandSelect
                  ref="refCustomerLandSelect"
                  :localStyle="{width:'200px'}"
                  :localDecorator="['landIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
                ></CustomerLandSelect>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收款账户">
                  <a-input v-decorator="['payeeAcc']" class="input"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <enum-select enumCode="billFromType" ref="enumCode" :decorator="['billFromTypes']"></enum-select>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="refresh">查询</a-button>
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

    <a-card :bordered="false">
      <div class="table-operator">
        <!--<tag-select @change="fliterTable" v-if="filterOptions.length>0" style="float:right;">
          <tag-select-option
            v-for="val in filterOptions"
            :key="val.code"
            :value="val.code"
          >{{ val.name }}</tag-select-option>
        </tag-select>-->
        <ExportExcel
          fileName="待处理发放订单"
          :form="form"
          :listApi="dataHandles.listApi"
          :columns="columns"
        ></ExportExcel>
        <!-- <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button> -->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1">
              <a-icon type="addPay" @click="aa" />提交付款
            </a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2">
              <a-icon type="delete" @click="bb" />删除
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <div class="table-operator">
        <s-table
          ref="table"
          rowKey="id"
          :columns="columns"
          :dataHandles="dataHandles"
          :showAlert="true"
          :rowSelection="rowSelection"
          showPagination="auto"
          bordered
        >
          <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        </s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis, ExportExcel } from '@/components'
import { commissionPayQuery } from '@/api/commissionPay'
import { formatDateTime } from '@/utils/util'
import CustomerSelect from '@/components/Select/CustomerSelect' // 自定义 枚举下拉
import { GetEnumItems } from '@/api/bytterAjax'
import { StandardFormRow, ArticleListContent } from '@/components'

const scrolls = { x: true, y: true }
const columns = [
  // {
  //   title: '#',
  //   scopedSlots: { customRender: 'serial' },
  // },
  {
    title: '商户名称',
    dataIndex: 'customerName',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '落地名称',
    dataIndex: 'landName',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '商户订单号',
    dataIndex: 'customerPayId',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '收款人',
    dataIndex: 'payeeAccName',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '收款人身份证',
    dataIndex: 'pinNo',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '收款账号',
    dataIndex: 'payeeAcc',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '发放金额',
    dataIndex: 'fee',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '订单来源',
    dataIndex: 'blllFromName',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '单据备注',
    dataIndex: 'remark',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '订单提交时间',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    fixed: 'right',
  },
]
export default {
  components: {
    STable,
    Ellipsis,
    CustomerSelect,
    ExportExcel,
  },

  data() {
    const formVm = this.$form.createForm(this)
    return {
      selectedFilters: [],
      key: 'tab1',
      voucherStat: '',
      filterOptions: [],
      form: formVm,
      advanced: false,
      dataHandles: {
        listApi: commissionPayQuery,
        form: formVm,
        handleRequest: (req) => {
          return req
        },
        handleResponse: (res) => {},
        initialParams: {
          billStatuss: [0],
        },
      },
      columns,
      scrolls,
      loading: true,
      selectedRowKeys: [],
      selectedRows: [],
      customerIds: [],
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
  // watch:{
  //   'customerIds':function(oldValue,newValue) {
  //     console.info(oldValue+"=="+newValue)
  //     this.searchCustomerIds = newValue instanceof String ? [newValue] : newValue
  //     this.$refs.refCustomerLandSelect.reload()
  //   }
  // },
  mounted() {},
  methods: {
    refresh() {
      this.$refs.table.refresh(true)
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    initLandSelect(v) {
      this.$refs.refCustomerLandSelect.initSelectOptions(v instanceof Array ? v : [v])
      this.form.resetFields(['landIds'])
    },
  },
}
</script>

<style >
.input {
  width: 300px;
}
</style>