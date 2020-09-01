<template>
  <page-header-wrapper :title="false">
    <a-card title="商户注册" :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form :form="form">
        <a-form-item
          label="商户名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'customerName',
              {rules: [{ required: true, message: '请输入商户名称' }]}
            ]"
            name="customerName"
            placeholder="请输入营业执照名称"
            v-model="customer.customerName"/>
        </a-form-item>
        <a-form-item
          label="统一社会信用代码"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'socialCreditCode',
              {rules: [{ required: true, message: '请输入统一社会信用代码' }]}
            ]"
            name="socialCreditCode"
            placeholder="请输入营业执照统一社会信用代码"
            v-model="customer.socialCreditCode" />
        </a-form-item>
        <a-form-item
          label="银行账号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'bankAcc',
              {rules: [{ required: true, message: '请输入银行账号' }]}
            ]"
            name="bankAcc"
            placeholder="用于在平台中充值的银行账号"
            v-model="customer.bankAcc"/>
        </a-form-item>
        <a-form-item
          label="开户户名"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'bankAccName',
              {rules: [{ required: true, message: '请输入开户户名' }]}
            ]"
            name="bankAccName"
            placeholder="用于在平台中开户户名"
            v-model="customer.bankAccName"/>
        </a-form-item>
        <a-form-item
          label="联行号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'bankCode',
              {rules: [{ required: true, message: '请输入联行号' }]}
            ]"
            name="bankCode"
            placeholder="用于在平台中联行号"
            v-model="customer.bankCode"/>
        </a-form-item>
        <a-form-item
          label="开户行"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'bankName',
              {rules: [{ required: true, message: '请输入开户户名' }]}
            ]"
            name="bankName"
            placeholder="用于在平台中开户行"
            v-model="customer.bankName"/>
        </a-form-item>
        <a-form-item
          label="管理员姓名"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 8} }">
          <a-input
            v-decorator="[
              'adminName',
              {rules: [{ required: true, message: '请输入管理员姓名' }]}
            ]"
            name="adminName"
            placeholder="商户方在平台中的管理员"
            v-model="customer.adminName"/>
        </a-form-item>
        <a-form-item
          label="管理员手机号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 8} }">
          <a-input
            v-decorator="[
              'adminPhone',
              {rules: [{ required: true, message: '请输入管理员手机号' }]}
            ]"
            name="adminPhone"
            placeholder="用于登陆酬金代发平台"
            v-model="customer.adminPhone"/>
        </a-form-item>
        <a-form-item
          label="管理员邮箱"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 8} }">
          <a-input
            v-decorator="[
              'adminMail',
              {rules: [{ required: true, message: '请输入管理员邮箱' }]}
            ]"
            name="adminMail"
            placeholder="用于接收对账单"
            v-model="customer.adminMail"/>
        </a-form-item>

        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button >取消</a-button>
          <a-button @click="handleSubmit" style="margin-left: 8px" htmlType="submit" type="primary">注册</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>

</template>

<script>
  import { registerCustomer } from '@/api/customer'
export default {
  name: 'CustomerRegistered',
  data() {
    return {
      customer: {
      },
      form: this.$form.createForm(this)
    }
  },
  methods:{
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          registerCustomer(this.customer).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg)
            } else {
              this.$message.warning(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>