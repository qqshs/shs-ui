<template>
    <div>
        <el-row :gutter="5" style="margin-bottom: 10px;">
            <el-col  :span="24">
                <el-card>
                    <div slot="header">
                        <i class="el-icon-document"></i>
                        <span>用户查询</span>
                    </div>
                    <el-form  ref="form" :model="form" label-width="80px">
                        <el-col :span="6">
                            <el-form-item label="用户名称">
                                <el-input v-model="form.userName" placeholder="输入用户名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="用户ID">
                                <el-input v-model="form.userID" placeholder="输入用户ID"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="创建日期">
                                <el-col :span="8">
                                    <el-date-picker type="date"
                                                    placeholder="查询开始日期"
                                                    v-model="form.startDate"
                                                    style="width: 100%;">
                                    </el-date-picker>
                                </el-col>
                                <el-col class="line" :span="1">-</el-col>
                                <el-col :span="8">
                                    <el-date-picker type="date"
                                                    placeholder="查询结束日期"
                                                    v-model="form.endDate"
                                                    style="width: 100%;">
                                    </el-date-picker>
                                </el-col>
                                <el-col :span="7">
                                    <el-button type="primary"  icon="el-icon-search">搜索</el-button>
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
                    <div slot="header">
                        <i class="el-icon-document"></i>
                        <span>用户列表</span>
                    </div>
                    <el-button-group>

                        <el-button size="mini"  icon="el-icon-circle-plus-outline"></el-button>
                        <el-button  size="mini" icon="el-icon-delete"></el-button>
                        <el-button size="mini" icon="el-icon-download"></el-button>
                        <el-button size="mini" icon="el-icon-printer"></el-button>
                    </el-button-group>
                    <el-table
                            :data="tableData"
                            height="400"
                            border
                            stripe
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                width="40">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                            <template slot-scope="scope">

                                <i style="font-size:20px;color:#909399;cursor:pointer"
                                   @click="handleClick(scope.row)"
                                   class="el-icon-search">
                                </i>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <i style="font-size:20px;color:#409EFF;cursor:pointer"
                                   @click="handleClick(scope.row)"
                                   class="el-icon-edit-outline">
                                </i>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <i style="font-size:20px;color:#F56C6C;cursor:pointer"
                                   class="el-icon-delete">
                                </i>

                            </template>
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

    </div>
</template>

<script>
    export default {
        name: "listPage",
        data() {
            return {
                form: {
                    startDate:'',
                    endDate:''
                },
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                currentPage : 1

            }
        },
        methods: {
            handleClick(row) {
                console.log(row);
            }
        }
    }
</script>

<style scoped>

</style>