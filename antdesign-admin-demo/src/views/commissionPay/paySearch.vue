<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="酬金发放查询">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" ref="listForm">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="提交日期">
                <a-range-picker v-decorator="[ 'createTime']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="交易日期">
                <a-range-picker v-decorator="[ 'createTime']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="姓名">
                <a-input v-decorator="[ 'name']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="收款账户">
                <a-input v-decorator="[ 'pinNo']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <enum-select
                enumCode="voucherStat"
                ref="enumCode"
                :decorator="['status',{ rules: [{ required: true, message: 'Please input your z3!' }] } ]"
              ></enum-select>
              <!-- <a-form-item label="Note2"> -->
              <!-- </a-form-item> -->
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="落地">
                  <a-input v-decorator="[ 'customerLandId']"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item>
                  <!-- <enum-select v-model="status" enumCode="voucherStat" ref="enumCode"></enum-select> -->
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false">
      <div class="table-operator">
        <a-button type="primary" @click="handleAdd">导出</a-button>
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :showAlert="false"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">查询</a>
            <a-divider type="vertical" />
          </template>
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <step-by-step-modal ref="modal" @ok="handleOk" />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import {  Ellipsis } from '@/components'
import { agreementList } from '@/api/econtract'

import StepByStepModal from '@/views/list/modules/StepByStepModal'
import CreateForm from '@/views/list/modules/CreateForm'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' },
  },
  {
    title: '导入时间',
    dataIndex: 'userCreateTime',
  },
  {
    title: '批次号',
    dataIndex: 'userBatchNo',
  },
  {
    title: '签约人姓名',
    dataIndex: 'userName',
  },
  {
    title: '签约人身份证号',
    dataIndex: 'userPinNo',
  },
  {
    title: '签约人手机号',
    dataIndex: 'userPhoneNo',
  },
  {
    title: '商户名称',
    dataIndex: 'customerName',
  },
  {
    title: '落地公司',
    dataIndex: 'landName',
  },
  {
    title: '签约状态',
    dataIndex: 'agreementStatus',
  },
  // ,
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   width: '150px',
  //   scopedSlots: { customRender: 'action' }
  // }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭',
  },
  1: {
    status: 'processing',
    text: '运行中',
  },
  2: {
    status: 'success',
    text: '已上线',
  },
  3: {
    status: 'error',
    text: '异常',
  },
}

export default {
  components: {
    
    Ellipsis,
    CreateForm,
    StepByStepModal,
  },
  data() {
    this.columns = columns
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      // queryParam: {
      //   name: '',
      //   batchNo: '',
      //   pinNo: '',
      //   dataIndex: '',
      //   customerLandId: '',
      //   createTime: '',
      //   status: '',
      // },
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return ''
        }
        
        })
        const requestParameters = Object.assign({}, parameter)
        console.log('loadData request parameters:', requestParameters)
        return agreementList(requestParameters).then((res) => {
          return {
            pageSize: 10,
            pageNo: 1,
            totalCount: 100,
            totalPage: 10,
            data: res.data.data,
          }
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    },
  },
  created() {
    agreementList({ t: new Date() })
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
  methods: {
    handleAdd() {
      this.mdl = null
      this.visible = true
    },
    handleEdit(record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk() {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then((res) => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then((res) => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date()),
      }
    },
  },
}
</script>

<style scoped>
</style>