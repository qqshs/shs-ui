<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="商户注册审核">
      <div class="table-page-search-wrapper">
        <a-form :form="form" layout="inline" class="bytter-search-lable">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="注册日期">
                <a-range-picker v-decorator="['startTime-endTime']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <enum-select
                enumCode="status"
                ref="enumCode"
                :decorator="['status', { rules: []}]"
              ></enum-select>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <CustomerSelect
                  mode="multiple"
                  :localDecorator="['customerIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
                ></CustomerSelect>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="refresh">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => form.resetFields()">重置</a-button>
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

    <a-card :bordered="false">
      <div class="table-operator">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :scroll="{ x: 2300 }"
          :columns="columns"
          :dataHandles="dataHandles"
          showPagination="auto"
        ><span slot="statusMap" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="review(record,'success')">通过</a> | <a @click="review(record,'fail')">拒绝</a>
            </template>
          </span>
        </s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import moment from 'moment'
  import { getCustomerList,reviewCustomer } from '@/api/management'
  import { Ellipsis, ExportExcel } from '@/components'
  import CustomerSelect from '@/components/Select/CustomerSelect'
  const columns = [
    {
      title: '商户名称',
      dataIndex: 'customerName',
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'socialCreditCode',
    },
    {
      title: '银行账号',
      dataIndex: 'bankAcc',
    },
    {
      title: '开户户名',
      dataIndex: 'bankAccName',
    },
    {
      title: '联行号',
      dataIndex: 'bankCode',
    },
    {
      title: '开户行',
      dataIndex: 'bankName',
    },
    {
      title: '管理员姓名',
      dataIndex: 'adminName',
    },
    {
      title: '管理员手机号',
      dataIndex: 'adminPhone',
    },
    {
      title: '管理员邮箱',
      dataIndex: 'adminMail',
      width:180
    },
    {
      title: '登陆账号',
      dataIndex: 'userCode',
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      width:180
    },
    {
      title: '审批时间',
      dataIndex: 'approvalTime',
      width:180
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'statusMap' },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 150,
      scopedSlots: { customRender: 'action' },
      fixed:'right',
    }
  ]
  const statusMap = {
    0: {
      status: 'warning',
      text: '待提交'
    },
    90: {
      status: 'warning',
      text: '待审核'
    },
    95: {
      status: 'success',
      text: '审核成功'
    },
    100: {
      status: 'processing',
      text: '审核失败'
    }
  }
  export default {
    components: {
      Ellipsis,
      ExportExcel,
      CustomerSelect,
    },
    name: 'CustomerReview',
    data() {
      const formVm = this.$form.createForm(this)
      return {
        form: formVm,
        dataHandles: {
          listApi: getCustomerList,
          form: formVm,
          initialParams: {},
        },
        columns,
        loading: true,
        // 高级搜索 展开/关闭
        advanced: false,
      }
    },
    mounted() {},
    methods: {
      refresh() {
        this.$refs.table.refresh(true)
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      review(record,result){
        const param = {}
        param.customerId = record.id
        param.reviewType = result
        reviewCustomer(param).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$refs.table.refresh(true)
          } else {
            this.$message.error(res.msg || '请求错误！')
          }
        })
      }
    },
    filters: {
      statusFilter (type) {
        return statusMap[type].text
      },
      statusTypeFilter (type) {
        return statusMap[type].status
      }
    },
  }
</script>

<style scoped>
</style>