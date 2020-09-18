<template>
  <page-header-wrapper :title="false">
    <!-- PageHeader 第二种使用方式 (v-slot) -->
    <!--<template v-slot:content>
      将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
    </template>-->
    <a-card :bordered="false" title="用户导入">
      <a-steps class="steps" :current="currentTab">
        <a-step title="选择商户及落地信息" />
        <a-step title="导入发放订单" />
        <a-step title="确认及保存" />
        <a-step title="保存成功" />
      </a-steps>
      <div class="content">
        <div v-show="currentTab === 0">
          <a-form
            :form="form"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            style="max-width: 500px; margin: 40px auto 0;"
          >
            <CustomerSelect
              mode
              :localDecorator="['customerIds', { rules: [{ required: true, message: '商户必选' }] ,initialValue:nextData.formData.customerIds} ]"
              @change="initLandSelect"
            ></CustomerSelect>
            <CustomerLandSelect
              mode
              ref="refCustomerLandSelect"
              :localDecorator="['landIds', { rules: [{ required: true, message: '落地必选' }],initialValue:nextData.formData.landIds }]"
            ></CustomerLandSelect>
          </a-form>
          <a-row type="flex" justify="center" align="top">
            <DownloadTemplate
              fileName="用户导入模板.xlsx"
              :beforRequest="()=>({resCode: 'customerUserDownload'})"
            >下载模板</DownloadTemplate>
            <a-button type="primary" @click="saveFormData" style="margin-left: 50px;">下一步</a-button>
          </a-row>
          <a-divider />
          <div class="step-form-style-desc">
            <h3>说明</h3>
            <h4>step1</h4>
            <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
            <h4>转账到银行卡</h4>
            <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
          </div>
        </div>
        <div v-show="currentTab === 1">
          <a-row type="flex" justify="center" align="top">
            <a-upload-dragger
              style="width: 50%;margin:50px 0;"
              name="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              :file-list="nextData.fileList"
              :remove="handleRemove"
              :before-upload="beforeUpload"
              :multiple="false"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">点击选择文件或者把文件拖入.仅支持xlsx</p>
              <p class="ant-upload-hint">
                <!-- Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files-->
              </p>
            </a-upload-dragger>
          </a-row>
          <a-row type="flex" justify="center" align="top">
            <a-button @click="prevStep">上一步</a-button>
            <a-button
              :loading="loading"
              style="margin-left: 8px"
              type="primary"
              @click="uploadFile"
            >下一步</a-button>
          </a-row>
          <a-divider />
          <div class="step-form-style-desc">
            <h3>step2</h3>
            <h4>转账到支付宝账户</h4>
            <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
            <h4>转账到银行卡</h4>
            <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
          </div>
        </div>
        <div v-if="currentTab === 2">
          <a-card title="预览" style="width: 100%;margin-top:16px;">
            <a-tabs default-active-key="1">
              <a-tab-pane key="1">
                <span slot="tab">
                  <a-badge :count="nextData.successList.length" :offset="[8,0]" showZero>成功数据</a-badge>
                </span>
                <ExportExcel fileName="成功数据" :listApi="dataHandles1.listApi" :columns="columns"></ExportExcel>
                <s-table
                  ref="table"
                  size="default"
                  rowKey="indexNo"
                  :columns="columns"
                  :dataHandles="dataHandles1"
                  :showPagination="false"
                ></s-table>
              </a-tab-pane>
              <a-tab-pane key="2">
                <span slot="tab">
                  <a-badge :count="nextData.errorList.length" :offset="[8,0]" showZero>错误数据</a-badge>
                </span>
                <ExportExcel fileName="失败数据" :listApi="dataHandles2.listApi" :columns="columns"></ExportExcel>
                <s-table
                  ref="table2"
                  size="default"
                  rowKey="indexNo"
                  :columns="columns"
                  :showPagination="false"
                  :dataHandles="dataHandles2"
                ></s-table>
              </a-tab-pane>
            </a-tabs>
          </a-card>
          <br />
          <a-row type="flex" justify="center" align="top">
            <a-button :loading="loading" type="primary" @click="ensureSave">提交</a-button>
            <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
            <a-button style="margin-left: 8px" @click="$refs.table.refresh()">测试 再次上传！</a-button>
          </a-row>

          <a-divider />
          <div class="step-form-style-desc">
            <h3>说明</h3>
            <h4>step3</h4>
            <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
            <h4>转账到银行卡</h4>
            <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
          </div>
        </div>
        <div v-show="currentTab === 3">
          <a-result
            status="success"
            sub-title=" 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容"
            title="提交成功"
          >
            <template #extra>
              <a-button type="primary">查看列表</a-button>
              <a-button style="margin-left: 8px">重新导入</a-button>
            </template>
          </a-result>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { preImport } from '@/api/bytterAjax'
import { exportDataExcel } from '@/api/common'
import DownloadTemplate from '@/components/Button/DownloadTemplate'
import ExportExcel from '@/components/Button/ExportExcel/ExportExcel'
import { customerUserAdd } from '@/api/econtract'

