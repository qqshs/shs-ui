<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="商户详情">
      <a-descriptions title="商户信息">
        <a-descriptions-item label="商户名称">
          {{ customer.customerName }}
          <a-icon type="form" @click="updateCustomerBank" />   <a @click="changeCustomer">        切换商户</a>
        </a-descriptions-item>
        <a-descriptions-item label="统一社会信用代码">{{ customer.socialCreditCode }}</a-descriptions-item>
        <a-descriptions-item label="银行账号">{{ customer.bankAcc }}</a-descriptions-item>
        <a-descriptions-item label="开户户名">{{ customer.bankAccName }}</a-descriptions-item>
        <a-descriptions-item label="联行号">{{ customer.bankCode }}</a-descriptions-item>
        <a-descriptions-item label="开户行">{{ customer.bankName }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px" />
      <a-descriptions title="管理员信息">
        <a-descriptions-item label="管理员姓名">
          {{ customer.adminName }}
          <a-icon type="form" @click="updateCustomerAdmin" />
        </a-descriptions-item>
        <a-descriptions-item label="管理员手机号">{{ customer.adminPhone }}</a-descriptions-item>
        <a-descriptions-item label="管理员邮箱">{{ customer.adminMail }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="注册流程">
      <a-steps :current="this.step" progressDot>
        <a-step>
          <template v-slot:title>
            <span>注册申请</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              <div>{{ customer.registerTime }}</div>
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>注册审核</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              <div>{{ customer.approvalTime }}</div>
            </div>
          </template>
        </a-step>
        <a-step title="首次充值" />
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="平台账户详情">
      <a-descriptions title="平台账户余额">
        <a-descriptions-item label="账户余额">{{ number_format(customerBal.availBal) }}</a-descriptions-item>
        <a-descriptions-item label="未付金额">{{ number_format(customerBal.frzBal) }}</a-descriptions-item>
        <a-descriptions-item label="最后充值日期">{{ transTime }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px" />
      <a-descriptions title="平台账户充值记录"></a-descriptions>
      <a-table :columns="columns" rowKey="id" :data-source="data" :pagination="false" :bordered="true"></a-table>
    </a-card>
    <CustomerModalForm ref="CustomerModalForm" @ok="getCustomerDetail(customer.id)"></CustomerModalForm>
    <CustomerAdminModalForm ref="CustomerAdminModalForm" @ok="getCustomerDetail(customer.id)"></CustomerAdminModalForm>
    <ChangeCustomerModal ref="ChangeCustomerModal" @ok="init"></ChangeCustomerModal>
  </page-header-wrapper>
</template>

<script>
import { getCustomerDetail, getCustomerBal, getChangeRecord } from '@/api/customer'
import CustomerModalForm from './module/CustomerModalForm'
import CustomerAdminModalForm from './module/CustomerAdminModalForm'
import ChangeCustomerModal from './module/ChangeCustomerModal'
import { number_format } from '@/utils/number'
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
    align:'right',
    customRender: (text, row, index) => {
      return number_format(text)
    },
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
  name: 'CustomerDetails',
  components: {
    CustomerModalForm,
    CustomerAdminModalForm,
    ChangeCustomerModal,
    number_format,
  },
  data() {
    return {
      step:-1,
      transTime: '',
      customerBal: {
        availBal: '',
        frzBal: '',
      },
      customer: {
        customerName: '',
        socialCreditCode: '',
        bankAcc: '',
        bankAccName: '',
        bankCode: '',
        bankName: '',
        adminName: '',
        adminPhone: '',
        createTime: '',
        updateTime: '',
        registerTime:'',
        approvalTime:'',
        id: '',
      },
      columns,
      data,
    }
  },
  methods: {
    init(customerId){
      this.getCustomerDetail(customerId)
    },
    number_format(value){
      return number_format(value)
    },
    changeCustomer(){
      this.$refs.ChangeCustomerModal.show({ title: '商户公司',
        data: {
        } })
    },
    updateCustomerBank() {
      this.$refs.CustomerModalForm.show({ title: '商户详情',
        data: {
          customerName: this.customer.customerName,
          socialCreditCode: this.customer.socialCreditCode,
          bankAcc: this.customer.bankAcc,
          bankAccName: this.customer.bankAccName,
          bankCode: this.customer.bankCode,
          bankName: this.customer.bankName,
          customerId: this.customer.id,
        } })
    },
    updateCustomerAdmin(){
      this.$refs.CustomerAdminModalForm.show({ title: '管理员详情',
        data: {
          adminName: this.customer.adminName,
          adminPhone: this.customer.adminPhone,
          adminMail: this.customer.adminMail,
          customerId: this.customer.id,
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
          if (this.data[0]) {
            this.transTime = this.data[0].transTime
          }
          this.changeStep()
          // this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    changeStep(){
      if(this.customer.validSign === '0'){
        this.step = 0
        return
      }
      if(this.customer.registerTime){
        this.step = 0
      }
      if(this.customer.approvalTime){
        this.step = 1
      }
      if(this.transTime){
        this.step = 2
      }
    }
  },
  mounted() {
    this.getCustomerDetail()
  },
}
</script>

<style scoped>
</style>