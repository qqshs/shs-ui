<template>
    <div style="background-color:#f8f8f9">
        <van-nav-bar
                title="深圳市拜特科技股份有限公司"
                :fixed="true"
                :placeholder="true"
        />
        <van-row>
            <van-col span="24">
                <van-image fit="contain" src="https://img.zcool.cn/community/0169375aaf2370a80120be14a6e017.png@1280w_1l_2o_100sh.png" />
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <van-cell-group :border="false"><van-cell size="large" value="安全复工" >
                </van-cell>
                    <van-cell >
                        <van-grid square :border="false" :column-num="5">
                            <van-grid-item icon="shopping-cart" color="#1989fa" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                        </van-grid>
                    </van-cell>
                </van-cell-group>
            </van-col>
        </van-row>

        <van-row>
            <van-col span="24">
                <van-cell-group :border="false"><van-cell value="人事统计" ></van-cell>
                    <van-cell value="内容" >
                        <van-grid :border="false">
                            <van-grid-item  icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                        </van-grid>
                    </van-cell>
                </van-cell-group>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <van-cell-group :border="false"><van-cell value="人事统计" ></van-cell>
                    <van-cell value="内容" >
                        <van-grid :border="false">
                            <van-grid-item  icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                        </van-grid>
                    </van-cell>
                </van-cell-group>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <van-cell-group :border="false"><van-cell value="人事统计" ></van-cell>
                    <van-cell value="内容" >
                        <van-grid :border="false">
                            <van-grid-item  icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                        </van-grid>
                    </van-cell>
                </van-cell-group>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <van-cell-group :border="false"><van-cell value="人事统计" ></van-cell>
                    <van-cell value="内容" >
                        <van-grid :border="false">
                            <van-grid-item  icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                        </van-grid>
                    </van-cell>
                </van-cell-group>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <van-cell-group :border="false"><van-cell value="人事统计" ></van-cell>
                    <van-cell value="内容" >
                        <van-grid :border="false">
                            <van-grid-item  icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                        </van-grid>
                    </van-cell>
                </van-cell-group>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <van-cell-group :border="false"><van-cell value="人事统计" ></van-cell>
                    <van-cell value="内容" >
                        <van-grid :border="false">
                            <van-grid-item  icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                        </van-grid>
                    </van-cell>
                </van-cell-group>
            </van-col>
        </van-row>

        <van-tabbar v-model="active" :placeholder="true">
            <van-tabbar-item name="message" icon="chat-o">消息</van-tabbar-item>
            <van-tabbar-item name="home" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item name="disc" icon="search">发现</van-tabbar-item>

        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "mainpage",
        data() {
            return {
                active: 'home',
            };
        },
    }
</script>

<style scoped>

</style>