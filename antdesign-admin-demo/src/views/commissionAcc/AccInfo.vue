<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="酬金账户详情">
      <a-descriptions title="账户详情">
        <a-descriptions-item label="商户名称">{{customer.customerName}}</a-descriptions-item>
        <a-descriptions-item label="开户户名">{{customer.bankAccName}}</a-descriptions-item>
        <a-descriptions-item label="银行账号">{{customer.bankAcc}}</a-descriptions-item>
        <a-descriptions-item label="账户余额">
          {{customerBal.availBal}}
          <a-tooltip placement="right">
            <template slot="title" >
              刷新余额
            </template>
            <a-icon type="reload" style="margin-left: 8px" v-on:click="getCustomerBal"/>
          </a-tooltip>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="账户充值记录">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
      >
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { getCustomerDetail,getCustomerBal,getChangeRecord } from '@/api/customer'
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
const data = []
export default {
  name: 'AccInfo',
  data(){
    return{
      customerBal: {
      },
      customer: {
      },
      columns,
      data
    }
  },
  methods: {
    getCustomerDetail(){
      getCustomerDetail({ }).then((res) => {
        if (res.code === 0) {
          this.customer = res.data
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    getCustomerBal(){
      getCustomerBal({  }).then((res) => {
        if (res.code === 0) {
          this.customerBal = res.data[0]
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    getChangeRecord(){
      getChangeRecord({  }).then((res) => {
        if (res.code === 0) {
          this.data = res.data
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
  },
  mounted() {
    this.getCustomerDetail()
    this.getCustomerBal()
    this.getChangeRecord()
  },
}
</script>

<style scoped>

</style>