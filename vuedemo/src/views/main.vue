<template>
    <div style="background-color:#f8f8f9">
        <el-row :gutter="0" style="margin-bottom: 1px;">
            <!-- <el-col :span="4">
                <el-card shadow="always" :body-style="{background:'#212121'}">
                <span style="color:#FFFFFF">公司名称</span>
                </el-card>

            </el-col> -->
            <el-col :span="24" style="text-align: right;">
                <!--#212121 :body-style="{background:'rgba(125,28,238,0.88)'}"-->
                <el-card class="headbg" :body-style="{height:'20px'}">

                    <el-dropdown @command="signOut">
                        <i class="el-icon-setting"
                           style="margin-right: 15px;color:#FFFFFF;font-size: 25px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="search">我的信息</el-dropdown-item>
                            <el-dropdown-item command="add">修改密码</el-dropdown-item>
                            <el-dropdown-item command="about">关于</el-dropdown-item>
                            <el-dropdown-item command="out">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <el-avatar :size="25"> 王 </el-avatar> -->

                    <span style="color:#FFFFFF;font-size: 18px">songhs</span>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="10">

            <el-col :span="5">
                <sideMenu></sideMenu>
            </el-col>
            <el-col :span="19">
                <el-row :gutter="10" style="margin-bottom: 10px;">
                    <el-col>
                        <breadcrumb></breadcrumb>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="margin-bottom: 10px;">
                    <el-col>
                        <div style="margin:8px">
                            <router-view></router-view>

                        </div>

                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24" style="text-align: center;">
                <el-card>Copyright © 2020 shs</el-card>

            </el-col>
        </el-row>
        <el-dialog
                title="关于"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <span>Copyright © 2000 - 2020 拜特公司 版权所有</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>


</template>
<script>
    import breadcrumb from "./nav/breadcrumb";
    import sideMenu from "./nav/sideMenu";

    export default {
        name: 'maincomponets',
        components: {
            breadcrumb,
            sideMenu
        },
        methods: {
            signOut(command) {
                console.log(command)
                if (command == "out") {
                    this.$router.push('/');
                }
                if(command=="about"){
                    this.centerDialogVisible = true
                }
            }
        },
        data(){
            return{
                centerDialogVisible: false
            }
        }
    }
</script>

<style>
    /*.el-scrollbar__wrap {
    overflow-x: hidden;
    }*/

</style>


