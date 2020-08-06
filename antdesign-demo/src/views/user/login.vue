<template>
    <div class="login">
        <vue-particles
                style="height: 100%"
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
        <a-card
                title="用户登陆"
                :bordered="true"
                style="width: 500px"
                class="content"

        >
            <a-form-model
                    :model="form"
                    :rules="rules"
                    ref="ruleForm"
                    :hideRequiredMark="true"
                    :label-col="{span:6}"
                    :wrapper-col="{span:14}">
                <a-form-model-item
                        label="用户名称"
                        :colon="false"
                        prop="name">
                    <a-input v-model="form.name"/>
                </a-form-model-item>
                <a-form-model-item
                        label="登录密码"
                        :colon="false"
                        prop="password">
                    <a-input-password v-model="form.password"/>

                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
                    <a-button type="primary" @click="login">
                        登录
                    </a-button>
                    <a-button style="margin-left: 10px;" @click="cancelLogin">
                        取消
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-card>

    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                form: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入用户名！',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码！',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            login() {
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        this.$http.post('/users', {
                            loginName: this.form.name,
                            password: this.form.password
                        })
                            .then(function (response) {
                                console.log(response);
                                this.$router.push('/main');// eslint-disable-line no-unused-vars
                            }.bind(this))
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


            },
            cancelLogin() {
                this.form = {
                    name: '',
                    password: ''
                }
            }

        }
    }
</script>

<style lang="scss" scoped>

    .login {
        background-size: cover;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-bottom: 0;
        .el-dialog__body {
            padding-bottom: 0
        }
        .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%);

            padding: 16px;
            width: 30%;
            min-width: 300px;
            max-width: 400px;

        }
    }

    #particles {
        position: absolute;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
    }
</style>
