<template>
    <div>
        <a-descriptions title="预算详情">
            <a-descriptions-item label="预算科目">
                第二季度基建工程款
            </a-descriptions-item>
            <a-descriptions-item label="预算金额">
                876,190,018.00
            </a-descriptions-item>
            <a-descriptions-item label="预算单位">
                基建工程部
            </a-descriptions-item>

        </a-descriptions>
        <a-divider />
        <a-descriptions
                title="付款详情"
                :column="2"
        >

            <a-descriptions-item :span="1" label="付款单位">
                帝国商业集团全球公司
            </a-descriptions-item>
            <a-descriptions-item :span="1" label="付款账号">
                95589988111776001
            </a-descriptions-item>
            <a-descriptions-item :span="1" label="付款金额">
                876,190,018.00
            </a-descriptions-item>
            <a-descriptions-item :span="1" label="支付日期">
                2020-07-18
            </a-descriptions-item>
            <a-descriptions-item :span="1" label="收款单位">
                国建建设有限公司
            </a-descriptions-item>
            <a-descriptions-item  :span="1" label="收款账号">
                443189800071198101
            </a-descriptions-item>
        </a-descriptions>
        <a-divider/>
        <a-descriptions
                title="支付明细"
        ></a-descriptions>
            <a-list item-layout="horizontal"
                    :data-source="data">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-list-item-meta
                            :description="item.dec"
                    >
                        <span slot="title" >{{ item.title }}</span>

                    </a-list-item-meta>
                    <div style="font-weight: bold">{{item.money}}</div>
                </a-list-item>
            </a-list>
        <a-divider/>
        <a-descriptions title="审批信息"/>
        <a-timeline>
            <a-timeline-item>
                <p>提交人：会计 时间：2020-07-01</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>复核人：财务经理  时间：2020-07-02</p>
            </a-timeline-item>
            <a-timeline-item>
                <p>审批人：总经理  时间：2020-07-05</p>
            </a-timeline-item>

        </a-timeline>

    </div>
</template>

<script>
    const data = [
        {
            title: '原材料采购',
            dec:'基建原材料，水泥、钢材、土方、碎石、木材。',
            money:'590,817,283.01'
        },
        {
            title: '人工成本',
            dec:'建设工人，工资、饮食、住宿、交通费用。',
            money:'168,922,910.18'
        },

    ];
    export default {
        name: "infoPage",
        data(){
            return{
                data
            }
        }
    }
</script>

<style scoped>

</style>