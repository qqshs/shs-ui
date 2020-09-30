<template>
  <a-modal v-model="visible" :title="title" @ok="handleSubmit">
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="原密码" has-feedback>
      <a-input
        v-decorator="[
          'old',
          {
            rules: [
              {
                required: true,
                message: '请输入原密码',
              },
              {
                validator: compareToOldPassword,trigger: 'blur'
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="新密码" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入新密码',
              },
              {
                validator: validateToNextPassword,trigger: 'blur'
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请输入新密码',
              },
              {
                validator: compareToFirstPassword,trigger: 'blur'
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
  </a-form>
  </a-modal>
</template>

<script>
  import { updateUserPwdUrl } from '@/api/basis'
  import { checkLogin } from '@/api/login'
  import { hex_md5 } from '@/utils/md5'
  export default {
    data() {
      return {
        visible: false,
        title: '用户编辑',
        initialValue: {},
        confirmDirty: false,
        autoCompleteResult: [],
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        },
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'register' })
    },
    methods: {
      show({ title, data }) {
        this.initialValue = data
        this.title = title
        this.visible = true
      },
      handleSubmit(e) {
        e.preventDefault()
        this.form.validateFieldsAndScroll((err, values) => {
          if(err){
            return
          }
          const password = hex_md5(values.password)
          const old = hex_md5(values.old)
          updateUserPwdUrl({ nearPassword: old,password: password }).then((res) => {
            if (res.code === 0) {
              this.visible = false
              this.$success({
                title: '修改登陆密码',
                content: res.msg,
              })
            } else {
              this.$error({
                title: '修改登陆密码',
                content: res.msg,
              })
            }
          })

          // checkLogin({ password: old }).then((res) => {
          //     if (resPassword !== old) {
          //       this.$error({
          //         title: '修改登陆密码',
          //         content: '原密码和新密码不一致，请确认后修改',
          //       })
          //       return false
          //     }
          //   })
        })
      },
      handleConfirmBlur(e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      compareToOldPassword(rule, value, callback) {
        const form = this.form
        if (value && value === form.getFieldValue('password')) {
          callback('旧密码与新密码一致，无需更换！')
        }
          callback()
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form
        if (value && value !== form.getFieldValue('password')) {
          callback('新密码与确认密码不一致！')
        }
        callback()
      },
      validateToNextPassword(rule, value, callback) {
        const form = this.form
        if (value && value === form.getFieldValue('old')) {
          callback('旧密码与新密码一致，无需更换！')
        }
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        if (value && this.confirmDirty) {
          form.validateFields(['old'], { force: true })
        }
        callback()
      },
    },
  }
</script>