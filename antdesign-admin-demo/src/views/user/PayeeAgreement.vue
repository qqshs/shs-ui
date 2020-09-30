<template>
  <div class="agree-wrap">
    <div v-show="currentTab === 0">
      <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-form-item label="用户名称">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '请输入用户名称' }] }]"
            name="name"
            placeholder="请输入用户名称"
          />
        </a-form-item>
        <a-form-item label="身份证号">
          <a-input
            v-decorator="['pinNo', { rules: [{ required: true, message: '请输入用户身份证号' }] }]"
            name="pinNo"
            placeholder="请输入用户身份证号"
          />
        </a-form-item>
        <a-form-item label="手机号">
          <a-input
            v-decorator="['phoneNo', { rules: [{ required: true, message: '请输入用户手机号' }] }]"
            name="phoneNo"
            placeholder="请输入用户手机号"
          />
        </a-form-item>
        <a-form-item label="银行卡号">
          <a-input
            v-decorator="['bankAcc', { rules: [{ required: true, message: '请输入用户银行卡号' }] }]"
            name="bankAcc"
            placeholder="用于收款的银行卡号"
          />
        </a-form-item>
        <div style="text-align: center">
          <a-button @click="handleSubmit" type="primary" class="subbtn">下一步</a-button>
        </div>
      </a-form>
    </div>

    <div v-show="currentTab === 1">
      <a-form :form="selectform" :labelCol="labelCol" :wrapperCol="wrapperCol" :key="selectformKey">
        <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="商户名称">
          <a-select
            style="max-width: 334px; width: 100%"
            placeholder=" "
            @change="setLandId"
            v-decorator="['customerId', { rules: [{ required: true, message: '请选择商户!' }] }]"
          >
            <a-select-option v-for="item in customerMap" :key="item.customerId" :value="item.customerId">{{
              item.customerName
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="落地公司">
          <a-select
            style="max-width: 334px; width: 100%"
            placeholder=" "
            v-decorator="['landId', { rules: [{ required: true, message: '请选择落地!' }] }]"
          >
            <a-select-option v-for="item in landMap" :key="item.landId" :value="item.landId">{{
              item.landName
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-form-item :wrapperCol="{ lg: { span: 24 }, xs: { span: 24 } }">
        <a-checkbox :checked="checkNick" @change="handleChange" class="chec">
          我已阅读并完全同意
          <a-button type="link" @click.native="showAgreement">条款内容</a-button>
        </a-checkbox>
      </a-form-item>
      <a-row type="flex" justify="center" align="top">
        <a-button type="primary" @click="eContract" style="margin-left: 50px">下一步</a-button>
      </a-row>
      <a-modal v-model="agreeVisible" title="协议条款" width="75%">
        <span v-html="agreement"></span>
        <template slot="footer">
          <a-button key="submit" type="primary" @click="agreeVisible = false">确定</a-button>
        </template>
      </a-modal>
    </div>

    <div v-show="currentTab === 2">
     <div v-show="currentTab === 2">
       <h3>签约成功</h3>
    </div>
    </div>
  </div>
</template>

<script>
import { identityAuthUrl, eContractUrl, signCustomerSelect, signLandSelect } from '@/api/econtract'
import agreement from './PayeeAgreementUtil/agreement'

export default {
  name: 'ContractSign',
  data() {
    return {
      currentTab: 0,
      selectformKey: '',
      saveFormData: '',
      labelCol: { lg: { span: 6 }, xs: { span: 7 } },
      wrapperCol: { lg: { span: 13 }, xs: { span: 14 } },
      form: this.$form.createForm(this),
      selectform: this.$form.createForm(this),
      agreeVisible: false,
      checkNick: false,
      agreement,
      nextData: {
        formData: {
          customerIds: [],
          landIds: [],
        },
      },
      customerMap: [],
      landMap: [],
    }
  },
  mounted() {
    signCustomerSelect({
      pinNo: this.form.getFieldValue('pinNo'),
    })
      .then((res) => {
        if (res.code === 0) {
          this.customerMap = res.data //赋值
        }
      })
      .catch((err) => {
        this.ensreLoading = false
        console.log(err)
      })
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
    setLandId(v) {
      // 清除 落地的值
      // 清除 落地选项列表
      this.landMap = []
      this.selectform.resetFields(['landIds'])
      signLandSelect({
        pinNo: this.form.getFieldValue('pinNo'),
        customerId: v,
      }).then((res) => {
        if (res.code === 0) {
          this.landMap = res.data //赋值
        }
      })
    },
    // 第一步
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
        identityAuthUrl(contract).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            // 获得待签约的商户及其落地信息
            signCustomerSelect({
              pinNo: values['pinNo'],
            })
              .then((res) => {
                if (res.code === 0) {
                  this.customerMap = res.data //赋值
                }
              })
              .catch((err) => {
                this.ensreLoading = false
                console.log(err)
              })
            this.currentTab += 1
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
    },
     // 第二步
    eContract(e) {
        if( this.checkNick === false){
            this.$message.warning("请先查看条款，不同意不能签约")
            return
        }
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
        contract.customerId =  this.selectform.getFieldValue('customerId')
        contract.customerLandId =  this.selectform.getFieldValue('landId')
        eContractUrl(contract).then((res) => {
          if (res.code === 0) {
            this.currentTab += 1
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
    }
  },
  nextStep() {
    // if (this.currentTab >= 2) return
    this.currentTab += 1
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