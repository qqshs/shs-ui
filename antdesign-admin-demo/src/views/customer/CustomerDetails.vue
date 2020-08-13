<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="商户详情">
      <a-descriptions title="商户信息">
        <a-descriptions-item label="商户名称">远洋进出口贸易有限公司</a-descriptions-item>
        <a-descriptions-item label="统一社会信用代码">989983778291982</a-descriptions-item>
        <a-descriptions-item label="充值账户名称">远洋进出口贸易有限公司</a-descriptions-item>
        <a-descriptions-item label="充值账户账号">9877691099010001</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions title="管理员信息">
        <a-descriptions-item label="管理员姓名">杰克马</a-descriptions-item>
        <a-descriptions-item label="管理员手机号">13800138000</a-descriptions-item>
        <a-descriptions-item label="管理员邮箱">jdm@bytter.com</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="注册流程">
      <a-steps :direction="isMobile && 'vertical' || 'horizontal'" :current="1" progressDot>
        <a-step>
          <template v-slot:title>
            <span>注册申请</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              <div>2020-08-10 12:32</div>
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>注册审核</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              <div>2020-08-10 17:10</div>
            </div>
          </template>
        </a-step>
        <a-step title="首次充值" />
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="平台账户详情">
      <a-descriptions title="平台账户余额">
        <a-descriptions-item label="账户余额">987,872.89</a-descriptions-item>
        <a-descriptions-item label="未付金额">18,923.98</a-descriptions-item>
        <a-descriptions-item label="最后充值日期">2020-08-13 16:30</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions title="平台账户充值记录"></a-descriptions>
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
  name: 'CustomerDetails',
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