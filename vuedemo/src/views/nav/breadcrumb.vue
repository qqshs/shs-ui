<template>
    <div>
        <el-card >
            <el-breadcrumb >
                <el-breadcrumb-item v-for="item in levelList"
                                    :key="item.path" :to="item.path">{{item.meta.title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "breadcrumb",
        data() {
            return {
                levelList: []
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created(){
            this.getBreadcrumb()
        },
        methods:{
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name)
                const first = matched[0];
                if (first && first.name.trim().toLocaleLowerCase() !== 'Main'.toLocaleLowerCase()) {
                    matched = [{ path: '/dashboard', meta: { title: '主页' }}].concat(matched)
                }
                this.levelList = matched
            }
        }

    }
</script>

<style scoped>

</style>