<template>
  <div class="agree-wrap">
    <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-form-item label="用户名称">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入用户名称' }]}
          ]"
          name="name"
          placeholder="请输入用户名称"
        />
      </a-form-item>
      <a-form-item label="身份证号">
        <a-input
          v-decorator="[
            'pinNo',
            {rules: [{ required: true, message: '请输入用户身份证号' }]}
          ]"
          name="pinNo"
          placeholder="请输入用户身份证号"
        />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input
          v-decorator="[
            'phoneNo',
            {rules: [{ required: true, message: '请输入用户手机号' }]}
          ]"
          name="phoneNo"
          placeholder="请输入用户手机号"
        />
      </a-form-item>
      <a-form-item label="银行卡号">
        <a-input
          v-decorator="[
            'bankAcc',
            {rules: [{ required: true, message: '请输入用户银行卡号' }]}
          ]"
          name="bankAcc"
          placeholder="用于收款的银行卡号"
        />
      </a-form-item>
      <a-form-item :wrapperCol="{ lg: { span: 24 }, xs: { span: 24 } }">
        <a-checkbox :checked="checkNick" @change="handleChange" class="chec">
          我已阅读并完全同意
          <a-button type="link" @click.native="showAgreement">条款内容</a-button>
        </a-checkbox>
      </a-form-item>
      <div style="text-align: center">
        <a-button @click="handleSubmit" type="primary" class="subbtn">签约</a-button>
      </div>
    </a-form>
    <a-modal v-model="agreeVisible" title="协议条款" width="75%">
      <span v-html="agreement"></span>
      <template slot="footer">
        <a-button key="submit" type="primary" @click="agreeVisible = false">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { eContractUrl } from '@/api/econtract'
import agreement from './PayeeAgreementUtil/agreement'

export default {
  name: 'ContractSign',
  data() {
    return {
      labelCol: { lg: { span: 6 }, xs: { span: 7 } },
      wrapperCol: { lg: { span: 13 }, xs: { span: 14 } },
      form: this.$form.createForm(this),
      agreeVisible: false,
      checkNick: false,
      agreement,
    }
  },
  methods: {
    handleChange(e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        // this.form.validateFields(['nickname'], { force: true })
      })
    },
    showAgreement() {
      this.agreeVisible = true
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }
        const contract = {}
        contract.name = values['name']
        contract.pinNo = values['pinNo']
        contract.phoneNo = values['phoneNo']
        contract.bankAcc = values['bankAcc']
        contract.bankAccName = values['bankAccName']
        eContractUrl(contract).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
    },
  },
}
</script>

<style scoped>
.agree-wrap {
  width: 35%;
  min-width: 380px;
  padding: 24px;
  border-radius: 4px;
  background-color: #fff;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding-top: 40px;
}
.agree-wrap .chec {
  width: 100%;
  margin-left: 60px;
}
.agree-wrap .subbtn {
  width: 300px;
}
</style>

<style>
@media (max-width: 575px) {
  .container .agree-wrap {
    width: 100%;
    position: absolute;
    position: absolute;
    top: 174px;
    padding: 12px;
    padding-top: 12px;
  }
  .agree-wrap .ant-form-item-label {
    width: 24%;
    line-height: 2.5;
  }
  .agree-wrap .ant-form-item-control-wrapper {
    width: 66%;
  }
  .agree-wrap .subbtn {
    width: 300px;
  }
  .agree-wrap .ant-form-item-control .chec {
    width: 120%;
    margin-left: 0px;
  }
}
</style>