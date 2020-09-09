<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="酬金发放查询">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="提交日期">
                <a-range-picker v-model="searchDate"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="交易日期">
                <a-range-picker v-model="searchDate"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="收方账户名">
                <a-input v-model="reciveAccName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="收方账号">
                <a-input v-model="reciveAccNo"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-button type="primary">查询</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
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