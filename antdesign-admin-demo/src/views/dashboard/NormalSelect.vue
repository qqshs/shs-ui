<script>
import { customerLandSelect } from '@/api/common'
import S from 'ant-design-vue/es/select'

// import { Select } from 'ant-design-vue'
export default {
  props: Object.assign(S.props, {
    localDecorator: {
      type: Array,
    },
    labelName: {
      type: String,
      default: '类型',
    },
  }),
  data() {
    return {
      selectOptions: [],
    }
  },
  mounted() {
    customerLandSelect().then((res) => {
      if (res.code === 0) {
        // this.selectOptions = res.data
        this.selectOptions = [
          { value: 'a', code: '1' },
          { value: 'd', code: '2' },
          { value: 'vdcvd', code: '3' },
          { value: 'sdfss', code: '4' },
        ]
      } else {
        this.$message.error(res.msg || '请求错误！')
      }
    })
  },
  render() {
    const props = {}
    Object.keys(S.props).map((k) => {
      if (this[k]) {
        props[k] = this[k]
      }
    })
    return (
      <a-form-item label={this.labelName}>
        <a-select mode={this.mode} maxTagCount={1} v-decorator={this.localDecorator} style="width:200px;">
          {this.selectOptions.map((opt) => (
            <a-select-option key={opt.code} value={opt.code}>
              {opt.value}
            </a-select-option>
          ))}
        </a-select>
      </a-form-item>
    )
  },
  methods: {},
}
</script>

<style>
</style>