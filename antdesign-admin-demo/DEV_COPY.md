### 表单验证

```
- 验证规则
// 表单会识别值的格式 尤其是数字与字符串 请明确指定格式 比如 [{ required: true, type:'number'...
  noteRules: [
        { required: true, message: '必填' },
        { type: 'string', message: '请输入字符串！' },
        { pattern: /^[a-z]$/, message: '格式不正确！' },
        { min: 2, max: 6, message: '请输入2-6的数字!' },
        { validator: validaNa }
        ]
    }

-  验证并提交
     this.form.validateFields((err, values) => {
        if (!err) {
          console.log('this is form value', values)
        }
      })

-  重置表单
 // 意思是重置为初始状态 默认值会保留
this.form.resetFields()

- 清空

    this.initData = {}
    this.form.resetFields()

- 设置
    setFiledsValue(){
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,'description','status'));
      });
    }

```

### 日期转换

```
 // datepicker 接受/返回的数据是 moment对象，同后台交互时需要进行格式转换  需要安装依赖moment
 import moment from 'moment'
// 获取
this.formValue.createDate = this.formValue.createDate.format('YYYY-MM-DD') // 2018-05-06
this.formValue.createDate = this.formValue.createDate.format('x') // 1566970446059
// 设置
this.form.setFieldsValue({ createDate: moment('2019-01-02') })
this.form.setFieldsValue({ createDate: moment(1566970446059) })
```

### value 转换 label

```

```

### 路由跳转

```
// 路由跳转及传参
router.push({ path: 'home' })
router.push({ path: 'register', query: { id: 666 }})

<router-link :to="'home'">Home</router-link>
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>

// 取参数
this.$router.query.id
```

### table 自定义列

- 方法 1
  > 自定义插槽名，使用插槽 slot-scope="record, index, indent, expanded"

```
const columns = [... {
    title: '描述',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' } // 定义自定义插槽 name
  }]

  <s-table >
    <span slot="description" slot-scope="text">
      <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
    </span>
  </s-table>
```

- 方法 2 直接返回需要渲染的内容

```
const columns = [... {
    title: '描述',
    dataIndex: 'description',
    customRender: (text) => text + ' 次'
  }]
```
