<template>
    <div>
        <el-row :gutter="5" style="margin-bottom: 10px;">
            <el-col :span="24">
                <el-card>
                    <div slot="header">
                        <i class="el-icon-upload"></i>
                        <span>收款方信息导入</span>
                    </div>
                    <el-form  ref="form" :model="form" label-width="100px">
                        <el-row :gutter="5">
                            <el-col :span="11">
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
                                <el-form-item  label="单据核验状态">
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
                            <el-button size="mini" @click="importExcle" icon="el-icon-upload">
                                导入excel(xlsx)
                            </el-button>
                            <el-button size="mini" @click="downloadTemplate" icon="el-icon-download">
                                下载模板
                            </el-button>
                            <el-button size="mini" @click="importData" icon="el-icon-download">
                                导出数据
                            </el-button>
                            <el-button size="mini" @click="deleteData" icon="el-icon-delete-solid">
                                删除
                            </el-button>
                        </el-button-group>
                        <el-button-group style="float: right; padding: 0 0;">
                            <el-tooltip class="item"
                                        effect="dark"
                                        content="导出"
                                        placement="bottom">
                                <el-button size="mini" @click="bankPayExport" icon="el-icon-download"/>
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
                                    label="姓名"

                            >
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
                                    prop="bankAcc"
                                    label="收款账户">
                            </el-table-column>
                            <el-table-column
                                    prop="bankName"
                                    label="银行开户行名称">
                            </el-table-column>
                            <el-table-column
                                    prop="bankCode"
                                    label="开户行号">
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
                                    label="是否已签协议">
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
                        1.系统会记录每次的导入文件名称和文件大小。
                        每次导入的文件名称都不能一样。
                        导入的文件必须是xlsx格式的excel表格文件。
                        <br>
                        2.系统会校验当前登录用户当天导入的相同的
                        【身份证号、姓名、收款账户、金额】
                        的疑似重复付款的单据。如系统校验有疑似重复的单据，请再次核查！
                        <br>
                        3.本页面可以查询当前登录用户导入的的付款数据。
                        包含了导入后的个税计算、复核等状态，且可查询该付款数据的实时交易状态。
                    </span>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "bankPayImport",
    data(){
        return{
            form:{
                startDate:'',
                endDate:''
            },
            currentPage:1
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
        bankPayExport(){//酬金汇总对账单导出
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
        importExcle(){//导入excel
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
        downloadTemplate(){//下载模板
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
        importData(){//导出数据
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
        deleteData(){//删除数据
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