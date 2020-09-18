<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="酬金发放查询">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="提交日期">
                <a-range-picker v-decorator="['startDate-endDate']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="交易日期">
                <a-range-picker v-decorator="['transStartDate-transEndDate']" />
              </a-form-item>
            </a-col>
            <!-- <template v-if="advanced"> -->
            <a-col :md="8" :sm="24" v-show="advanced">
              <a-form-item label="姓名">
                <a-input v-decorator="['payeeAccName']" class="input"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24" v-show="advanced">
              <a-form-item label="收款账户">
                <a-input v-decorator="['payeeAcc']" class="input"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" v-show="advanced">
              <CustomerSelect
                ref="CustomerSelect"
                :localStyle="{width:'200px'}"
                :localDecorator="['customerIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
                @change="initLandSelect"
              ></CustomerSelect>
            </a-col>
            <a-col :md="8" :sm="24" v-show="advanced">
              <CustomerLandSelect
                ref="refCustomerLandSelect"
                :localStyle="{width:'200px'}"
                :localDecorator="['landIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
              ></CustomerLandSelect>
            </a-col>
            <a-col :md="8" :sm="24" v-show="advanced">
              <enum-select enumCode="billFromType" ref="enumCode" :decorator="['billFromTypes']"></enum-select>
            </a-col>
            <!-- </template> -->
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
        <tag-select @change="fliterTable" v-if="filterOptions.length>0" style="float:right;">
          <tag-select-option
            v-for="val in filterOptions"
            :key="val.code"
            :value="val.code"
          >{{ val.name }}</tag-select-option>
        </tag-select>
        <ExportExcel fileName="发放订单" :form="form" :listApi="exports()" :columns="columns"></ExportExcel>
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
import { formatDateTime, getTagSelected } from '@/utils/util'
import CustomerSelect from '@/components/Select/CustomerSelect' // 自定义 枚举下拉
import { GetEnumItems } from '@/api/bytterAjax'
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
const TagSelectOption = TagSelect.Option
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
    title: '交易状态',
    dataIndex: 'voucherStatName',
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
    dataIndex: 'feeIn',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '反馈结果',
    dataIndex: 'returnMsg',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '订单提交时间',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '交易时间',
    dataIndex: 'returnTime',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '发放方式',
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
]

const cardList = [
  {
    key: '',
    tab: '全部',
  },
  {
    key: '0',
    tab: '交易成功',
  },
  {
    key: '2',
    tab: '交易失败',
  },
  {
    key: '3',
    tab: '待发送',
  },
]

export default {
  components: {
    STable,
    Ellipsis,
    CustomerSelect,
    TagSelect,
    TagSelectOption,
    ExportExcel,
  },

  data() {
    const formVm = this.$form.createForm(this)
    return {
      selectedFilters: [],
      cardList: cardList,
      key: 'tab1',
      voucherStat: '',
      filterOptions: [],
      form: formVm,
      advanced: false,
      dataHandles: {
        listApi: commissionPayQuery,
        form: formVm,
        handleRequest: async (req) => {
          if (!req.customerIds || req.customerIds.length === 0) {
            req.customerIds = await this.$refs.CustomerSelect.getSelectAllValues()
          }

          if (!req.landIds || req.landIds.length === 0) {
            req.landIds = await this.$refs.refCustomerLandSelect.getSelectAllValues()
          }

          if (!req.billFromTypes || req.billFromTypes.length === 0) {
            req.billFromTypes = await this.$refs.enumCode.getSelectAllValues()
          }

          return req
        },
        initialParams: {
          billStatuss: [],
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
  mounted() {
    this.getFilterOptions()
  },
  methods: {
    refresh() {
      this.$refs.table.refresh(true)
    },
    fliterTable(v) {
      this.dataHandles.initialParams.billStatuss = getTagSelected({
        current: v,
        options: this.filterOptions,
        selectedKeys: this.dataHandles.initialParams.billStatuss,
      })
      this.$refs.table.refresh(true)
    },
    getFilterOptions() {
      GetEnumItems({ code: 'billAllStatus' }).then((res) => {
        if (res.code === 0) {
          this.filterOptions = res.data.dict
        }
      })
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onTabChange(key, type) {
      // debugger
      this.voucherStat = key
      this.$nextTick(() => {
        key = key === '' ? undefined : key
        this.form.setFieldsValue({
          billStatuss: [key],
        })

        this.form.getFieldsValue(['billStatuss'])
        this.refresh()
      })
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

<style >
.input {
  width: 300px;
}
</style>