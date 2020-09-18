<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false" title="酬金账户发放流水查询">
      <div class="table-page-search-wrapper">
        <a-form :form="form" layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="交易日期">
                <a-range-picker v-decorator="['startTime-endTime']"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="收方账户名">
                <a-input v-decorator="['payeeAccName']"></a-input>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="收方账号">
                  <a-input v-decorator="['payerAcc']"></a-input>
                </a-form-item>
              </a-col>
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
      <div  class="table-operator">
        <tag-select @change="fliterTable" v-if="filterOptions.length>0" style="float:right;">
          <tag-select-option
            v-for="val in filterOptions"
            :key="val.code"
            :value="val.code"
          >{{ val.name }}</tag-select-option>
        </tag-select>
      </div>
      <div class="table-operator">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :dataHandles="dataHandles"
          showPagination="auto"
        ></s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { getPayFlowRecordList } from '@/api/customer'
  import { Ellipsis,TagSelect } from '@/components'
  import CustomerSelect from '@/components/Select/CustomerSelect'
  import { getTagSelected } from '@/utils/util'
  import { GetEnumItems } from '@/api/bytterAjax'
  const columns = [
  {
    title: '商户名称',
    dataIndex: 'customerName',
  },
  {
    title: '订单号',
    dataIndex: 'payId',
  },
  {
    title: '落地公司',
    dataIndex: 'landName',
  },
  {
    title: '收方户名',
    dataIndex: 'payeeAccName',
  },
  {
    title: '收方账号',
    dataIndex: 'payerAcc',
  },
  {
    title: '身份证号',
    dataIndex: 'pinNo',
  },
  {
    title: '交易金额',
    dataIndex: 'fee',
  },
  {
    title: '日期',
    dataIndex: 'returnTime',
    align:'right'
  },
]
  const TagSelectOption = TagSelect.Option

export default {
  components: {
    Ellipsis,
    CustomerSelect,
    TagSelect,
    TagSelectOption,
  },
  name: 'AccDtl',
  data() {
    const formVm = this.$form.createForm(this)
    return {
      form: formVm,
      dataHandles: {
        listApi: getPayFlowRecordList,
        form: formVm,
        handleRequest: (req) => {
          return req
        },
        initialParams: {
          voucherStats: [],
        },
      },
      columns,
      loading: true,
      // 高级搜索 展开/关闭
      advanced: false,
      filterOptions: [],
      voucherStat: '',
    }
  },
  mounted() {
    // this.loadAll() //模拟从后台获取数据后，显示数据，隐藏骨架屏
    this.getFilterOptions()
  },
  methods: {
    refresh() {
      this.$refs.table.refresh(true)
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    fliterTable(v) {
      this.dataHandles.initialParams.voucherStats = getTagSelected({
        current: v,
        options: this.filterOptions,
        selectedKeys: this.dataHandles.initialParams.voucherStats,
      })
      this.$refs.table.refresh(true)
    },
    getFilterOptions() {
      GetEnumItems({ code: 'voucherStat' }).then((res) => {
        if (res.code === 0) {
          this.filterOptions = res.data.dict
        }
      })
    },
  },
}
</script>

<style scoped>

</style>