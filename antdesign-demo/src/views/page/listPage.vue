<template>
    <div>
        <a-row :gutter="[6,6]">
            <a-col :span="24">
                <a-card title="查询条件">
                    <a-form-model :model="form"
                                  :hideRequiredMark="true"
                                  :colon="false"
                                  :label-col="{span:6}"
                                  :wrapper-col="{span:16}">
                        <a-row :gutter="6">
                            <a-col :span="6">
                                <a-form-model-item label="单据名称">
                                    <a-input v-model="form.title"></a-input>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="6">
                                <a-form-model-item label="单据编号">
                                    <a-input v-model="form.no"></a-input>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-model-item label="查询日期">
                                    <a-range-picker  v-model="form.date">
                                        <a-icon slot="suffixIcon" type="calendar" />
                                    </a-range-picker>
                                </a-form-model-item>
                            </a-col>
                        </a-row>

                        <a-row :gutter="6">
                            <a-col :span="24">
                                <a-button type="primary">
                                    查询
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form-model>
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="[6,6]">
            <a-col :span="24">
                <a-card title="数据列表">
                    <a-button-group>
                        <a-button  icon="plus-circle" @click="showDrawer"/>
                        <a-button  icon="delete" />
                        <a-button  icon="cloud-download" />
                    </a-button-group>
                    <a-table
                            :columns="columns"
                            :bordered="true"
                            :scroll="{ x: 400, y: 400 }"
                            :row-selection="rowSelection"
                            :pagination="{size:'small',showSizeChanger:true,
                            showQuickJumper:true}"
                            :data-source="data">

                        <a-icon slot="action"  type="edit" @click="showDrawerEdit"
                                style="fontSize:20px;color:#1890ff;marginRight: 8px;cursor:pointer"/>
                        <a-icon slot="action"  type="search" @click="showDrawerInfo"
                                style="fontSize:20px;color:#1890ff;cursor:pointer"/>
                        <!--<a-icon slot="action" type="delete"
                                style="fontSize:20px;color:#faad14;cursor:pointer"/>-->
                    </a-table>
                </a-card>
            </a-col>
        </a-row>

        <div>
            <a-drawer
                    title="新增数据"
                    placement="right"
                    :closable="true"
                    :visible="visible"
                    :maskClosable="false"
                    :width="700"
                    :after-visible-change="afterVisibleChange"
                    @close="onClose"
            >
                <addPage ref="myaddpage" style="margin-bottom: 32px"/>
                <div
                        :style="{
                          position: 'absolute',
                          bottom: 0,
                          width: '100%',
                          borderTop: '1px solid #e8e8e8',
                          padding: '10px 16px',
                          textAlign: 'left',

                          left: 0,
                          background: '#fff',
                          borderRadius: '0 0 4px 4px',
        }"
                >
                    <a-button style="marginRight: 8px" type="primary" @click="onClose">
                        新增
                    </a-button>
                    <a-button  @click="onClose">
                        取消
                    </a-button>
                </div>
            </a-drawer>
        </div>
        <div>
            <a-drawer
                    title="单据详情"
                    placement="right"
                    :closable="true"
                    :visible="visibleInfo"
                    :maskClosable="false"
                    :width="700"
                    :after-visible-change="afterVisibleChangeInfo"
                    @close="onCloseInfo"
            >
                <infoPage/>
            </a-drawer>
        </div>
    </div>
</template>

<script>
    import addPage from './addPage'
    import infoPage from './infoPage'
    const columns = [
        {
            title: '月份',
            dataIndex: 'month',
            key: 'month'

        },
        {
            title: '销售额',
            dataIndex: 'saleCount',
            key: 'saleCount'

        },
        {
            title: '门店',
            dataIndex: 'hall',
            key: 'hall'

        },
        {
            title: '电话',
            dataIndex: 'tel',
            key: 'tel'

        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'action' },
        }
    ];
    const data = [
        {
            key: '1',
            month: '一月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '2',
            month: '二月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '3',
            month: '三月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '4',
            month: '四月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '5',
            month: '五月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '6',
            month: '六月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '7',
            month: '七月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '8',
            month: '八月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '9',
            month: '九月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '10',
            month: '十月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '11',
            month: '十一月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        },
        {
            key: '12',
            month: '十二月',
            saleCount: 178267.88,
            hall:'中心店',
            tel:'875556666'
        }
    ]

    export default {
        name: "listPage",
        components:{
            'addPage':addPage,
            infoPage
        },
        data(){
            return{
                form:{
                    title:'',
                    no:'',
                    date:[],

                },
                columns,
                data,
                visible: false,
                visibleInfo:false

            }
        },
        computed: {
            rowSelection() {
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    }
                };
            },
        },
        methods:{
            afterVisibleChange(val) {
                console.log('visible', val);
            },
            showDrawer() {
                this.visible = true;
                this.$nextTick(()=>{
                    console.log(this.$refs.myaddpage)
                    this.$refs.myaddpage.form1.name=''
                })
            },
            showDrawerEdit() {
                console.log(this.$refs)
                //this.$refs.myaddpage.setValue();
                this.visible = true;
                this.$nextTick(()=>{
                    console.log(this.$refs.myaddpage)
                    this.$refs.myaddpage.form1.name='杰克马'
                })
            },
            onClose() {
                this.visible = false;
            },
            afterVisibleChangeInfo(val) {
                console.log('visibleInfo', val);
            },
            showDrawerInfo() {
                this.visibleInfo = true;
            },
            onCloseInfo(){
                this.visibleInfo = false;
            }
    }
    }
</script>

<style scoped>

</style>