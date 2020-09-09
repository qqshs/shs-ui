<script>
import { GetEnumItems } from '@/api/common'

// 使用方法
// 无须引入
// <a-form-item label="Note2">
//         <enum-select
//           enumCode="enumCodeXXX"
//           ref="enumCode"
//           v-decorator="['z3', { rules: [{ required: true, message: 'Please input your z3!' }] , initialValue : []}]"
//         ></enum-select>
//       </a-form-item>

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
    value: {
      type: [Array, undefined, String],
    },
    decorator: {
      type: [Object, Array],
    },
  },
  data() {
    return { dictOptions: [], formItemLabel: '' ,selectVal:[]}
  },
  created() {
    this.initDictData(this.enumCode)
  },
  methods: {
    initDictData(code) {
      var params = { code }
      GetEnumItems(params).then((res) => {
        if (res.code === 0) {
          this.dictOptions = res.data.dict
          this.formItemLabel = res.data.name
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
    // setCurrentDictOptions(dictOptions) {
    //   this.dictOptions = dictOptions
    // },
    // getCurrentDictOptions() {
    //   return this.dictOptions
    // },
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
        style="width200px;"
        value={this.selectVal}
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