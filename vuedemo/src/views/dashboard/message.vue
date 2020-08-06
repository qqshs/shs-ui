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
                    label="消息名称"
                    >
            </el-table-column>
            <el-table-column
                    prop="note"
                    label="消息内容">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        name: "message",
        data() {
            return {
                tableData: [{
                    date: '2020-07-02',
                    name: '系统消息',
                    note: '系统登陆人数过多'
                }, {
                    date: '2020-07-02',
                    name: '支付完成',
                    note: '北京提现'
                }, {
                    date: '2020-07-06',
                    name: '警告',
                    note: '系统运行异常'
                }]
            }
        }
    }
</script>

<style scoped>

</style>