<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="用户列表">
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
                    <a-input v-decorator="['userCode']" class="input"></a-input>
                </a-form-item>
            </a-col>
            <div v-show="advanced">
                <a-col :md="8" :sm="24">
                <a-form-item label="角色名称">
                    <a-input v-decorator="['userName']" class="input"></a-input>
                </a-form-item>
            </a-col>
            </div>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
               <a-button type="primary"  @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px"  @click="form.resetFields()">重置</a-button>
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
        <s-table ref="table"
                 size="default"
                 rowKey="userCode"
                 :columns="columns"
                 :dataHandles="dataHandles"
                 showPagination="auto">
          <span slot="action"
                slot-scope="text, record">
            <template>
              <a-popconfirm :title="record.validSign === '0' ? '启用':'停用'"
                            @confirm="handleUnlock(record)">
                <a>{{record.validSign === "0" ? "启用":"停用"}}</a>
              </a-popconfirm>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？"
                            @confirm="handleDelete(record)">
                <a>删除</a>
              </a-popconfirm>
              <a-divider type="vertical" />
              <a @click="handleResetPwd(record)">重置密码</a>
            </template>
          </span>
        </s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { Ellipsis, ExportExcel } from '@/components'
import { userList, userAddUrl, deleteUserUrl, resetPasswordUrl, unlockUserUrl } from '@/api/basis'
import StepByStepModal from '@/views/list/modules/StepByStepModal'
import CreateForm from '@/views/list/modules/CreateForm'
import CustomerSelect from '@/components/Select/CustomerSelect' // 自定义 枚举下拉
import { number_format } from '@/utils/number'
// 动态切换组件
import UserAdd from '@/views/basis/UserAdd'

const columns = [
  {
    title: '用户账号',
    dataIndex: 'userCode',
    align: 'center',

  },
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center',

  },
  {
    title: '手机',
    dataIndex: 'mobile',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '办公电话',
    dataIndex: 'officeTel',
    align: 'center'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center',
    ellipsis: true
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    align: 'center',
    ellipsis: true
  },
  {
    title: 'MAC地址',
    dataIndex: 'mac',
    align: 'center',
    ellipsis: true
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    align: 'center',
    ellipsis: true
  },
  {
    title: '创建时间',
    dataIndex: 'grantTime',
    align: 'center',
    width: '180px',
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
    UserAdd,
  },
  name: 'UserList',
  data() {
    const formVm = this.$form.createForm(this)
    return {
      form: formVm,
      dataHandles: {
        listApi: userList,
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
        userCode: '',
        userName: '',
      },
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  methods: {
    handleAdd () {
      // 新增
        new Promise((resolve, reject) => {
            setTimeout(() => {
            resolve()
            }, 1000)
        }).then(res => {
            this.visible = false
            this.confirmLoading = false
            // // 重置表单数据
            // form.resetFields()
            // // 刷新表格
            // this.$refs.table.refresh()

            // this.$message.info('新增成功')
        })
    },
    handleUnlock (record) {
       let {userCode,validSign} = record 
        unlockUserUrl({userCode,validSign}).then((res) => {
            if (res.code === 0) {
                 // 刷新表格
                this.$refs.table.refresh()
                this.$message.info(res.msg)
            } else {
                this.$message.error(res.msg)
            }
            that.refresh()
            that.spinning = false
        })
        .catch((err) => {
        this.ensreLoading = false
        console.log(err)
        })
    },
    handleDelete (record) {
        let {userCode} = record 
        deleteUserUrl({userCode}).then((res) => {
            if (res.code === 0) {
                 // 刷新表格
                this.$refs.table.refresh()
                this.$message.success('删除成功！')
            } else {
                this.$message.error(res.msg)
            }
            that.refresh()
            that.spinning = false
        })
        .catch((err) => {
        this.ensreLoading = false
        console.log(err)
        })
    },
    handleResetPwd (record) {
        let {userCode} = record 
        resetPasswordUrl({userCode}).then((res) => {
            if (res.code === 0) {
                 // 刷新表格
                this.$refs.table.refresh()
                this.$message.success('重置密码成功！')
            } else {
                this.$message.error(res.msg)
            }
            that.refresh()
            that.spinning = false
        })
        .catch((err) => {
        this.ensreLoading = false
        console.log(err)
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