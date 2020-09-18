<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="余额充值审核">
      <div class="table-page-search-wrapper">
        <a-form :form="form" layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="交易日期">
                <a-range-picker v-decorator="['startTime-endTime']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <enum-select
                enumCode="voucherStat"
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
          :columns="columns"
          :dataHandles="dataHandles"
          showPagination="auto"
        >
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
  import { getBalDtl, reviewBalDtl } from '@/api/management'
  import { Ellipsis, ExportExcel } from '@/components'
  import CustomerSelect from '@/components/Select/CustomerSelect'
  const columns = [
    {
      title: '流水号',
      dataIndex: 'bankSerialNo',
    },
    {
      title: '商户名称',
      dataIndex: 'customerName',
    },
    {
      title: '付款银行',
      dataIndex: 'customerBankName',
    },
    {
      title: '付款银行卡',
      dataIndex: 'customerBankAcc',
    },
    {
      title: '落地公司',
      dataIndex: 'landName',
    },
    {
      title: '落地公司银行',
      dataIndex: 'landBankName',
    },
    {
      title: '落地公司银行卡',
      dataIndex: 'landBankAcc',
    },
    {
      title: '充值金额',
      dataIndex: 'amt',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '交易时间',
      dataIndex: 'transTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 150,
      scopedSlots: { customRender: 'action' }
    }
  ]
  export default {
    components: {
      Ellipsis,
      ExportExcel,
      CustomerSelect,
    },
    name: 'BalReview',
    data() {
      const formVm = this.$form.createForm(this)
      return {
        form: formVm,
        dataHandles: {
          listApi: getBalDtl,
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
        param.id = record.id
        param.reviewType = result
        reviewBalDtl(param).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$refs.table.refresh(true)
          } else {
            this.$message.error(res.msg || '请求错误！')
          }
        })
      }
    },
  }
</script>

<style scoped>
</style>