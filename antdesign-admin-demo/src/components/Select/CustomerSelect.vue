<script>
import { CustomerSelect } from '@/api/bytterAjax'
import { initDefaultProps } from '@/utils/util'
import S from 'ant-design-vue/es/select'
import FT from 'ant-design-vue/es/form/FormItem'
export default {
  name: 'CustomerSelect',
  props: Object.assign({}, FT.props, S.props, {
    localDecorator: {
      type: Array,
    },
    localStyle: {
      type: [Object,Array],
      // default: ()=> new Object({width:'333px'})
    },
    // prop 覆写
    label: {
      type: String,
      default: '商户名称',
    },
    // showSearch: {
    //   default: true,
    // },
    allowClear: {
      default: true,
    },
    mode: {
      default: 'multiple',
    },
  }),
  data() {
    return {
      isInited: false,
      selectOptions: [],
      selectAllValues: [],
    }
  },
  mounted() {
    this.initSelectOptions()

    // 如果有默认值 要先向外抛出
    // if (this.localDecorator[1] && this.localDecorator[1].initialValue) {
    //   this.$emit('change', this.localDecorator[1].initialValue)
    // }
  },
  methods: {
    initSelectOptions() {
      return CustomerSelect().then((res) => {
        if (res.code === 0) {
          this.selectOptions = res.data
          this.selectAllValues = res.data.map((item) => item.id)
          this.isInited = true
          return this.selectAllValues
        } else {
          this.$message.error(res.msg || '请求错误！')
        }
      })
    },
    handleChange(e) {
      this.$emit('change', e)
      this.$emit('input', e)
    },
    // 无关展示功能与实际选中项目 确保获取到options的值集合
    getSelectAllValues() {
      if (this.isInited) {
        return Promise.resolve(this.selectAllValues.length > 0 ? this.selectAllValues : null)
      } else {
        return this.initSelectOptions().then((res) => {
          return this.selectAllValues.length > 0 ? this.selectAllValues : null
        })
      }
    },
  },
  render() {
    const selectProps = initDefaultProps(Object.keys(S.props), this)
    const formItemProps = initDefaultProps(Object.keys(FT.props), this)
    return (
      <a-form-item {...{ props: formItemProps }}>
        <a-select
          {...{ props: selectProps }}
          showSearch
          maxTagCount={1}
          style={this.localStyle}
          v-decorator={this.localDecorator}
          onchange={this.handleChange}
        >
          {this.selectOptions.map((opt) => (
            <a-select-option key={opt.id} value={opt.id}>
              {opt.customerName}
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