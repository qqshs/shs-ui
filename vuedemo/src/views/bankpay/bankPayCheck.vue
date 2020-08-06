<template>
    <div>
        <el-row :gutter="5" style="margin-bottom: 10px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header">
                        <i class="el-icon-upload"></i>
                        <span>酬金支付审核</span>
                    </div>
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-row :gutter="5">
                            <el-col :span="11">
                                <el-form-item label="查询日期">
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
                            <el-col :span="7">
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
                            <el-col :span="6">
                                <el-form-item label="付款账号">

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
                        </el-row>
                        <el-row>
                            <el-col :span="24">
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
                    <div slot="header">
                        <i class="el-icon-document"></i>
                        <span>微信酬金待审核单据</span>
                    </div>
                    <el-button-group style="float: left; padding: 0 0;">
                        <el-tooltip
                                class="item"
                                effect="dark"
                                content="审核"
                                placement="top">
                            <el-button size="mini" @click="approve" icon="el-icon-s-claim"/>
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
                                type="selection"
                                width="40">
                        </el-table-column>
                        <el-table-column
                                prop="checkMsg"
                                label="单据重复校验"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="customerName"
                                label="收款姓名"

                        >
                        </el-table-column>

                        <el-table-column
                                prop="bankAcc"
                                label="收款账户">
                        </el-table-column>
                        <el-table-column
                                prop="idNumber"
                                label="身份证号">
                        </el-table-column>
                        <el-table-column
                                prop="phoneNo"
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
                                prop="isAgreement"
                                label="已签协议">
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
                                prop="importUser"
                                label="导入人">
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
                        1.此页面复核各省的已计税的付款数据。
                        <br>
                        2.【校验信息】列，若发现有系统检测异常【疑似重复付款数据】，请再次核验。
                        <br>
                        3.复核通过前，选择好要付款的账号。
                        <br>
                        4.确认付款数据无误后，点击复核通过。
                        <br>
                        5.查询付款结果，请到付款查询页面去查询。
                    </span>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "bankPayCheck",
        data() {
            return {
                form: {}
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