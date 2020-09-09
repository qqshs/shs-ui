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
          </a-row>
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-button type="primary" @click="refresh">查询</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>

    <a-card :bordered="false">
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
import { getChangeRecordList } from '@/api/customer'
import { Ellipsis } from '@/components'

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
  },
  name: 'AccBal',
  data() {
    const formVm = this.$form.createForm(this)
    return {
      form: formVm,
      dataHandles: {
        listApi: getChangeRecordList,
        form: formVm,
        handleRequest: (req) => {},
        handleResponse: (res) => {},
        initialParams: {},
      },
      columns,
      loading: true,
    }
  },
  mounted() {
  },
  methods: {
    refresh() {
      this.$refs.table.refresh(true)
    },

  },
}
</script>

<style scoped>
</style>