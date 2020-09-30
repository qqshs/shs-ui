<script>
import { customerLandSelect } from '@/api/bytterAjax'
import { initDefaultProps } from '@/utils/util'
import S from 'ant-design-vue/es/select'
import FT from 'ant-design-vue/es/form/FormItem'

// 用法
// <CustomerLandSelect
//       ref="refCustomerLandSelect"
//       :localStyle="{width:'200px'}"
//       :localDecorator="['landIds', { rules: [{ required: false, message: 'required 类型!' }] }]"
//     ></CustomerLandSelect>
export default {
  name: 'CustomerLandSelect',
  props: Object.assign({}, FT.props, S.props, {
    localDecorator: {
      type: Array,
      required: true,
    },
    label: {
      default: '落地公司',
    },
    localStyle: {
      type: [Object,Array],
      // default: ()=> new Object({width:'333px'})
    },
    mode: {
      default: 'multiple',
    },
    allowClear: {
      default: true,
    },
    customerIds: {
      type: Array,
      default: () => [],
    },
  }),
  data() {
    return {
      selectOptions: [],
      selectAllValues: [],
    }
  },
  methods: {
    initSelectOptions: function (customerIds) {
      if (customerIds && customerIds.length > 0) {
        customerLandSelect({ customerIds: customerIds }).then((res) => {
          if (res.code === 0) {
            this.selectOptions = res.data
            this.selectAllValues = res.data.map((item) => item.code)
          } else {
            this.$message.error(res.msg || '请求错误！')
          }
        })
      } else {
        this.selectOptions = []
      }
    },
    getSelectAllValues() {
      return this.selectAllValues.length > 0 ? this.selectAllValues : null
    },
  },
  render() {
    const selectProps = initDefaultProps(Object.keys(S.props), this)
    const formItemProps = initDefaultProps(Object.keys(FT.props), this)
    return (
      <a-form-item {...{ props: formItemProps }}>
        <a-select
          {...{ props: selectProps }}
          style={this.localStyle}
          v-decorator={this.localDecorator}
          onchange={this.handleChange}
          showSearch
          maxTagCount={1}
        >
          {this.selectOptions.map((opt) => (
            <a-select-option key={opt.code} value={opt.code}>
              {opt.value}
            </a-select-option>
          ))}
        </a-select>
      </a-form-item>
    )
  },
}
</script>

<style>
</style>