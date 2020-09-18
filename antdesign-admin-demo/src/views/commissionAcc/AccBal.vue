<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="酬金账户充值查询">
      <div class="table-page-search-wrapper">
        <a-form :form="form" layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="充值日期">
                <a-range-picker v-decorator="['startTime-endTime']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <enum-select
                enumCode="voucherStat"
                ref="enumCode"
                :decorator="['status', { rules: []}]"
              ></enum-select>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <CustomerSelect
                  mode="multiple"
                  :localDecorator="['customerIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
                ></CustomerSelect>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="refresh">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => form.resetFields()">重置</a-button>
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
<!--        <ExportExcel fileName="充值记录" :form="form" :listApi="dataHandles.listApi" :columns="columns"></ExportExcel>-->

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
import { getChangeRecordList } from '@/api/customer'
import { Ellipsis, ExportExcel } from '@/components'
import CustomerSelect from '@/components/Select/CustomerSelect'
const columns = [
  {
    title: '商户名称',
    dataIndex: 'customerName',
  },
  {
    title: '付款银行',
    dataIndex: 'bankName',
  },
  {
    title: '付款银行卡',
    dataIndex: 'payerAcc',
  },
  {
    title: '落地公司',
    dataIndex: 'landName',
  },
  {
    title: '充值金额',
    dataIndex: 'money',
  },
  {
    title: '状态',
    dataIndex: 'statusName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '交易时间',
    dataIndex: 'transTime',
  },
]
export default {
  components: {
    Ellipsis,
    ExportExcel,
    CustomerSelect,
  },
  name: 'AccBal',
  data() {
    const formVm = this.$form.createForm(this)
    return {
      form: formVm,
      dataHandles: {
        listApi: getChangeRecordList,
        form: formVm,
        initialParams: {},
      },
      columns,
      loading: true,
      // 高级搜索 展开/关闭
      advanced: false,
    }
  },
  mounted() {},
  methods: {
    refresh() {
      this.$refs.table.refresh(true)
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
  },
}
</script>

<style scoped>
</style>