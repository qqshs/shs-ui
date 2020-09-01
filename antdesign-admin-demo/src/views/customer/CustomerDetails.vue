<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="商户详情">
      <a-descriptions title="商户信息">
        <a-descriptions-item label="商户名称">{{customer.customerName}}</a-descriptions-item>
        <a-descriptions-item label="统一社会信用代码">{{customer.socialCreditCode}}</a-descriptions-item>
        <a-descriptions-item label="银行账号">{{customer.bankAcc}}</a-descriptions-item>
        <a-descriptions-item label="开户户名">{{ customer.bankAccName }}</a-descriptions-item>
        <a-descriptions-item label="联行号">{{ customer.bankCode }}</a-descriptions-item>
        <a-descriptions-item label="开户行">{{ customer.bankName }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px" />
      <a-descriptions title="管理员信息">
        <a-descriptions-item label="管理员姓名">{{customer.adminName}}</a-descriptions-item>
        <a-descriptions-item label="管理员手机号">{{customer.adminPhone}}</a-descriptions-item>
        <a-descriptions-item label="管理员邮箱">{{customer.adminMail}}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="注册流程">
      <a-steps :direction="isMobile && 'vertical' || 'horizontal'" :current="1" progressDot>
        <a-step>
          <template v-slot:title>
            <span>注册申请</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              <div>{{customer.createTime}}</div>
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>注册审核</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              <div>{{customer.updateTime}}</div>
            </div>
          </template>
        </a-step>
        <a-step title="首次充值" />
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="平台账户详情">
      <a-descriptions title="平台账户余额">
        <a-descriptions-item label="账户余额">{{customerBal.availBal}}</a-descriptions-item>
        <a-descriptions-item label="未付金额">{{customerBal.frzBal}}</a-descriptions-item>
        <a-descriptions-item label="最后充值日期">{{data[0].transTime}}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px" />
      <a-descriptions title="平台账户充值记录"></a-descriptions>
      <a-table :columns="columns" :data-source="data" :pagination="false"></a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { getCustomerDetail,getCustomerBal,getChangeRecord } from '@/api/customer'
const columns = [
  {
    title: '日期',
    dataIndex: 'transTime',
    key: 'transTime',
  },
  {
    title: '充值金额',
    dataIndex: 'money',
    key: 'money',
  },
]
const data = [
  {
    key: '1',
    date: '2020-08-14 15:37:02',
    money: 178267.88,
  }
]
export default {
  name: 'CustomerDetails',
  data() {
    return {
      customerBal: {
      },
      customer: {
      },
      columns,
      data,
    }
  },
  methods: {
    getCustomerDetail(){
      getCustomerDetail({ adminPhone: '17671795549' }).then((res) => {
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