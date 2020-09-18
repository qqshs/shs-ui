<template>
  <div>
    <!-- <a-form :form="form" :layout="'inline'">
      <CustomerSelect
        :localStyle="{width:'200px'}"
        :localDecorator="['customerIds', { rules: [{ required: true, message: 'required 类型!' }] }]"
        @change="initLandSelect"
      ></CustomerSelect>

      <CustomerLandSelect
        ref="refCustomerLandSelect"
        :localStyle="{width:'200px'}"
        :localDecorator="['landIds', { rules: [{ required: true, message: 'required 类型!' }] }]"
      ></CustomerLandSelect>

      <a-form-item>
        <a-button @click="handleSubmit">submit</a-button>
        <a-button @click="reset">reset</a-button>
      </a-form-item>
    </a-form>-->

    <!-- <s-table
            ref="table2"
            size="default"
            rowKey="indexNo"
            :columns="columns"
            :showPagination="false"
            :dataHandles="dataHandles2"
    ></s-table>-->
  </div>
</template>

<script>
// import NormalSelect from './NormalSelect'
const columns = [
  {
    title: '序号',
    dataIndex: 'indexNo',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '身份证号',
    dataIndex: 'pinNo',
  },
  {
    title: '手机号',
    dataIndex: 'phoneNo',
  },
  {
    title: '银行卡号',
    dataIndex: 'bankAcc',
  },
  {
    title: '落地编号',
    dataIndex: 'customerLandId',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
]
const responseBase = {
  data: [],
  page: {
    resultCount: 17,
    pageSize: 50,
  },
}

export default {
  components: {
    // NormalSelect,
  },
  data() {
    return {
      columns,
      dataHandles2: {
        listApi: () => Promise.resolve(Object.assign(responseBase)),
      },
      form: this.$form.createForm(this),
    }
  },
  mounted() {
    this.dataHandles2.listApi().then((res) => {
      console.log(res)
    })
  },
  methods: {
    initLandSelect(v) {
      this.$refs.refCustomerLandSelect.initSelectOptions(v instanceof Array ? v : [v])
      // this.form.resetFields(['landIds'])
    },
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    reset() {
      this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
}
</script>

<style>
</style>