<template>
  <transition name="el-fade-in">

    <div v-show="show">
        <el-row :gutter="20" style="margin-bottom: 10px;">
            <el-col  :xs="24" :sm="12" :md="6" >
                <el-card  :body-style="{height:'70px'}" >
                    <el-row class="headbg">
                        <el-col :span="12">
                            <i class="el-icon-s-goods" style="font-size:60px;color:#0591FC"></i>
                        </el-col>
                        <el-col :span="12" style="text-align: center;">
                            <span>当日营业额<br>5,897.98</span>
                        </el-col>
                    </el-row>

                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6" >
                <el-card  :body-style="{height:'70px'}">
                    <el-row>
                        <el-col :span="12">
                            <i class="el-icon-s-order" style="font-size:60px;color:#ff9900"></i>
                        </el-col>
                        <el-col :span="12" style="text-align: center;">
                            <span>当日营业额<br>5,897.98</span>
                        </el-col>
                    </el-row>

                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6" >
                <el-card  :body-style="{height:'70px'}">
                    <el-row>
                        <el-col :span="12">
                            <i class="el-icon-s-data" style="font-size:60px;color:#F56C6C"></i>
                        </el-col>
                        <el-col :span="12" style="text-align: center;">
                            <span>当日营业额<br>5,897.98</span>
                        </el-col>
                    </el-row>

                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6" >
                <el-card  :body-style="{height:'70px'}">
                    <el-row>
                        <el-col :span="12">
                            <i class="el-icon-s-claim" style="font-size:60px;color:#5cadff"></i>
                        </el-col>
                        <el-col :span="12" style="text-align: center;">
                            <span>当日营业额<br>5,897.98</span>
                        </el-col>
                    </el-row>

                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-bottom: 10px;">
            <el-col>
                <el-card >
                    <echarts></echarts>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="12">
                <el-card >
                    <div slot="header">
                        <i class="el-icon-tickets" style="color:#5cadff"></i>
                        &nbsp;
                        <span>待办事项</span>
                        <el-tooltip class="item" effect="dark" content="点击查看更多" placement="bottom">
                            <i class="el-icon-more" style="float: right; padding: 0 0;"></i>
                        </el-tooltip>

                    </div>
                    <waitcheck></waitcheck>

                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card >
                    <div slot="header">
                        <i class="el-icon-chat-line-square" style="color:#5cadff"></i>
                        &nbsp;
                        <span>待阅消息</span>
                        <el-tooltip class="item" effect="dark" content="点击查看更多" placement="bottom">
                            <i class="el-icon-more" style="float: right; padding: 0 0;"></i>
                        </el-tooltip>

                    </div>
                    <message></message>


                </el-card>
            </el-col>
        </el-row>
    </div>
  </transition>
</template>
<script>
    import echarts from '../charts/echarts'
    import waitcheck from './waitCheck'
    import message from './message'

    export default {
        name: 'charts',
        components: {
            echarts,
            waitcheck,
            message
        },
      data(){
        return{
          show:true
        }
      },
      mounted() {
          this.show=true
      }

    }
</script>