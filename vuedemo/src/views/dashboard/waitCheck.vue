<template>
    <div>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="事项名称"
                    >
            </el-table-column>
            <el-table-column
                    prop="note"
                    label="事项内容">
            </el-table-column>
        </el-table>
    </div>
    
</template>

<script>
    export default {
        name: "waitCheck",
        data() {
            return {
                tableData: [{
                    date: '2020-07-02',
                    name: '银行卡支付',
                    note: '山西提现'
                }, {
                    date: '2020-07-02',
                    name: '微信支付',
                    note: '北京提现'
                }, {
                    date: '2020-07-06',
                    name: '支付宝支付',
                    note: '上海提现'
                }]
            }
        }
    }
</script>

<style scoped>

</style>