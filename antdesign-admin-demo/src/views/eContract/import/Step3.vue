<template>
  <div>
    <a-card title="预览" style="width: 100%;margin-top:16px;">
      <!--<div slot="extra">
        <a-button
          :type="successList.length>0 || errorList.length>0 ? 'primary': ''"
          @click="ensureSave"
          :loading="ensreLoading"
        >确定保存</a-button>
      </div>-->

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
    <br>
    <a-row type="flex" justify="center" align="top">
      <a-button :loading="loading" type="primary" @click="finish">提交</a-button>
      <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      <a-button style="margin-left: 8px" @click="$refs.table.refresh()">测试 再次上传！</a-button>
    </a-row>
  </div>
</template>

<script>
  import { ExportExcel } from '@/components'

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
  name: 'Step3',
  props: {
    nextData: {
      type: Object,
    },
  },
  data() {
    return {
      columns,
      loading: false,
      ensreLoading: false,
      options: [],
      val: [],
      uploading: false,
      dataHandles1: {
        listApi: () => Promise.resolve({ data: this.nextData.successList }),
        // listApi: () => Promise.resolve(Object.assign(responseBase, { data: successList })),
      },
      dataHandles2: {
        listApi: () => Promise.resolve({ data: this.nextData.errorList }),
      },
    }
  },
  methods: {
    finish() {
      this.$emit('finish')
    },
    prevStep() {
      this.$emit('prevStep')
    },
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
<style lang="less" scoped>
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
</style>
