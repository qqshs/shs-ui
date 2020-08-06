<template>
    <div>
        <el-row :gutter="5" style="margin-bottom: 10px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header">
                        <i class="el-icon-upload"></i>
                        <span>银行卡支付查询</span>
                    </div>
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-row :gutter="5">
                            <el-col :span="12">
                                <el-form-item label="导入日期">
                                    <el-col :span="11">
                                        <el-date-picker type="date"
                                                        placeholder="开始日期"
                                                        v-model="form.startDate"
                                                        style="width: 100%;">
                                        </el-date-picker>
                                    </el-col>
                                    <el-col class="line" :span="1">-</el-col>
                                    <el-col :span="11">
                                        <el-date-picker type="date"
                                                        placeholder="结束日期"
                                                        v-model="form.endDate"
                                                        style="width: 100%;">
                                        </el-date-picker>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="用户姓名">

                                    <el-input v-model="form.payeeAccName"
                                              placeholder="输入用户姓名">
                                    </el-input>
                                </el-form-item>

                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="收款账号">
                                    <el-input v-model="form.payeeAcc"
                                              placeholder="请收入银行卡号">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">

                            <el-col :span="6">
                                <el-form-item label="协议状态">
                                    <el-select v-model="form.agreementState" clearable placeholder="-全部机构-">
                                        <el-option
                                                v-for="item in form.agreementStateOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
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
                            <el-col :span="6">
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
                            <el-col :span="6">
                                <el-form-item label="省份">

                                    <el-select v-model="form.provId" clearable placeholder="-全部状态-">
                                        <el-option
                                                v-for="item in form.provIdOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>

                                </el-form-item>

                            </el-col>
                        </el-row>

                        <el-row :gutter="5">
                            <el-col :span="8">
                                <el-form-item label="单据核验状态">

                                    <el-select v-model="form.repeatCheckState" clearable placeholder="-全部状态-">
                                        <el-option
                                                v-for="item in form.repeatCheckStateOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="单据来源">

                                    <el-select v-model="form.channelType" clearable placeholder="-全部状态-">
                                        <el-option
                                                v-for="item in form.channelTypeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>

                                </el-form-item>

                            </el-col>
                            <el-col :span="8">
                                <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
                            </el-col>
                        </el-row>

                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px;">
            <el-col :span="24">
                <el-card>
                    <el-table
                            :data="tableData"
                            height="400"
                            border
                            stripe
                            fit
                    >
                        <el-table-column
                                type="selection"
                                width="40">
                        </el-table-column>
                        <el-table-column
                                prop="checkMsg"
                                label="核验信息"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="importUser"
                                label="导入机构/人">
                        </el-table-column>
                        <el-table-column
                                prop="helpHeId"
                                label="客户单号"

                        >
                        </el-table-column>
                        <el-table-column
                                prop="customerName"
                                label="姓名"

                        >
                        </el-table-column>
                        <el-table-column
                                prop="idNumber"
                                label="身份证号">
                        </el-table-column>
                        <el-table-column
                                prop="bankAcc"
                                label="收款账户">
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
                                prop="isAgreement"
                                label="已签协议">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="复核状态">
                        </el-table-column>
                        <el-table-column
                                prop="transTime"
                                label="交易时间">
                        </el-table-column>
                        <el-table-column
                                prop="excState"
                                label="付款状态">
                        </el-table-column>
                        <el-table-column
                                prop="excMsg"
                                label="银行返回信息">
                        </el-table-column>
                        <el-table-column
                                prop="phoneNo"
                                label="手机号">
                        </el-table-column>
                        <el-table-column
                                prop="use"
                                label="用途">
                        </el-table-column>
                        <el-table-column
                                prop="remark"
                                label="备注">
                        </el-table-column>
                        <el-table-column
                                prop="importTime"
                                label="导入日期">
                        </el-table-column>


                    </el-table>


                    <el-pagination
                            :current-page="currentPage"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                    </el-pagination>

                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-card>
                    <div slot="header">
                        <i class="el-icon-message-solid"></i>
                        <span>温馨提示</span>
                    </div>
                    <span style="font-size: 13px">
                        1.导出劳务所得和人员信息前提是查询条件中【协议状态】 必须选择【已签协议】。
                        <br>
                        2.导出劳务所得和人员信息原则上只允许导出一次(防止重复计税)。
                        <br>
                        3.导出账单选择日期要选择交易日期。不能选择导入日期
                    </span>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "bankPaySearchForCard",
        data(){
            return{
                form:{}
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