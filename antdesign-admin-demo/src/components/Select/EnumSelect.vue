<script>
import { GetEnumItems } from '@/api/bytterAjax'

// 使用方法
//  <a-form :form="form" :layout="'inline'">
//       <enum-select
//         enumCode="voucherStat"
//         ref="enumCode"
//         :decorator="['status', { rules: [{ required: true, message: 'Please input status!' }]}]"
//       ></enum-select>
//       </a-form>

export default {
  name: 'EnumSelect',
  props: {
    enumCode: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    triggerChange: Boolean,
    disabled: Boolean,
    decorator: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { isInited: false, dictOptions: [], formItemLabel: '', selectVal: [], selectAllValues: [] }
  },
  created() {
    this.initSelectOptions()
  },
  methods: {
    initSelectOptions() {
      var params = { code: this.enumCode }
      GetEnumItems(params).then((res) => {
        if (res.code === 0) {
          this.dictOptions = res.data.dict
          this.formItemLabel = res.data.name
          this.isInited = true
          this.selectAllValues = res.data.dict.map((r) => r.code)
        }
      })
    },
    handleChange(e) {
      this.selectVal = e
      this.$emit('change', e)
      this.$emit('input', e)
    },
    getAllValue() {
      return this.dictOptions.map((r) => r.code)
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
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
  },
  render(h) {
    console.log(this.formItemLabel)
    const selectNode = (
      <a-select
        placeholder={this.placeholder}
        disabled={this.disabled}
        mode={'multiple'}
        style="width:200px;"
        onchange={this.handleChange}
        maxTagCount={1}
        showSearch
        filterOption={this.filterOption}
        optionFilterProp="children"
        allowClear
        vDecorator={this.decorator}
      >
        {this.dictOptions.map((item) => (
          <a-select-option key={item.code} value={item.code}>
            {item.name}
          </a-select-option>
        ))}
      </a-select>
    )

    // return selectNode
    return h('AFormItem', { props: { label: this.formItemLabel } }, [selectNode])
  },
}
</script>

<style scoped>
</style>