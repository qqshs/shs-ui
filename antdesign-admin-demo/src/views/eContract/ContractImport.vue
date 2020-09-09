<template>
  <div>
    <a-card title="用户导入" style="width: 100%">
      <a-form :form="form" @submit="handleSubmit" :layout="'inline'">
        <a-form-item label="类型">
          <a-select
            v-decorator="['customerLand', { rules: [{ required: true, message: 'required 类型!' }] , initialValue : ''}]"
            style="width: 120px"
          >
            <a-select-option
              v-for="opt in options"
              :key="opt.code"
              :value="opt.code"
            >{{ opt.value }}</a-select-option>
          </a-select>
          <!--<customerLand-select v-model="status" enumCode="voucherStat" ref="enumCode"></customerLand-select>-->
        </a-form-item>
        <a-form-item label="附件">
          <a-upload
            :file-list="fileList"
            :remove="handleRemove"
            :before-upload="beforeUpload"
            :showUploadList="false"
          >
            <a-button>{{ uploadFileName }}</a-button>
          </a-upload>
        </a-form-item>

        <a-form-item>
          <!-- type="primary" -->
          <a-button
            :type="successList.length>0 || errorList.length>0 ? '': 'primary'"
            @click="handleUpload"
            :loading="uploading"
          >上传附件</a-button>
        </a-form-item>
        <a-form-item>
          <a-button @click="getInitValu('enumCode')">下载模板</a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card
      title="预览"
      style="width: 100%;margin-top:16px;"
      v-if="successList.length>0 || errorList.length>0"
    >
      <div slot="extra">
        <a-button
          :type="successList.length>0 || errorList.length>0 ? 'primary': ''"
          @click="ensureSave"
          :loading="ensreLoading"
        >确定保存</a-button>
      </div>

      <a-tabs default-active-key="1">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-badge :count="successList.length" :offset="[8,0]" showZero>成功数据</a-badge>
          </span>

          <s-table
            ref="table"
            size="default"
            rowKey="indexNo"
            :columns="columns"
            :data="loadDataSuccess"
            :showPagination="false"
          ></s-table>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-badge :count="errorList.length" :offset="[8,0]" showZero>错误数据</a-badge>
          </span>

          <s-table
            ref="table2"
            size="default"
            rowKey="indexNo"
            :columns="columns"
            :showPagination="false"
            :data="loadDataError"
          ></s-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import {  Ellipsis } from '@/components'
import { getServiceList } from '@/api/manage'
import { customerLandSelect, customerUserAdd } from '@/api/common'
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
    title: '落地编号',
    dataIndex: 'customerLandId',
  },
  {
    title: '备注',
    dataIndex: 'errorResult',
  },
]

export default {
  name: 'ContractImport',
  components: {  Ellipsis },
  data() {
    this.columns = columns

    return {
      form: this.$form.createForm(this),
      ensreLoading: false,
      options: [],
      val: [],
      fileList: [],
      uploading: false,
      successList: [],
      errorList: [],
      loadDataSuccess: () => {
        return Promise.resolve({
          // pageSize: 10,
          // pageNo: 1,
          // totalCount: 100,
          // totalPage: 10,
          data: this.successList,
        })
      },
      loadDataError: () => {
        return Promise.resolve({
          // pageSize: 10,
          // pageNo: 1,
          // totalCount: 100,
          // totalPage: 10,
          data: this.errorList,
        })
      },
    }
  },
  computed: {
    uploadFileName() {
      return this.fileList[0] ? this.fileList[0].name : '选择文件'
    },
  },
  mounted() {
    customerLandSelect().then((res) => {
      // debugger
      this.options = res.data
    })
  },
  methods: {
    beforeUpload(file) {
      // debugger
      this.fileList = [file]
      return false
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    handleUpload() {
      this.form.validateFields((errors, values) => {
        if (errors) {
          return false
        }
        // debugger
        const { fileList } = this
        const formData = new FormData()
        formData.append('importFile', fileList[0])
        formData.append('resCode', 'customerUserImport')
        formData.append('fileType', 'xlsx')
        formData.append('customerLand', values.customerLand)
        this.uploading = true
        this.axios
          .post(location.origin + '/api/fileService/fileService/preImport', formData)
          .then((res) => {
            const { data, message } = res.data
            this.$message.info(message)
            this.successList = data.successList
            this.errorList = data.errorList
            this.uploading = false
          })
          .catch((err) => {
            this.uploading = false
            this.$message.error('upload failed.')
          })
      })
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    getInitValu(ref) {},
    ensureSave() {
      // 先上传文件 成功后保存数据
      this.ensreLoading = true
      const { fileList } = this

      const formData = new FormData()
      formData.append('importFile', fileList[0])
      // formData.append('resCode', 'customerUserImport')
      formData.append('type', 'xlsx')
      // formData.append('customerLand', values.customerLand)
      this.axios
        .post(location.origin + '/api/bytterEdmPay/bytterEdmPay/file/save/importFile', formData)
        .then((res) => {
          // 上传成功后 提交数据
          customerUserAdd({
            param: this.successList,
          })
            .then((res) => {
              this.ensreLoading = false
              this.$message.success('导入成功！')
            })
            .catch((err) => {
              this.ensreLoading = false
              console.log(err)
            })
        })
        .catch((err) => {
          this.ensreLoading = false
          this.$message.error('upload failed.')
        })
    },
  },
}
</script>

<style scoped>
</style>