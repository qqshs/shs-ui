<template>
    <div>
        <el-row :gutter="5" style="margin-bottom: 10px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header">
                        <i class="el-icon-search"></i>
                        <span>对账单汇总查询</span>
                    </div>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-row :gutter="5">
                            <el-col :span="12">
                                <el-form-item label="交易日期">
                                    <el-col :span="11">
                                        <el-date-picker
                                                type="date"
                                                placeholder="交易开始日期"
                                                v-model="form.transStartDate"
                                                style="width: 100%;">
                                        </el-date-picker>
                                    </el-col>
                                    <el-col class="line" :span="1">-</el-col>
                                    <el-col :span="12">
                                        <el-date-picker type="date"
                                                        placeholder="交易结束日期"
                                                        v-model="form.transEndDate"
                                                        style="width: 100%;">
                                        </el-date-picker>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="汇总项">
                                    <el-select
                                            v-model="form.billGroup"
                                            style="margin-right: 15px;"
                                            clearable placeholder="-全部-">
                                        <el-option
                                                v-for="item in form.billGroupOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>

                                    <el-button type="primary" @click="query" icon="el-icon-search">
                                        查询
                                    </el-button>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-button  @click="corpImport" icon="el-icon-upload">
                                    导入匹配分公司
                                </el-button>
                            </el-col>
                        </el-row>
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
                        <el-button-group style="float: left; padding: 0 0;">
                            <el-button size="mini" @click="billingCountForProv" icon="el-icon-download">
                                各省汇总对账单
                            </el-button>
                            <el-button size="mini" @click="billingTax" icon="el-icon-download">
                                财务报税账单
                            </el-button>
                            <el-button size="mini" @click="taxUserInfo" icon="el-icon-download">
                                财务报税人员信息
                            </el-button>
                        </el-button-group>
                        <el-button-group style="float: right; padding: 0 0;">
                            <el-tooltip class="item"
                                        effect="dark"
                                        content="导出"
                                        placement="bottom">
                                <el-button size="mini" @click="billingCountExport" icon="el-icon-download"/>
                            </el-tooltip>

                        </el-button-group>
                        <el-table
                                :data="tableData"
                                height="400"
                                border
                                stripe
                                fit
                                >
                            <el-table-column
                                    prop="channelCode"
                                    label="渠道"
                                    fixed
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="orgName"
                                    label="机构"

                            >
                            </el-table-column>
                            <el-table-column
                                    prop="corpCode"
                                    label="机构单位编码">
                            </el-table-column>
                            <el-table-column
                                    prop="corpCode"
                                    label="机构单位编码">
                            </el-table-column>
                            <el-table-column
                                    prop="provName"
                                    label="省份">
                            </el-table-column>
                            <el-table-column
                                    prop="idNumber"
                                    label="身份证号">
                            </el-table-column>

                            <el-table-column
                                    prop="customerName"
                                    label="姓名"
                                    fixed
                            >
                            </el-table-column>

                            <el-table-column
                                    prop="fee"
                                    label="税前金额">
                            </el-table-column>
                            <el-table-column
                                    prop="feeTax"
                                    label="税金">
                            </el-table-column>
                            <el-table-column
                                    prop="feeIn"
                                    label="税后金额">
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
        name: "billingCount",
        data(){
            return{
                form:{
                    transStartDate:'',
                    transEndDate:'',
                    billGroupOptions: [
                        {
                            value: 'channel',
                            label: '支付渠道'
                        },
                        {
                            value: 'org',
                            label: '渠道机构'
                        },
                        {
                            value: 'prov',
                            label: '省分公司'
                        },
                        {
                            value: 'person',
                            label: '提现用户'
                        }
                    ]
                },
                tableData: [
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'微信支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'微信支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'微信支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'微信支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'微信支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'微信支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'银行卡支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'银行卡支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'银行卡支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'银行卡支付',
                        provName:'浙江省'
                    },
                    {
                        payId: '988887111212',
                        helpHeId: '7888921211122',
                        orgCode: '189991822',
                        corpCode: '1001',
                        corpName: '深圳公司',
                        customerName: '杰克马',
                        idNumber: '430202196001010017',
                        phoneNumber: '13800138000',
                        fee: '1,000.00',
                        feeIn: '980.00',
                        feeTax: '20',
                        status: '复核通过',
                        excStates: '交易成功',
                        desc: '提现',
                        createTime: '2020-07-08 10:10:10',
                        transTime: '2020-07-08 15:29:38',
                        channelCode:'银行卡支付',
                        provName:'浙江省'
                    }
                ]
            }
        },
        methods:{
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
            billingCountForProv(){//各省对账单汇总
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
            billingTax(){//账务报税账单
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
            taxUserInfo(){//财务报税人员信息
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
            billingCountExport(){//酬金汇总对账单导出
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
            corpImport(){//导入匹配分公司
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