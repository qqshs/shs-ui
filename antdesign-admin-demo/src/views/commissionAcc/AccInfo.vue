<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="酬金账户详情">
      <a-descriptions title="账户详情">
        <a-descriptions-item label="商户名称">远洋进出口贸易有限公司</a-descriptions-item>
        <a-descriptions-item label="充值账户名称">远洋进出口贸易有限公司</a-descriptions-item>
        <a-descriptions-item label="充值账户账号">9877691099010001</a-descriptions-item>
        <a-descriptions-item label="账户余额">
          500,908.98
          <a-tooltip placement="right">
            <template slot="title" >
              刷新余额
            </template>
            <a-icon type="reload" style="margin-left: 8px"/>
          </a-tooltip>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="账户充值记录">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
      >
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date'

  },
  {
    title: '充值金额',
    dataIndex: 'money',
    key: 'money'

  }
]
const data = [
  {
    key: '1',
    date: '2020-08-14 15:37:02',
    money: 178267.88
  },
  {
    key: '2',
    date: '2020-08-14 09:41:35',
    money: 19000.00
  },
  {
    key: '3',
    date: '2020-08-13 17:33:12',
    money: 29081.56
  },
  {
    key: '4',
    date: '2020-08-13 16:00:01',
    money: 3000.00
  },
  {
    key: '5',
    date: '2020-08-13 13:45:56',
    money: 9800.00
  },
  /*{
      key: '1',
      month: '五月',
      saleCount: 178267.88
  },*/
  /*{
      key: '1',
      month: '六月',
      saleCount: 178267.88
  },
  {
      key: '1',
      month: '七月',
      saleCount: 178267.88
  }*/
]
export default {
  name: 'AccInfo',
  data(){
    return{
      columns,
      data
    }
  }
}
</script>

<style scoped>

</style>