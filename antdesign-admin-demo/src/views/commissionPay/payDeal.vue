<template>
  <page-header-wrapper :title="false">
    <a-spin :spinning="spinning">
      <a-card :bordered="false" title="发放订单处理">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" :form="form" class="bytter-search-lable">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="提交日期">
                  <a-range-picker v-decorator="['startDate-endDate']"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收款姓名">
                  <a-input v-decorator="['payeeAccName']" class="input"></a-input>
                </a-form-item>
              </a-col>
              <!--<template v-show="advanced">-->
              <a-col :md="8" :sm="24" v-show="advanced">
                <a-form-item label="收款账户">
                  <a-input v-decorator="['payeeAcc']" class="input"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24" v-show="advanced">
                <CustomerSelect
                  ref="refCustomerSelect"
                  :localDecorator="['customerIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
                  @change="initLandSelect"
                ></CustomerSelect>
              </a-col>
              <a-col :md="8" :sm="24" v-show="advanced">
                <CustomerLandSelect
                  ref="refCustomerLandSelect"
                  :localDecorator="['landIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
                ></CustomerLandSelect>
              </a-col>

              <a-col :md="8" :sm="24" v-show="advanced">
                <enum-select enumCode="billFromType" ref="refBillFromType" :decorator="['billFromTypes']"></enum-select>
              </a-col>
              <!-- </template>-->
              <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="refresh">查询</a-button>
                <a-button style="margin-left: 8px" @click="form.resetFields()">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-card>

      <a-card :bordered="false">
        <div class="table-operator">
          <!--<tag-select @change="fliterTable" v-if="filterOptions.length>0" style="float:right;">
            <tag-select-option
              v-for="val in filterOptions"
              :key="val.code"
              :value="val.code"
            >{{ val.name }}</tag-select-option>
          </tag-select>-->
          <ExportExcel fileName="待处理发放订单" :form="form" :listApi="dataHandles.listApi" :columns="columns"></ExportExcel>
          <!-- <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button> -->
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="checks">
                <a-icon type="check"/>
                提交付款
              </a-menu-item>
              <!-- lock | unlock -->
              <a-menu-item key="2" @click="deletes">
                <a-icon type="delete"/>
                删除
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </div>
        <div class="table-operator">
          <s-table
            ref="table"
            rowKey="id"
            :columns="columns"
            :dataHandles="dataHandles"
            :showAlert="true"
            :rowSelection="rowSelection"
            showPagination="auto"
            size="default"
            :scroll="{ x: 2600 }"
          >
            <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
          </s-table>
        </div>
      </a-card>
    </a-spin>
  </page-header-wrapper>
</template>

