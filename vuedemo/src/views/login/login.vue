<template>
    <div id="particles" class="login">
        <vue-particles
                color="#dedede"
                :particleOpacity="0.7"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="4"
                linesColor="#409EFF"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
        >
        </vue-particles>
        <el-card class="content">
            <div slot="header">
                <span>用户登录</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名称">
                    <el-input prefix-icon="el-icon-user"  v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="登录密码">
                    <el-input prefix-icon="el-icon-lock" show-password v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <el-button @click="cancelLogin">取消</el-button>
                </el-form-item>
            </el-form>
            <div>
                <span style="font-size:13px;font-family:Hiragino Sans GB ;float: right; padding: 3px 0">版权所有 © 2020 shs</span>
            </div>
        </el-card>

    </div>
    
</template>

<script>

    export default {
        name: "login",
        data(){
            return{
                form: {
                    name :'',
                    password :''

                }
            }
        },
        methods: {
            onSubmit() {
                console.log(this.form);
                this.$http.post('/users', {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                })
                    .then(function (response) {
                        console.log(response);
                        this.$router.push('/main');// eslint-disable-line no-unused-vars
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            cancelLogin(){
                this.form = {
                    name :'',
                    password :''
                }
            }

        }
    }
</script>

<style lang="scss" scoped>
    .father {
        display: flex;
        justify-content: center;
        align-items: center;
        height:80vh;
    }

   /* #particles{
        position: absolute;
        width: 100%;
        height: 100%;

        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
    }*/
    .login {
        /*background: #373a42 no-repeat center;*/
        background-size: cover;
        .el-dialog__body {
            padding-bottom: 0
        }
        .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%);
            /*background: #fff;*/
            /*background-clip: padding-box;*/
            /*box-shadow: 0 6px 12px rgba(0, 0, 0, .4);*/
            /*border: 5px solid rgba(0, 100, 200, .3);*/
            padding: 16px;
            width: 30%;
            min-width: 300px;
            max-width: 400px;
            /*border-radius: 10px;*/
            .logo {
                background: url('../../assets/logo.png') no-repeat center 0;
                height: 64px;
                margin-bottom: 15px;
            }
            /*.el-button {*/
            /*    margin-left: 20px;*/
            /*    float: right*/
            /*}*/
        }
    }

</style>