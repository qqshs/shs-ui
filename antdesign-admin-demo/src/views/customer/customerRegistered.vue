<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="商户注册">
      <a-steps class="steps" :current="currentTab">
        <a-step title="填写商户信息" />
        <a-step title="设置充值账号" />
        <a-step title="绑定商户落地公司" />
        <a-step title="注册完成" />
      </a-steps>
      <div class="content">
        <a-form :form="form" class="bytter-form-lable">
          <div v-show="currentTab === 0">
            <a-form-item label="商户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['customerName', { rules: [{ required: true, message: '请输入商户名称' }] }]"
                name="customerName"
                placeholder="请输入营业执照名称"
              />
            </a-form-item>
            <a-form-item label="统一社会信用代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['socialCreditCode', { rules: [{ required: true, message: '请输入统一社会信用代码' }] }]"
                name="socialCreditCode"
                placeholder="请输入营业执照统一社会信用代码"
              />
            </a-form-item>
            <a-row type="flex" justify="center" align="top">
              <a-button type="primary" style="margin-left: 50px" @click="nextStepTap(customerValidateFields)"
                >下一步</a-button
              >
            </a-row>
            <a-divider />
          </div>
          <div v-show="currentTab === 1">
            <a-card>
              {{ data }}
              <a-table rowKey="key" :columns="columns" :dataSource="data" :pagination="false" :loading="memberLoading">
                <template
                  v-for="colInfo in columns"
                  :slot="colInfo.scopedSlots.customRender"
                  slot-scope="text, record, rowIndex"
                >
                  <template v-if="colInfo.scopedSlots.customRender === 'operation'">
                    <span :key="colInfo.dataIndex + rowIndex + 'btns'">
                      <!-- 不可编辑 -->
                      <a-button type="link" @click="toggle(rowIndex)" v-show="!record.editable">编辑</a-button>
                      <a-button type="link" @click="saveRow(rowIndex)" v-show="record.editable && record.isNew"
                        >添加</a-button
                      >
                      <a-button type="link" @click="saveRow(rowIndex)" v-show="record.editable && !record.isNew"
                        >保存</a-button
                      >
                      <a-button type="link" @click="cancel(rowIndex)" v-show="record.editable && !record.isNew"
                        >取消</a-button
                      >
                      <a-popconfirm
                        title="是否要删除此行？"
                        @confirm="remove(rowIndex)"
                        v-show="!record.editable || record.isNew"
                      >
                        <a-button type="link">删除</a-button>
                      </a-popconfirm>
                    </span>
                  </template>
                  <template v-else>
                    <a-form-item v-show="record.editable" :key="colInfo.dataIndex + rowIndex + 'item'" label="">
                      <a-input
                        v-decorator="[
                          `rowValues[${rowIndex}].${colInfo.dataIndex}`,
                          {
                            rules: [{ required: true, message: '请填写' + colInfo.title }],
                            initialValue: data[rowIndex][colInfo.dataIndex],
                          },
                        ]"
                        :placeholder="colInfo.title"
                      />
                    </a-form-item>
                    <span v-show="!record.editable" :key="colInfo.dataIndex + rowIndex + 'text'">{{ text }}</span>
                  </template>
                </template>
              </a-table>
              <a-button
                style="width: 100%; margin-top: 16px; margin-bottom: 8px"
                type="dashed"
                icon="plus"
                @click="newMember"
                >添加充值账号</a-button
              >
            </a-card>
            <a-row type="flex" justify="center" align="top">
              <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
              <a-button type="primary" style="margin-left: 50px" @click="nextStepTwoToThree()">下一步</a-button>
            </a-row>
            <a-divider />
          </div>
        </a-form>
        <div v-show="currentTab === 2">
          <a-divider style="margin-bottom: 32px" />
          <a-descriptions title="绑定商户落地公司"></a-descriptions>
          <!--          <a-table :columns="columns" rowKey="id" :data-source="data" :pagination="false"></a-table>-->
          <a-row class="land-list" type="flex" justify="center" align="top">
            <a-button
              v-for="(item, index) in landList"
              :key="item.id"
              :type="item.selected ? 'primary' : 'default'"
              :icon="item.selected && 'check'"
              @click="landList[index].selected = !landList[index].selected"
            >
              {{ item.landName }}</a-button
            >
          </a-row>
          <a-row type="flex" justify="center" align="top">
            <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
            <a-button type="primary" htmlType="submit" style="margin-left: 50px" @click="handleSubmit">完成</a-button>
          </a-row>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { registerCustomer, getAllLand } from '@/api/customer'
