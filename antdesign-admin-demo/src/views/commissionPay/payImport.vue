<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" :body-style="{padding: '24px 32px'}" title="酬金发放录入">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="商户名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <div style="display: inline">
            <font style="background-color: red;">*</font>
            <a-input
              v-decorator="[
              'name',
              {rules: [{ required: true, message: '' }]}
            ]"
              name="name"
              placeholder="给目标起个名字" />
          </div>
        </a-form-item>
        <a-form-item
          label="起止日期"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-range-picker
            name="buildTime"
            style="width: 100%"
            v-decorator="[
              'buildTime',
              {rules: [{ required: true, message: '请选择起止日期' }]}
            ]" />
        </a-form-item>
      </a-form>
    </a-card>

    <a-card :bordered="false" :loading="loading">
      <div class="table-operator">
        <a-table :columns="columns" :bordered="true" :data-source="data" :pagination="true"></a-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '收方户名',
      dataIndex: 'reciveBankAccName',
      key: 'reciveBankAccName',
    },
    {
      title: '收方账号',
      dataIndex: 'reciveBankAcc',
      key: 'reciveBankAcc',
    },
    {
      title: '交易金额',
      dataIndex: 'money',
      key: 'money',
      align:'right'
    },
  ]
  const data = [
    {
      key: '1',
      date: '2020-08-14 15:37:02',
      reciveBankAccName:'杰克马',
      reciveBankAcc:'95588804000910015',
      money: 178267.88,
    },
    {
      key: '2',
      date: '2020-08-14 09:41:35',
      reciveBankAccName:'小马哥',
      reciveBankAcc:'43909777910001881',
      money: 19000.0,
    },
    {
      key: '3',
      date: '2020-08-13 17:33:12',
      reciveBankAccName:'杰克马',
      reciveBankAcc:'95588804000910015',
      money: 29081.56,
    },
    {
      key: '4',
      date: '2020-08-13 16:00:01',
      reciveBankAccName:'小马哥',
      reciveBankAcc:'43909777910001881',
      money: 3000.0,
    },
    {
      key: '5',
      date: '2020-08-13 13:45:56',
      reciveBankAccName:'小马哥',
      reciveBankAcc:'43909777910001881',
      money: 9800.0,
    }
  ]
  export default {
    name: 'AccDtl',
    data() {
      return {
        searchDate: [],
        reciveAccName: '',
        reciveAccNo: '',
        columns,
        data
      }
    }
  }
</script>

<style scoped>

</style>