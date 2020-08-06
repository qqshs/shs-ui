<template>
    <div>

        <el-row :gutter="5" style="margin-bottom: 10px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header">
                        <i class="el-icon-document"></i>
                        <span>微信酬金支付审核</span>
                    </div>
                    <el-form  ref="form" :model="form" label-width="80px">

                        <el-col :span="12">
                            <el-form-item label="查询日期">
                                <el-col :span="11">
                                    <el-date-picker type="date"
                                                    placeholder="查询开始日期"
                                                    v-model="form.startDate"
                                                    style="width: 100%;">
                                    </el-date-picker>
                                </el-col>
                                <el-col class="line" :span="1">-</el-col>
                                <el-col :span="11">
                                    <el-date-picker type="date"
                                                    placeholder="查询结束日期"
                                                    v-model="form.endDate"
                                                    style="width: 100%;">
                                    </el-date-picker>
                                </el-col>

                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提现机构">
                                <el-col :span="12">
                                    <el-select v-model="value" clearable placeholder="-全部机构-">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>


                                <el-col :span="12">
                                    <el-button type="primary"
                                               icon="el-icon-search"
                                               @click="query"
                                    >
                                        查询
                                    </el-button>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-form>

                </el-card>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-card>
                    <el-scrollbar style="height:100%">
                    <div slot="header">
                        <i class="el-icon-document"></i>
                        <span>微信酬金待审核单据</span>
                    </div>
                    <el-button-group>
                        <el-tooltip
                                class="item"
                                effect="dark"
                                content="审核"
                                placement="top">
                            <el-button size="mini" @click="approve"  icon="el-icon-s-claim"></el-button>
                        </el-tooltip>

                    </el-button-group>
                    <el-table
                            :data="tableData"
                            height="400"
                            border
                            stripe
                            fit
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="40">
                        </el-table-column>
                        <el-table-column
                                prop="payId"
                                label="拜特付款单号"
                                :show-overflow-tooltip=true
                                >
                        </el-table-column>
                        <el-table-column
                                prop="helpHeId"
                                label="客户方单号"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="orgCode"
                                label="客户方机构号">
                        </el-table-column>
                        <el-table-column
                                prop="corpCode"
                                label="佣金归属单位编码">
                        </el-table-column>
                        <el-table-column
                                prop="corpName"
                                label="佣金归属单位名称">
                        </el-table-column>
                        <el-table-column
                                prop="customerName"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="idNumber"
                                label="身份证号">
                        </el-table-column>
                        <el-table-column
                                prop="phoneNumber"
                                label="手机号">
                        </el-table-column>
                        <el-table-column
                                prop="fee"
                                label="提现佣金">
                        </el-table-column>
                        <el-table-column
                                prop="feeIn"
                                label="税后佣金">
                        </el-table-column>
                        <el-table-column
                                prop="feeTax"
                                label="纳税金额">
                        </el-table-column>
                        <el-table-column
                                prop="desc"
                                label="备注信息">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="创建时间">
                        </el-table-column>

                    </el-table>
                    <el-pagination


                            :current-page="currentPage"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                    </el-pagination>
                    </el-scrollbar>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "reviewWechatPay",
        data(){
            return{
                form: {
                    startDate:'',
                    endDate:''
                },
                options: [{
                    value: '选项1',
                    label: '和助力3.0'
                }, {
                    value: '选项2',
                    label: '和助力2.0'
                }, {
                    value: '选项3',
                    label: '广东移动终端公司'
                }, {
                    value: '选项4',
                    label: '拜特促销'
                }, {
                    value: '选项5',
                    label: '北京公司'
                }],
                value: '',
                currentPage : 1,
                tableData: [
                    {
                    payId: '988887111212',
                    helpHeId: '7888921211122',
                    orgCode: '189991822',
                    corpCode:'1001',
                    corpName:'深圳公司',
                    customerName:'杰克马',
                    idNumber:'430202196001010017',
                    phoneNumber:'13800138000',
                    fee:'1,000.00',
                    feeIn:'980.00',
                    feeTax:'20',
                    desc:'提现',
                    createTime:'2020-07-08'
                },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode:'1001',
                        corpName:'深圳公司',
                        customerName:'杰克马',
                        idNumber:'430202196001010017',
                        phoneNumber:'13800138000',
                        fee:'1,000.00',
                        feeIn:'980.00',
                        feeTax:'20',
                        desc:'提现',
                        createTime:'2020-07-08'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode:'1001',
                        corpName:'深圳公司',
                        customerName:'杰克马',
                        idNumber:'430202196001010017',
                        phoneNumber:'13800138000',
                        fee:'1,000.00',
                        feeIn:'980.00',
                        feeTax:'20',
                        desc:'提现',
                        createTime:'2020-07-08'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode:'1001',
                        corpName:'深圳公司',
                        customerName:'杰克马',
                        idNumber:'430202196001010017',
                        phoneNumber:'13800138000',
                        fee:'1,000.00',
                        feeIn:'980.00',
                        feeTax:'20',
                        desc:'提现',
                        createTime:'2020-07-08'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode:'1001',
                        corpName:'深圳公司',
                        customerName:'杰克马',
                        idNumber:'430202196001010017',
                        phoneNumber:'13800138000',
                        fee:'1,000.00',
                        feeIn:'980.00',
                        feeTax:'20',
                        desc:'提现',
                        createTime:'2020-07-08'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode:'1001',
                        corpName:'深圳公司',
                        customerName:'杰克马',
                        idNumber:'430202196001010017',
                        phoneNumber:'13800138000',
                        fee:'1,000.00',
                        feeIn:'980.00',
                        feeTax:'20',
                        desc:'提现',
                        createTime:'2020-07-08'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode:'1001',
                        corpName:'深圳公司',
                        customerName:'杰克马',
                        idNumber:'430202196001010017',
                        phoneNumber:'13800138000',
                        fee:'1,000.00',
                        feeIn:'980.00',
                        feeTax:'20',
                        desc:'提现',
                        createTime:'2020-07-08'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode:'1001',
                        corpName:'深圳公司',
                        customerName:'杰克马',
                        idNumber:'430202196001010017',
                        phoneNumber:'13800138000',
                        fee:'1,000.00',
                        feeIn:'980.00',
                        feeTax:'20',
                        desc:'提现',
                        createTime:'2020-07-08'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode:'1001',
                        corpName:'深圳公司',
                        customerName:'杰克马',
                        idNumber:'430202196001010017',
                        phoneNumber:'13800138000',
                        fee:'1,000.00',
                        feeIn:'980.00',
                        feeTax:'20',
                        desc:'提现',
                        createTime:'2020-07-08'
                    }
                ]
            }

        },
        methods: {
            query() {

                this.$http.post('/你的查询URL，base段已经在Main.js中，只需添加目录段', {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                })
                    .then(function (response) {
                        console.log(response);

                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            approve(){
                this.$http.post('/你的查询URL，base段已经在Main.js中，只需添加目录段', {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                })
                    .then(function (response) {
                        console.log(response);

                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        }
    }
</script>

<style scoped>

</style>