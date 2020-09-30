<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="角色列表">
      <div class="table-page-search-wrapper">
         <a-form :form="form" layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="创建日期">
                <a-range-picker v-decorator="['startDate-endDate']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="角色编号">
                <a-input v-decorator="['roleCode']" class="input"></a-input>
              </a-form-item>
            </a-col>
            <div v-show="advanced">
                 <a-col :md="8" :sm="24">
                <a-form-item label="角色名称">
                    <a-input v-decorator="['roleName']" class="input"></a-input>
                </a-form-item>
                </a-col>
            </div>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="form.resetFields()">重置</a-button>
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
            <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      </div>

      <div class="table-operator">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :dataHandles="dataHandles"
          showPagination="auto"
        >
            <span slot="action" slot-scope="text, record">
                <template>           
                    <a @click="handleEdit(record)" v-if="record.validSign === 1">停用</a>
                    <a-divider type="vertical" v-if="record.validSign === 1"/>           
                    <a @click="handleSub(record)" v-if="record.validSign === 0">启用</a>
                    <a-divider type="vertical" v-if="record.validSign === 0"/>                  
                    <a @click="handleSub(record)">编辑 </a>
                </template>
            </span>
        </s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { Ellipsis,ExportExcel } from '@/components'
import { roleList,roleAddUrl,updateRoleUrl,deleteRoleUrl } from '@/api/role'
import StepByStepModal from '@/views/list/modules/StepByStepModal'
import CreateForm from '@/views/list/modules/CreateForm'
import CustomerSelect from '@/components/Select/CustomerSelect' // 自定义 枚举下拉
import { number_format } from '@/utils/number'

const columns = [
  {
    title: '角色编号',
    dataIndex: 'roleCode',
    align: 'center',
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '说明',
    dataIndex: 'rmk',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    width: '180px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    number_format,
    Ellipsis,
    CreateForm,
    StepByStepModal,
  },
  name: 'RoleList',
  data() {
    const formVm = this.$form.createForm(this)
    return {
      form: formVm,
      dataHandles: {
        listApi: roleList,
        form: formVm,
        initialParams: {},
      },
      columns,
      loading: true,
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        roleCode: '',
        roleName: '',
      },
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  methods: {
    handleAdd() {
      // 新增
      const formData = new FormData()
      formData.append('importFile', this.nextData.fileList[0])
      formData.append('type', 'customerUserImport')
      formData.append('customerId', this.nextData.formData.customerIds);
      formData.append('batchNo', this.nextData.batchNo)
    
    },

    handleEdit(record) {
        debugger
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
    initLandSelect(v) {
        this.$refs.refCustomerLandSelect.initSelectOptions(v instanceof Array ? v : [v])
    },
  },
}
</script>

<style scoped>
</style>