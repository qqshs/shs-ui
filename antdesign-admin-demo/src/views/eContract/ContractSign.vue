<template>
  <page-header-wrapper :title="false">
    <a-card title="用户签约" :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form :form="form">
        <a-form-item
          label="用户名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入用户名称' }]}
            ]"
            name="name"
            placeholder="请输入用户名称"/>
        </a-form-item>
        <a-form-item
          label="身份证号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'businessLicense',
              {rules: [{ required: true, message: '请输入用户身份证号' }]}
            ]"
            name="businessLicense"
            placeholder="请输入用户身份证号"/>
        </a-form-item>
        <a-form-item
          label="手机号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'phoneNo',
              {rules: [{ required: true, message: '请输入用户手机号' }]}
            ]"
            name="phoneNo"
            placeholder="请输入用户手机号"/>
        </a-form-item>
        <a-form-item
          label="银行卡号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'bankAcc',
              {rules: [{ required: true, message: '请输入用户银行卡号' }]}
            ]"
            name="bankAcc"
            placeholder="用于收款的银行卡号"/>
        </a-form-item>

        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button >取消</a-button>
          <a-button @click="handleSubmit" style="margin-left: 8px" htmlType="submit" type="primary">签约</a-button>
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