<template>
  <div>
  <a-row type="flex" justify="center" align="top">
    <a-upload-dragger
      style="width: 50%;margin:50px 0;"
      name="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
      :multiple="false"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox"/>
      </p>
      <p class="ant-upload-text">
        点击选择文件或者把文件拖入.仅支持xlsx
      </p>
      <p class="ant-upload-hint">
        <!-- Support for a single or bulk upload. Strictly prohibit from uploading company data or other
         band files-->
      </p>
    </a-upload-dragger>
  </a-row>
  <a-row type="flex" justify="center" align="top">
      <a-button :loading="loading" type="primary" @click="nextStep">下一步</a-button>
      <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
  </a-row>
  </div>
</template>

<script>
  import { preImport } from '@/api/bytterAjax'

  export default {
    name: 'Step2',
    props: {
      nextData: {
        type: Object
      }
    },
    data() {
      const defFileList = [...this.nextData.fileList]
      return {
        form: this.$form.createForm(this),
        loading: false,
        timer: 0,
        uploading: false,
        fileList: defFileList
      }
    },
    methods: {
      nextStep() {
        this.preImport()
      },
      prevStep() {
        this.$emit('prevStep')
      },
      refresh() {
        this.$refs.table.refresh(true)
      },
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
      preImport() {
        if(this.fileList.length ===0){
          this.$message.warn('请选择的导入文件')
          return
        }
        const formData = new FormData()
        formData.append('importFile', this.fileList[0])
        formData.append('resCode', 'customerUserImport')
        formData.append('fileType', 'xlsx')
        formData.append('customerLand', this.nextData.formData.landIds)
        this.uploading = true

        preImport(formData).then((res) => {
          if (res.code === 0) {
            const { successList, errorList } = res.data
            // this.errorList = data.errorList
            this.uploading = false
            this.$emit('nextStep', Object.assign({ successList, errorList, },{fileList:[this.fileList[0]]}))
          }else{
            this.$message.error(res.msg)
          }
        }).catch((err) => {
          this.uploading = false
          this.$message.error('upload failed.')
        })
      },
      beforeDestroy() {
        clearTimeout(this.timer)
      }
    }
  }
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

</style>
