<template>
  <page-header-wrapper :title="false">
    <!-- PageHeader 第二种使用方式 (v-slot) -->
    <!--<template v-slot:content>
      将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
    </template>-->
    <a-card :bordered="false" title="佣金用户录入">
      <a-steps class="steps" :current="currentTab">
        <a-step title="选择商户及落地信息" />
        <a-step title="导入佣金用户文件" />
        <a-step title="确认及保存" />
      </a-steps>
      <div class="content">
        <step1 v-if="currentTab === 0" @nextStep="nextStep"  :nextData="nextData" />
        <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" :nextData="nextData"/>
        <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish" :nextData="nextData"/>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2,
    Step3
  },
  data () {
    return {
      currentTab: 0,
      // form
      form: null,
      nextData:{
        formData:{},
        fileList:[],
        successList:[],
        errorList:[],
      },
    }
  },
  methods: {

    // handler
    nextStep (nextData) {
      this.currentTab += 1
      Object.assign(this.nextData,nextData)
    },

    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
