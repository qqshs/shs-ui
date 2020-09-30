<template>
  <div>
    <a-list
      itemLayout="horizontal"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>

      </a-list-item>
    </a-list>
    <Password ref="passDialog"/>
    <PayPassword ref="payPassDialog"/>
  </div>
</template>

<script>
  import Password from './module/LoginPasswordModal'
  import PayPassword from './module/PayPasswordModal'
  export default {
    components: {
      Password,
      PayPassword,
    },
    data() {
      return {
        data: [
          {
            title: '账户密码',
            description: '用于用户登录',
            value: '',
            actions: { title: '修改', callback: this.updateLoginPassword }
          },
          {
            title: '支付密码',
            description: '用于重要操作',
            value: '',
            actions: { title: '修改', callback: this.updatePayPassword }
          }
        ]
      }
    },
    methods: {
      updateLoginPassword() {
        this.$refs.passDialog.show({ title: '账户密码', data: {} })
      },
      updatePayPassword() {
        this.$refs.payPassDialog.show({ title: '支付密码', data: {} })
      }
    }
  }
</script>

<style scoped>

</style>
