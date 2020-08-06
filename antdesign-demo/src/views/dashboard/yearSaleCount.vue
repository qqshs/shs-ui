<template>

    <div id="myChart"
         ref="echarts_my"
         :style="{height: '300px'}"
    >
    </div>

</template>

<script>
    import echarts from '../../config/echarts'
    export default {
        name: "yearSaleCount",
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                var bar_dv = this.$refs.echarts_my;
                if (bar_dv) {

                    console.info(bar_dv);
                    // 基于准备好的dom，初始化echarts实例 this.$echarts
                    let myChart = echarts.init(bar_dv, 'macarons')

                    // 绘制图表
                    myChart.setOption({
                        title: {text: '在Vue中使用echarts'},
                        tooltip: {},
                        legend: {
                            data: ['销量']
                        },
                        toolbox: {
                            show: true,
                            orient: 'horizontal',//horizontal,vertical
                            //left: 'right',
                            right:'10%',
                            top: 'top',
                            feature: {
                                //mark: {show: true},
                               // dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        xAxis: {
                            data: ["一月", "二月", "三月", "四月", "五月",
                                "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
                        },
                        yAxis: {
                            splitLine: {
                                show: false
                            }
                        },
                        series: [{
                            name: '销量',
                            type: 'bar',
                            label: {
                                show: true,
                                position: 'top'//inside,left,top,right
                            },
                            data: [5, 20, 36, 10, 10, 20, 49, 50, 79, 49, 17, 97]
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

<style scoped>

</style>