//indexNo#name#pinNo#phoneNo#bankAcc#money#remark
const columns = [
  {
    title: '序号',
    dataIndex: 'indexNo',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '身份证号',
    dataIndex: 'pinNo',
  },
  {
    title: '手机号',
    dataIndex: 'phoneNo',
  },
  {
    title: '银行卡号',
    dataIndex: 'bankAcc',
  },
  {
    title: '校验信息',
    dataIndex: 'remark',
  },
]
const responseBase = {
  code: 0,
  data: [],
  page: {
    resultCount: 17,
    pageSize: 50,
  },
}
export default {
  name: 'StepForm',
  components: {
    DownloadTemplate,
    ExportExcel,
  },
  data() {
    return {
      currentTab: 0,
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 16 }, sm: { span: 16 } },
      form: this.$form.createForm(this),
      nextData: {
        formData: {
          customerIds: [],
          landIds: [],
        },
        fileList: [],
        successList: [],
        errorList: [],
        batchNo:''
      },
      loading: false,
      // timer: 0,
      uploading: false,
      // fileList: [],
      columns,
      ensreLoading: false,
      dataHandles1: {
        listApi: () => Promise.resolve({ data: [] }),
      },
      dataHandles2: {
        listApi: () => Promise.resolve({ data: [] }),
      },
    }
  },
  methods: {
    // handler
    nextStep() {
      // if (this.currentTab >= 2) return
      this.currentTab += 1
    },

    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    // 第一步
    saveFormData() {
      this.form.validateFields((err, values) => {
        if (err) return
        this.nextData.formData = values
        this.nextStep()
      })
    },
    // 第二部 上传
    uploadFile() {
      if (this.nextData.fileList.length === 0) {
        this.$message.warn('请选择的导入文件')
        return
      }

      const formData = new FormData()
      formData.append('importFile', this.nextData.fileList[0])
      formData.append('resCode', 'customerUserImport')
      formData.append('fileType', 'xlsx')
      // formData.append('customerLand', this.nextData.formData.landIds)
      formData.append('param', `{"customerId":"${this.nextData.formData.customerIds}","landId":"${this.nextData.formData.landIds}"}`)

      this.uploading = true
      this.axios
        .post(location.origin + '/api/fileService/fileService/preImport', formData)
        .then((res) => {
          if (res.code === 0) {
            const { data } = res
            if (data.resultCode === 0) {
              this.$message.info(data.message)
              const { successList, errorList,batchNo } = data
              this.nextData.successList = successList
              this.nextData.errorList = errorList
              this.nextData.batchNo = batchNo
              this.dataHandles1.listApi = () => Promise.resolve(Object.assign(responseBase, { data: successList }))
              this.dataHandles2.listApi = () => Promise.resolve(Object.assign(responseBase, { data: errorList }))
              this.nextStep()
            } else {
              this.$message.info(data.message)
            }
          }
          this.uploading = false
        })
        .catch((err) => {
          this.uploading = false
          this.$message.error('upload failed.')
        })
    },
    finish() {
      this.currentTab = 0
    },
    initLandSelect(v) {
      this.$refs.refCustomerLandSelect.initSelectOptions(v instanceof Array ? v : [v])
      this.form.resetFields(['landIds'])
    },

    refresh() {
      this.$refs.table.refresh(true)
    },
    beforeUpload(file) {
      this.nextData.fileList = [file]
      return false
    },
    handleRemove(file) {
      const index = this.nextData.fileList.indexOf(file)
      const newFileList = this.nextData.fileList.slice()
      newFileList.splice(index, 1)
      this.nextData.fileList = newFileList
    },
    // preImport()
    // finish() {
    //   this.$emit('finish')
    // },
    // prevStep() {
    //   this.$emit('prevStep')
    // },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    ensureSave() {
      // 先上传文件 成功后保存数据
      this.ensreLoading = true

      const formData = new FormData()
      formData.append('importFile', this.nextData.fileList[0])
      formData.append('type', 'customerUserImport')
      formData.append('customerId', this.nextData.formData.customerIds);
      formData.append('batchNo', this.nextData.batchNo)

      this.axios
        .post(location.origin + '/api/bytterEdmPay/bytterEdmPay/fileService/save/importFile', formData)
        .then((res) => {
            if(res.code === 0){
                // 上传成功后 提交数据
                customerUserAdd({
                    successList: this.nextData.successList,
                    errorList: this.nextData.errorList,
                     batchNo: this.nextData.batchNo,
                     customerId:  this.nextData.formData.customerIds,
                })
                .then((res) => {
                this.ensreLoading = false
                this.$message.success('导入成功！')
                this.nextStep()
                })
                .catch((err) => {
                this.ensreLoading = false
                console.log(err)
                })
            }else{
                this.ensreLoading = false
                this.$message.error('导入失败！')
            }
       
        })
        .catch((err) => {
          this.ensreLoading = false
          this.$message.error('upload failed.')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
.information {
  line-height: 22px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
.money {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
.stepFormText {
  margin-bottom: 24px;

  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}
</style>
