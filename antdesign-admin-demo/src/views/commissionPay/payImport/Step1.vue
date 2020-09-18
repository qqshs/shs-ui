<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <!--<a-form-item>
        &lt;!&ndash;<a-button type="primary" @click="nextStep">下一步</a-button>&ndash;&gt;
        <span  style="align: center">
          <a-button icon="download" @click="getInitValu('enumCode')">下载模板</a-button>
        </span>
      </a-form-item>-->
      <CustomerSelect
        mode=""
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :localDecorator="['customerIds', { rules: [{ required: true, message: '商户必选' }] ,initialValue:nextData.formData.customerIds} ]"
        @change="initLandSelect"
      ></CustomerSelect>
      <CustomerLandSelect
        ref="refCustomerLandSelect"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :localDecorator="['landIds', { rules: [{ required: true, message: '落地必选' }],initialValue:nextData.formData.landIds }]"
      ></CustomerLandSelect>
    </a-form>
    <a-row type="flex" justify="center" align="top">
      <a-button type="primary" @click="nextStep" style="margin-right: 50px;">下一步</a-button>

      <a-button icon="download" type="primary" @click="getInitValu('enumCode')">下载模板</a-button>
    </a-row>
    <!--<a-form-item :wrapperCol="{span: 19, offset: 5}" style="margin: 0,20px;" >
      <a-button icon="download" type="primary" @click="getInitValu('enumCode')">下载模板</a-button>
      <a-button type="primary" @click="nextStep">下一步</a-button>
    </a-form-item>-->
    <a-divider/>
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>转账到支付宝账户</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
      <h4>转账到银行卡</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Step1',
    props: {
      nextData: {
        type: Object,
      },
    },
    data() {
      return {
        labelCol: { lg: { span: 5 }, sm: { span: 5 } },
        wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
        form: this.$form.createForm(this),
        customerIds: [],
      }
    },
    methods: {
      nextStep() {
        const { form: { validateFields } } = this
        // 先校验，通过表单校验后，才进入下一步
        validateFields((err, values) => {
          if (!err) {
            this.$emit('nextStep', { formData: values })
          }
        })
      },
      initLandSelect(v) {
        this.$refs.refCustomerLandSelect.initSelectOptions(v instanceof Array ? v : [v])
        this.form.resetFields(['landIds'])
      }
    }
  }
</script>

<style lang="less" scoped>
  .step-form-style-desc {
    padding: 0 56px;
    color: rgba(0, 0, 0, .45);

    h3 {
      margin: 0 0 12px;
      color: rgba(0, 0, 0, .45);
      font-size: 16px;
      line-height: 32px;
    }

    h4 {
      margin: 0 0 4px;
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
      line-height: 22px;
    }

    p {
      margin-top: 0;
      margin-bottom: 12px;
      line-height: 22px;
    }
  }
</style>
