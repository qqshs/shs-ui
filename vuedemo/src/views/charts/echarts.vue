<template>
  <div id="myChart"
       ref="echarts_my"
       :style="{height: '300px'}"
  >
  </div>
</template>

<script>
    export default {
      name: 'echarts',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
      },
      mounted(){
        this.drawLine();
      },
      methods: {
        drawLine() {
          var bar_dv = this.$refs.echarts_my;
          if (bar_dv) {

          console.info(bar_dv);
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(bar_dv,'macarons')
          // 绘制图表
          myChart.setOption({
            title: {text: '在Vue中使用echarts'},
            tooltip: {},
            xAxis: {
              data: ["一月", "二月", "三月", "四月", "五月", 
              "六月","七月","八月","九月","十月","十一月","十二月"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20,49,50,79,49,17,97]
            }]
          });

            window.addEventListener('resize', function () {
              myChart.resize();
            })

        }
        }
      }
    }
</script>