const customerValidateFields = ['customerName', 'socialCreditCode']
const columns = [
  {
    title: '银行账号',
    dataIndex: 'bankAcc',
    key: 'bankAcc',
    scopedSlots: { customRender: 'bankAcc' },
  },
  {
    title: '开户户名',
    dataIndex: 'bankAccName',
    key: 'bankAccName',
    scopedSlots: { customRender: 'bankAccName' },
  },
  {
    title: '联行号',
    dataIndex: 'bankCode',
    key: 'bankCode',
    scopedSlots: { customRender: 'bankCode' },
  },
  {
    title: '开户行',
    dataIndex: 'bankName',
    key: 'bankName',
    scopedSlots: { customRender: 'bankName' },
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'operation' },
  },
]
const data = []
let startKey = 100
export default {
  name: 'CustomerRegistered',
  data() {
    return {
      loading: false,
      memberLoading: false,
      labelCol: { lg: { span: 9 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 7 }, sm: { span: 16 } },
      currentTab: 2,
      form: this.$form.createForm(this),
      customerValidateFields,
      columns,
      data,
      landList: [],
    }
  },
  mounted() {
    this.getAllLand()
  },
  methods: {
    newMember() {
      this.data.push({
        prop: startKey++,
        editable: true,
        isNew: true,
      })
    },
    handleChange(value, key, column) {
      // const newData = [...this.data]
      // const target = newData.find((item) => key === item.key)
      // if (target) {
      //   target[column] = value
      //   this.data = newData
      // }
    },
    toggle(index) {
      this.data[index] = Object.assign(this.data[index], { editable: true })
      // 方案1
      // this.form.setFieldsValue({ [`rowValues[${index}]`]: this.data[index] })
      // 方案2
      this.form.resetFields([`rowValues[${index}]`])
    },
    cancel(index) {
      this.data[index] = Object.assign(this.data[index], { editable: false })
    },
    remove(index) {
      this.data.splice(index, 1)
    },
    saveRow(index) {
      const keys = columns.map((colInfo) => `rowValues[${index}].${colInfo.dataIndex}`)
      this.form.validateFields(keys, (err, values) => {
        if (err) {
          return
        }
        this.data[index].editable = false
        this.data[index].isNew = false
        this.data[index] = Object.assign(this.data[index], values.rowValues[index])
      })
    },
    nextStep() {
      this.currentTab += 1
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    nextStepTwoToThree() {
      if (data && data.length > 0) {
        const keys = columns.map((colInfo) => `rowValues[${0}].${colInfo.dataIndex}`)
        this.form.validateFields(keys, (err, values) => {
          console.info(values)
          if (err) {
            this.$error({
              title: '设置充值账号',
              content: '请设置商户充值账号',
            })
            return
          }
          if (data[0].editable) {
            this.$error({
              title: '设置充值账号',
              content: '请保存商户充值账号',
            })
            return
          } else {
            this.nextStep()
          }
        })
      } else {
        this.$error({
          title: '设置充值账号',
          content: '请添加商户充值账号',
        })
      }
    },
    nextStepTap(fields) {
      const {
        form: { validateFields },
      } = this
      validateFields(fields, (err, values) => {
        if (!err) {
          this.nextStep()
        }
      })
    },
    handleSubmit(e) {

      const selectedLandIds = this.landList.filter(item=> item.selected).map(item=> item.id)
      console.log(selectedLandIds)
      return 


      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          this.$error({
            title: '商户注册',
            content: '请将商户数据填写完整！！！',
          })
          return
        }
        const customer = {}
        customer.customerName = values['customerName']
        customer.socialCreditCode = values['socialCreditCode']
        customer.bankList = values.rowValues
        console.info(customer)
        registerCustomer(customer).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
    },
    getAllLand() {
      getAllLand({}).then((res) => {
        if (res.code === 0) {
          this.landList = res.data.map((item) => {
            item.selected = false
            return item
          })
          // this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
  },
}
</script>

<style scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
.land-list >>> .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
