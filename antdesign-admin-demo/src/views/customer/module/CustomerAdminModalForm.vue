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
      <a-form-item label="管理员姓名">
        <a-input
          v-decorator="[ 'adminName', {
            rules: [{ required: true, message: '请输入管理员姓名' }],
            initialValue:initialValue.adminName
          } ]"
        />
      </a-form-item>
      <a-form-item label="管理员手机号">
        <a-input
          v-decorator="[ 'adminPhone', {
            rules: [{ required: true, message: '请输入管理员手机号' }],
            initialValue:initialValue.adminPhone
          } ]"
        />
      </a-form-item>
      <a-form-item label="管理员邮箱">
        <a-input
          v-decorator="[ 'adminMail', {
            rules: [{ required: true, message: '请输入管理员邮箱' }],
            initialValue:initialValue.adminMail
          } ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { updateCustomerAdmin } from '@/api/customer'
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
        updateCustomerAdmin(values).then((res) => {
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