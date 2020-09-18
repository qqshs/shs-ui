<template>
  <a-modal v-model="visible" :title="title" @ok="handleOk">
    <a-form :form="form" layout="horizontal" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="商户ID">
        <a-input
          disabled
          v-decorator="[ 'customerId', {
            initialValue:initialValue.customerId
          } ]"
        />
      </a-form-item>
      <a-form-item label="商户名称">
        <a-input
          disabled
          v-decorator="[ 'customerName', {
            rules: [{ required: true, message: '请输入商户名称' }],
            initialValue:initialValue.customerName
          } ]"
        />
      </a-form-item>
      <a-form-item label="统一社会信用代码">
        <a-input
          disabled
          v-decorator="[ 'socialCreditCode', {
            rules: [{ required: true, message: '请输入统一社会信用代码' }],
            initialValue:initialValue.socialCreditCode
          } ]"
        />
      </a-form-item>
      <a-form-item label="银行账号">
        <a-input
          v-decorator="[ 'bankAcc', {
            rules: [{ required: true, message: '请输入银行账号' }],
            initialValue:initialValue.bankAcc
          } ]"
        />
      </a-form-item>
      <a-form-item label="开户户名">
        <a-input
          v-decorator="[ 'bankAccName', {
            rules: [{ required: true, message: '请输入开户户名' }],
            initialValue:initialValue.bankAccName
          } ]"
        />
      </a-form-item>
      <a-form-item label="联行号">
        <a-input
          v-decorator="[ 'bankCode', {
            rules: [{ required: true, message: '请输入联行号' }],
            initialValue:initialValue.bankCode
          } ]"
        />
      </a-form-item>
      <a-form-item label="开户行">
        <a-input
          v-decorator="[ 'bankName', {
            rules: [{ required: true, message: '请输入开户行' }],
            initialValue:initialValue.bankName
          } ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { updateCustomerBank } from '@/api/customer'
export default {
  data() {
    return {
      customer:{},
      form: this.$form.createForm(this),
      visible: false,
      title: '用户编辑',
      initialValue: {},
    }
  },
  methods: {
    show({ title, data }) {
      this.initialValue = data
      this.title = title
      this.visible = true
    },
    handleOk() {
      this.form.validateFields((error, values) => {
        if (error) {
          return false
        }
        updateCustomerBank(values).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.visible = false
            this.$emit('ok')
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
    },
  },
}
</script>

<style>
</style>