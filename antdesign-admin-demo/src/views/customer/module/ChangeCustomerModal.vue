<template>
  <a-modal v-model="visible" :title="title" @ok="handleOk">
    <a-card>
      <a-table :columns="columns" rowKey="id" :data-source="data" :pagination="false">
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="changeCustomer(record)">切换</a>
          </template>
        </span>
      </a-table>
    </a-card>
  </a-modal>
</template>

<script>
  import { CustomerSelect } from '@/api/bytterAjax'
  const columns = [
    {
      title: '商户名称',
      dataIndex: 'customerName',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ]
  const data = []
export default {
  components: {
    CustomerSelect,
  },
  data() {
    return {
      visible: false,
      title: '用户编辑',
      initialValue: {},
      columns,
      data,
    }
  },
  methods: {
    show({ title, data }) {
      this.initialValue = data
      this.title = title
      this.visible = true
      this.CustomerSelect()
    },
    handleOk() {
      this.visible = false
    },
    changeCustomer(record){
      this.visible = false
      this.$emit('ok',record.id)
      this.$message.success('切换成功')
    },
    CustomerSelect() {
      CustomerSelect().then((res) => {
        if (res.code === 0) {
          this.data = res.data
        } else {
          this.$message.error(res.msg || '请求错误！')
        }
      })
    },
  },
}
</script>

<style>
</style>