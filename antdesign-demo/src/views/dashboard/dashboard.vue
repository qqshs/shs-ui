<template>
  <div>
    <a-row :gutter="[10,10]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-card :bordered="true" hoverable :loading="loading">
          <a-statistic
            title="当日销售额"
            :value="daySaleCount"
            :precision="2"
            style="margin-right: 50px"
          ></a-statistic>
          <a-divider style="margin: 10px 0px 5px"></a-divider>
          <span>环比增长：1% 同比增长：2.4%</span>
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-card :bordered="true" hoverable :loading="loading">
          <a-statistic title="当日支付总额" :value="223987.56" :precision="2" style="margin-right: 50px"></a-statistic>
          <a-divider style="margin: 10px 0px 5px"></a-divider>
          <span>环比增长：-1.8% 同比增长：1.1%</span>
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-card :bordered="true" hoverable :loading="loading">
          <a-statistic title="当日归集总额" :value="5871000" :precision="2" style="margin-right: 50px"></a-statistic>
          <a-divider style="margin: 10px 0px 5px"></a-divider>
          <span>环比增长：4.5% 同比增长：0.9%</span>
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-card :bordered="true" hoverable :loading="loading">
          <a-statistic title="当月预算使用额度" :value="15678900" :precision="2" style="margin-right: 50px"></a-statistic>
          <a-divider style="margin: 10px 0px 5px"></a-divider>
          <span>剩于预算额度：21,356,789.97</span>
        </a-card>
      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-card>
        <!--<year-sale-count></year-sale-count>-->

        <a-col :xs="24" :lg="18">
          <a-card title="每月销售趋势" :bordered="false" :loading="loading">
            <year-sale-count></year-sale-count>
          </a-card>
        </a-col>
        <!--<a-col :span="1"></a-col>-->
        <!--<year-sale-count-tabel></year-sale-count-tabel>-->
        <a-col :xs="24" :lg="6">
          <a-card :loading="loading" title="每月销售额统计" :bordered="false">
            <year-sale-count-tabel></year-sale-count-tabel>
          </a-card>
        </a-col>
      </a-card>
    </a-row>
  </div>
</template>

<script>
import YearSaleCountTabel from "./yearSaleCountTabel";
import YearSaleCount from "./yearSaleCount";

export default {
  name: "dashboard",
  components: {
    YearSaleCountTabel,
    YearSaleCount,
  },
  data() {
    return {
      daySaleCount: 112893.23,
      loading: true,
    };
  },
  mounted() {
    setTimeout(this.loadAll, 2000); //模拟从后台获取数据后，显示数据，隐藏骨架屏
  },
  methods: {
    loadAll() {
      //加载完数据后，隐藏骨架屏
      this.loading = false;
    },
  },
};
</script>

<style scoped>
</style>