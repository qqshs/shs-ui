<template>
    <el-card   :body-style="{height:'700px'}">
        <el-scrollbar style="height:100%">
            <el-menu


                    :default-active="$route.path"
                    :router=true
                    :unique-opened=true>
                <el-submenu index="/">
                    <template slot="title">
                        <i class="el-icon-odometer"></i>
                        <span>主页</span>
                    </template>
                    <el-menu-item index="/dashboard">控制台</el-menu-item>
                </el-submenu>
                <el-submenu index="page">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>页面</span>
                    </template>
                    <el-menu-item index="/page/listpage">功能主页面</el-menu-item>
                    <el-menu-item index="/page/temp">背景例子</el-menu-item>
                </el-submenu>
                <el-submenu index="wechatpay">
                    <template slot="title">
                        <i class="el-icon-s-finance"></i>
                        <span>酬金-微信支付</span>
                    </template>
                    <el-menu-item index="/wechatpay/reviewwechatpay">酬金复核-微信支付</el-menu-item>
                    <el-menu-item index="/wechatpay/wechatpaylist">微信支付酬金单据查询</el-menu-item>
                    <el-menu-item index="/wechatpay/wechatsearch">微信支付查询</el-menu-item>
                </el-submenu>
                <el-submenu index="billsearch">
                    <template slot="title">
                        <i class="el-icon-notebook-2"></i>
                        <span slot="title">酬金-账单查询</span>
                    </template>
                    <el-menu-item index="/billsearch/billingdetails">酬金明细账单查询</el-menu-item>
                    <el-menu-item index="/billsearch/billingCount">酬金汇总账单查询</el-menu-item>
                </el-submenu>

                <el-submenu index="bankpay">
                    <template slot="title">
                        <i class="el-icon-bank-card"></i>
                        <span slot="title">酬金-银行卡支付</span>
                    </template>
                    <el-menu-item index="/bankpay/bankpayimport">酬金银行卡支付导入</el-menu-item>
                    <el-menu-item index="/bankpay/bankpaycheck">酬金审核</el-menu-item>
                    <el-menu-item index="/bankpay/bankpaysearch">酬金单据查询</el-menu-item>
                    <el-menu-item index="/bankpay/bankpaysearchForCard">银行卡支付查询</el-menu-item>

                </el-submenu>
            </el-menu>
        </el-scrollbar>
    </el-card>
</template>

<script>
    export default {
        name: "sideMenu"
    }
</script>

<style scoped>

</style>