<script>
  import moment from 'moment'
  import { STable, Ellipsis, ExportExcel } from '@/components'
  import { commissionPayQuery, commissionAddToPay, commissionPayDelete,checkCustomerBal } from '@/api/commissionPay'
  import { formatDateTime } from '@/utils/util'
  import { number_format } from '@/utils/number'

  import CustomerSelect from '@/components/Select/CustomerSelect' // 自定义 枚举下拉
  import { GetEnumItems } from '@/api/bytterAjax'
  import { StandardFormRow, ArticleListContent } from '@/components'

  const scrolls = { x: true, y: true }
  const columns = [
    // {
    //   title: '#',
    //   scopedSlots: { customRender: 'serial' },
    // },
    {
      title: '商户名称',
      dataIndex: 'customerName',
      align: 'center',
      ellipsis: true
    },
    {
      title: '落地名称',
      dataIndex: 'landName',
      align: 'center',
      ellipsis: true
    },
    {
      title: '商户订单号',
      dataIndex: 'customerPayId',
      align: 'center',
      ellipsis: true
    },
    {
      title: '收款人',
      dataIndex: 'payeeAccName',
      align: 'center',
      ellipsis: true
    },
    {
      title: '收款人身份证',
      dataIndex: 'pinNo',
      align: 'center',
      ellipsis: true
    },
    {
      title: '收款账号',
      dataIndex: 'payeeAcc',
      align: 'center',
      ellipsis: true
    },
    {
      title: '发放金额',
      dataIndex: 'fee',
      align: 'right',
      ellipsis: true,
      customRender: (text, row, index) => {
        return number_format(text)
      }
    },
    {
      title: '订单来源',
      dataIndex: 'blllFromName',
      align: 'center',
      ellipsis: true
    },
    {
      title: '单据备注',
      dataIndex: 'remark',
      align: 'center',
      ellipsis: true
    },
    {
      title: '订单提交时间',
      dataIndex: 'createTime',
      align: 'center',
      ellipsis: true,
      fixed: 'right'
    }
  ]

  export default {
    components: {
      STable,
      Ellipsis,
      CustomerSelect,
      ExportExcel
    },

    data() {
      const formVm = this.$form.createForm(this)
      return {
        selectedFilters: [],
        key: 'tab1',
        voucherStat: '',
        filterOptions: [],
        form: formVm,
        advanced: false,
        spinning: false,
        dataHandles: {
          listApi: commissionPayQuery,
          form: formVm,
          handleRequest: async (req) => {
            if (!req.customerIds || req.customerIds.length === 0) {
              req.customerIds = await this.$refs.refCustomerSelect.getSelectAllValues()
            }

            if (!req.landIds || req.landIds.length === 0) {
              req.landIds = await this.$refs.refCustomerLandSelect.getSelectAllValues()
            }

            if (!req.billFromTypes || req.billFromTypes.length === 0) {
              req.billFromTypes = await this.$refs.refBillFromType.getSelectAllValues()
            }
            return req
          },
          handleResponse: (res) => {
          },
          initialParams: {
            billStatuss: [0],
            signStates:[95],
          }
        },
        columns,
        scrolls,
        loading: true,
        selectedRowKeys: [],
        selectedRows: [],
        customerIds: []
      }
    },
    computed: {
      rowSelection() {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    },
    // watch:{
    //   'customerIds':function(oldValue,newValue) {
    //     console.info(oldValue+"=="+newValue)
    //     this.searchCustomerIds = newValue instanceof String ? [newValue] : newValue
    //     this.$refs.refCustomerLandSelect.reload()
    //   }
    // },
    mounted() {
    },
    methods: {
      refresh() {
        this.$refs.table.refresh(true)
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      initLandSelect(v) {
        this.$refs.refCustomerLandSelect.initSelectOptions(v instanceof Array ? v : [v])
        this.form.resetFields(['landIds'])
      },
      checks() {
        // const b = this.selectedRows[0].customerName
        // for (let i = 0; i < this.selectedRows.length; i++) {
        //   if (this.selectedRows[i].customerName !== b) {
        //     this.$message.warn('每批次提交只能提交一个商户的发放单')
        //     return
        //   }
        // }
        const that = this
        this.$confirm({
          title: '确定提交付款?',
          // content: '每批次提交只能提交一个商户的发放单！',
          onOk() {
            that.spinning = true
            try {
              checkCustomerBal({ selectedRowKeys: that.selectedRowKeys }).then((res) => {
                if(res.code === 0){
                  const data = res.data
                  var message = ''
                  for (let i = 0; i < data.length; i++) {
                    if(data[i].over === '1'){
                      message += '商户['+data[i].customerName+']可用余额['+data[i].availBal+']勾选付款金额['+data[i].sumMoney+'].余额不足\n'
                    }
                  }
                  if(message !== ''){
                    that.$message.error(message)
                    that.refresh()
                  }else{
                    commissionAddToPay({ selectedRowKeys: that.selectedRowKeys }).then((res) => {
                      try {
                        if (res.code === 0) {
                          that.$message.success('提交成功！')
                          that.refresh()
                        } else {
                          that.$message.error(res.msg)
                        }
                      } catch (e) {
                        that.$message.error(e.message)
                      }
                    })
                  }
                }else{
                  that.$message.error(res.msg)
                }
              })
              that.spinning = false
            }catch (e) {
              that.$message.error(e.message)
              that.spinning = false
            }
          },
          onCancel() {
          }
        })
      },
      deletes() {
        const that = this
        this.$confirm({
          title: '确定删除?',
          content: '',
          onOk() {
            that.spinning = true
            commissionPayDelete({ selectedRowKeys: that.selectedRowKeys }).then((res) => {
              if (res.code === 0) {
                that.$message.success('删除成功！')
              } else {
                that.$message.error(res.msg)
              }
              that.refresh()
              that.spinning = false
            })
          },
          onCancel() {
          }
        })
      }
    }
  }
</script>