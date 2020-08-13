<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider style="background: #fff" v-model="collapsed" :trigger="null" collapsible>
            <div class="logo" >
            </div>
            <a-menu  mode="inline"

                     @click="selectMenu"

            >
                <template v-for="menuItem in menuData">
                    <a-sub-menu :key="menuItem.id">
                        <span slot="title"><a-icon :type="menuItem.icon" /><span>{{menuItem.name}}</span></span>
                        <template v-for="childItem in menuItem.children">
                            <a-menu-item :key="childItem.path">
                                <span>{{childItem.name}}</span>
                            </a-menu-item>
                        </template>
                    </a-sub-menu>
                </template >
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="{position: 'fixed', zIndex: 1, width: '100%' }"   class="headbg" >
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => (collapsed = !collapsed)"

                />

                <div style="position: fixed;z-index: 0;right: 5%;top:0">
                    <a-badge dot style="margin: 10px 15px 10px;" >
                        <a-icon
                                style="color:#FFFFFF;font-size: 18px;"
                                type="bell"

                        />
                    </a-badge>
                    <a-dropdown>
                        <a-avatar
                                style="color: #9c9898; backgroundColor: #FFF;margin: 10px 0px 20px"
                                size="small" icon="user"
                        >
                        </a-avatar>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a href="javascript:;" @click="test">个人信息</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">修改密码</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;" @click="about">关于</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;" @click="logOut">退出系统</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>


                </div>
                <a-modal v-model="visible" title="关于" on-ok="handleOk">
                    <template slot="footer">

                        <a-button key="submit" type="primary" @click="handleOk">
                            确定
                        </a-button>
                    </template>
                    版权所有 ©2020 Created by songhs
                </a-modal>

            </a-layout-header>
          <!--<div class="headbg jm"></div>-->
            <a-layout-content
                :style="{ padding: '24px', marginTop: '80px', minHeight: '600px'}"

            >
              <!--:style="{ margin: '24px 16px', padding: '24px', minHeight: '600px' }"-->

                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                 ©2020 Created by songhs
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
    import menu from '../assets/js/menuData';//模拟菜单数据，正式环境通过用户名从后台加载
    export default {
        data() {
            return {
                collapsed: false,
                visible: false,
                menuData : []

            };
        },
        mounted() {
            this.loadMenu()
        },
        methods:{
            test(){

                this.$http.post('/democlient/fromclienttoserver', {
                    name: 'Fred',
                    value: 'Flintstone'
                })
                    .then(function (response) {
                        console.log(response.data.serverName);

                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            about() {//关于
                console.log(menu);
                this.visible = true;
            },
            handleOk(e) {
                console.log(e);
                this.visible = false;
            },
            logOut(){//退出系统
                this.$router.push('/');
            },
            selectMenu({key}){
                this.$router.push({
                    path: key
                })

            },
            loadMenu(){//加载用户有权限的菜单
                this.$http.post('/users', {
                    userName: '登陆用户名'
                })
                    .then(function (response) {
                        console.log("loading menu"+response.status)
                        this.menuData = menu
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });



            }

        }
    };
</script>
<style>
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
        color:#FFFFFF;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
    .jm{
      top: 64px;
      /*left: 200px;*/
      padding: 0px;
      width: 100%;
      height: 100px;
      position: fixed;

      /*background: linear-gradient(to right, rgba(22, 182, 255, 0.97),
      rgba(181,31,255,0.88));*/
      /*background-color: #673AB7;*/
    }
</style>
