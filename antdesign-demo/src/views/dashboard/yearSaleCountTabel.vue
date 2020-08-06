<template>
    <a-table
            :columns="columns"
            :data-source="data"
            :pagination="false"
    >

    </a-table>

</template>

<script>
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

        }
    ];
    const data = [
        {
            key: '1',
            month: '一月',
            saleCount: 178267.88
        },
        {
            key: '2',
            month: '二月',
            saleCount: 178267.88
        },
        {
            key: '3',
            month: '三月',
            saleCount: 178267.88
        },
        {
            key: '4',
            month: '四月',
            saleCount: 178267.88
        },
        /*{
            key: '1',
            month: '五月',
            saleCount: 178267.88
        },*/
        /*{
            key: '1',
            month: '六月',
            saleCount: 178267.88
        },
        {
            key: '1',
            month: '七月',
            saleCount: 178267.88
        }*/
    ]


    export default {
        name: "yearSaleCountTabel",
        data() {
            return {
                columns,
                data
            }
        }
    }
</script>

<style scoped>

</style>