<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="酬金账户交易流水查询">
      <div class="table-page-search-wrapper">
        <a-form :form="form" layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="交易日期">
                <a-range-picker v-decorator="['startTime-endTime']"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="收方账户名">
                <a-input v-decorator="['payeeAccName']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="收方账号">
                <a-input v-decorator="['payerAcc']"></a-input>
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
  import { getPayFlowRecordList } from '@/api/customer'
  import { Ellipsis } from '@/components'
const columns = [
  {
    title: '商户名称',
    dataIndex: 'customerName',
  },
  {
    title: '订单号',
    dataIndex: 'payId',
  },
  {
    title: '落地公司',
    dataIndex: 'landName',
  },
  {
    title: '收方户名',
    dataIndex: 'payeeAccName',
  },
  {
    title: '收方账号',
    dataIndex: 'payerAcc',
  },
  {
    title: '身份证号',
    dataIndex: 'pinNo',
  },
  {
    title: '交易金额',
    dataIndex: 'fee',
  },
  {
    title: '日期',
    dataIndex: 'returnTime',
    align:'right'
  },
]
export default {
  components: {
    Ellipsis,
  },
  name: 'AccDtl',
  data() {
    const formVm = this.$form.createForm(this)
    return {
      form: formVm,
      dataHandles: {
        listApi: getPayFlowRecordList,
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
    // this.loadAll() //模拟从后台获取数据后，显示数据，隐藏骨架屏
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