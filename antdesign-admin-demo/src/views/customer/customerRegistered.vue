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
              'name',
              {rules: [{ required: true, message: '请输入商户名称' }]}
            ]"
            name="name"
            placeholder="请输入营业执照名称"/>
        </a-form-item>
        <a-form-item
          label="统一社会信用代码"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'businessLicense',
              {rules: [{ required: true, message: '请输入统一社会信用代码' }]}
            ]"
            name="businessLicense"
            placeholder="请输入营业执照统一社会信用代码"/>
        </a-form-item>
        <a-form-item
          label="充值账户名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'bankName',
              {rules: [{ required: true, message: '请输入充值账户名称' }]}
            ]"
            name="bankName"
            placeholder="用于在平台中充值的账户名称"/>
        </a-form-item>
        <a-form-item
          label="充值账户账号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'bankAcc',
              {rules: [{ required: true, message: '请输入充值账户账号' }]}
            ]"
            name="bankAcc"
            placeholder="用于在平台中充值的账户账号"/>
        </a-form-item>
        <a-form-item
          label="管理员姓名"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 8} }">
          <a-input
            v-decorator="[
              'managerMan',
              {rules: [{ required: true, message: '请输入管理员姓名' }]}
            ]"
            name="managerMan"
            placeholder="商户方在平台中的管理员"/>
        </a-form-item>
        <a-form-item
          label="管理员手机号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 8} }">
          <a-input
            v-decorator="[
              'phoneNo',
              {rules: [{ required: true, message: '请输入管理员手机号' }]}
            ]"
            name="phoneNo"
            placeholder="用于登陆酬金代发平台"/>
        </a-form-item>
        <a-form-item
          label="管理员邮箱"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 8} }">
          <a-input
            v-decorator="[
              'mail',
              {rules: [{ required: true, message: '请输入管理员邮箱' }]}
            ]"
            name="mail"
            placeholder="用于接收对账单"/>
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
export default {
  name: 'CustomerRegistered',
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods:{
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>