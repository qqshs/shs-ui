<template>
    <div>
        <el-row :gutter="5" style="margin-bottom: 10px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header">
                        <i class="el-icon-search"></i>
                        <span>微信支付查询</span>
                    </div>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-row :gutter="5">
                            <el-col :span="10">
                                <el-form-item label="导入日期">
                                    <el-col :span="11">
                                        <el-date-picker type="date"
                                                        placeholder="导入开始日期"
                                                        v-model="form.startDate"
                                                        style="width: 100%;">
                                        </el-date-picker>
                                    </el-col>
                                    <el-col class="line" :span="1">-</el-col>
                                    <el-col :span="11">
                                        <el-date-picker type="date"
                                                        placeholder="导入结束日期"
                                                        v-model="form.endDate"
                                                        style="width: 100%;">
                                        </el-date-picker>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="用户姓名">

                                    <el-input v-model="form.name"
                                              placeholder="输入用户姓名">
                                    </el-input>
                                </el-form-item>

                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="身份证号">
                                    <el-input v-model="form.pinNo"
                                              placeholder="输入身份证号">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">


                            <el-col :span="7">
                                <el-form-item label="提现机构">
                                    <el-select v-model="form.orgCode" clearable placeholder="-全部机构-">
                                        <el-option
                                                v-for="item in form.orgCodeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="单据状态">

                                    <el-select v-model="form.checkState" clearable placeholder="-全部状态-">
                                        <el-option
                                                v-for="item in form.checkStateOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>

                                </el-form-item>

                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="指令状态">

                                    <el-select v-model="form.excState" clearable placeholder="-全部状态-">
                                        <el-option
                                                v-for="item in form.excStateOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
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

                        <el-table
                                :data="tableData"
                                height="400"
                                border
                                stripe
                                fit
                                style="width: 100%">

                            <el-table-column
                                    prop="customerName"
                                    label="姓名"
                                    fixed
                            >
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
                                    label="客户方机构号"
                            >
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
                                    prop="idNumber"
                                    label="身份证号">
                            </el-table-column>
                            <el-table-column
                                    prop="phoneNumber"
                                    label="手机号">
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

                            <el-table-column
                                    prop="status"
                                    label="单据状态">
                            </el-table-column>

                            <el-table-column
                                    prop="excStates"
                                    label="交易状态">
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="导入日期"
                                fiexd
                            >
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
        name: "wechatPaySearch",
        data(){
            return{
                form:{
                    startDate: '',
                    endDate: '',
                    name: '',
                    pinNo: '',
                    orgCode: '',
                    checkState: '',
                    excState: '',
                    orgCodeOptions: [
                        {
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
                    checkStateOptions: [
                        {
                            value: '0',
                            label: '未计税(初始状态)'
                        }, {
                            value: '1',
                            label: '计税中'
                        }, {
                            value: '2',
                            label: '已计税'
                        }, {
                            value: '10',
                            label: '已提交复核'
                        }, {
                            value: '11',
                            label: '复核通过'
                        },
                        {
                            value: '-1',
                            label: '复核打回'
                        },
                        {
                            value: '-2',
                            label: '删除'
                        }],
                    excStateOptions: [
                        {
                            value: '11',
                            label: '未发送'
                        },
                        {
                            value: '90',
                            label: '已发送'
                        },
                        {
                            value: '95',
                            label: '交易成功'
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
                        transTime: '2020-07-08 15:29:38'
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
                        transTime: '2020-07-08 15:29:38'
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
                        transTime: '2020-07-08 15:29:38'
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
                        transTime: '2020-07-08 15:29:38'
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
                        transTime: '2020-07-08 15:29:38'
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
                        transTime: '2020-07-08 15:29:38'
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
                        transTime: '2020-07-08 15:29:38'
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
                        transTime: '2020-07-08 15:29:38'
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
                        transTime: '2020-07-08 15:29:38'
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
                        transTime: '2020-07-08 15:29:38'
                    }
                ],
                currentPage : 1
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

            }
        }
    }
</script>

<style scoped>

</style>