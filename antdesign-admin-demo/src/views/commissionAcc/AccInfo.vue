<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="酬金账户详情">
      <a-descriptions title="账户详情">
        <a-descriptions-item label="商户名称">{{ customer.customerName }}   <a @click="changeCustomer">        切换商户</a></a-descriptions-item>
        <a-descriptions-item label="开户户名">{{ customer.bankAccName }}</a-descriptions-item>
        <a-descriptions-item label="银行账号">{{ customer.bankAcc }}</a-descriptions-item>
        <a-descriptions-item label="账户余额">
          {{ customerBal.availBal }}
          <a-tooltip placement="right">
            <template slot="title" >
              刷新余额
            </template>
            <a-icon type="reload" style="margin-left: 8px" @v-on:click="getCustomerBal"/>
          </a-tooltip>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="账户充值记录">
      <a-table
        :columns="columns"
        rowKey="id"
        :data-source="data"
        :pagination="false"
      >
      </a-table>
    </a-card>
    <ChangeCustomerModal ref="ChangeCustomerModal" @ok="init"></ChangeCustomerModal>
  </page-header-wrapper>
</template>

<script>
  import { getCustomerDetail,getCustomerBal,getChangeRecord } from '@/api/customer'
  import ChangeCustomerModal from '../customer/module/ChangeCustomerModal'
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
const data = []
export default {
  name: 'AccInfo',
  components: {
    ChangeCustomerModal,
  },
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
    init(customerId){
      this.getCustomerDetail(customerId)
    },
    changeCustomer(){
      this.$refs.ChangeCustomerModal.show({ title: '商户公司',
        data: {
        } })
    },
    getCustomerDetail(customerId) {
      const param = {}
      if(customerId){
        param.customerId = customerId
      }
      getCustomerDetail(param).then((res) => {
        if (res.code === 0) {
          if (res.data) {
            this.customer = res.data
          }
          this.getChangeRecord(this.customer.id)
          this.getCustomerBal(this.customer.id)
          // this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    getCustomerBal(customerId) {
      const param = {}
      if(customerId){
        param.customerId = customerId
      }
      getCustomerBal(param).then((res) => {
        if (res.code === 0) {
          if (res.data[0]) {
            this.customerBal = res.data[0]
          }
          // this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    getChangeRecord(customerId) {
      const param = {}
      if(customerId){
        param.customerId = customerId
      }
      getChangeRecord(param).then((res) => {
        if (res.code === 0) {
          if (res.data) {
            this.data = res.data
          }
          // this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>

</style>