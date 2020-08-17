<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card  title="账户余额" total="￥126,560">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-chart-bal></mini-chart-bal>
          </div>
          <!--<template slot="footer">日均销售额<span>￥ 234.56</span></template>-->
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card  title="未支付总额" total="￥367,120">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <span >未支付笔数：56</span>
          </div>
          <!--<template slot="footer">日均销售额<span>￥ 234.56</span></template>-->
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card  title="注册用户数" total="5,800">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <span>当日新增用户数：128</span>
          </div>
          <!--<template slot="footer">日均销售额<span>￥ 234.56</span></template>-->
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card  title="已支付总额" total="￥789,980">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-chart-pay></mini-chart-pay>
          </div>
          <!--<template slot="footer">日均销售额<span>￥ 234.56</span></template>-->
        </chart-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {ChartCard,Trend} from '@/components'
import MiniChartBal from './charts/MiniChartBal'
import MiniChartPay from './charts/MiniChartPay'
export default {
  name: 'Dashboard',
  components:{
    ChartCard,
    Trend,
    MiniChartBal,
    MiniChartPay
  }
}
</script>

<style scoped>

</style>