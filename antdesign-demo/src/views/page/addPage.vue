<template>
    <a-form-model :model="form1" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="[6,6]">
            <a-col :span="20">
                <a-popover
                        placement="bottom"
                        trigger="click">
                    <template slot="content">
                        <p style="font-size: 20px">{{form1.name}}</p>
                    </template>
                    <a-form-model-item label="Activity name">
                        <a-input v-model="form1.name" />
                    </a-form-model-item>
                </a-popover>

            </a-col>
        </a-row>
        <a-row :gutter="[6,6]">
            <a-col :span="20">
                <a-form-model-item label="Activity zone">
                    <a-select v-model="form1.region" placeholder="please select your zone">
                        <a-select-option value="shanghai">
                            Zone one
                        </a-select-option>
                        <a-select-option value="beijing">
                            Zone two
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-col>
        </a-row>

        <a-row :gutter="[6,6]">
            <a-col :span="20">
                <a-form-model-item label="Activity time">
                    <a-date-picker
                            v-model="form1.date1"
                            show-time
                            type="date"
                            placeholder="Pick a date"
                            style="width: 100%;"
                    />
                </a-form-model-item>
            </a-col>
        </a-row>

        <a-row :gutter="[6,6]">
            <a-col :span="20">
                <a-form-model-item label="Instant delivery">
                    <a-switch v-model="form1.delivery" />
                </a-form-model-item>
            </a-col>
        </a-row>

        <a-row :gutter="[6,6]">
            <a-col :span="20">
                <a-form-model-item label="Activity type">
                    <a-checkbox-group v-model="form1.type">
                        <a-checkbox value="1" name="type">
                            Online
                        </a-checkbox>
                        <a-checkbox value="2" name="type">
                            Promotion
                        </a-checkbox>
                        <a-checkbox value="3" name="type">
                            Offline
                        </a-checkbox>
                    </a-checkbox-group>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-row :gutter="[6,6]">
            <a-col :span="20">
                <a-form-model-item label="Resources">
                    <a-radio-group v-model="form1.resource">
                        <a-radio value="1">
                            Sponsor
                        </a-radio>
                        <a-radio value="2">
                            Venue
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-row :gutter="[6,6]">
            <a-col :span="20">
                <a-form-model-item label="Activity form">
                    <a-input v-model="form1.desc" type="textarea" />
                </a-form-model-item>
            </a-col>
        </a-row>
    </a-form-model>
</template>

<script>
    export default {
        name: "addPage",
        data(){
            return{
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
                form1: {
                    name: '',
                    region: undefined,
                    date1: undefined,
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                },
            }
        },
        methods:{
            setValue(){
                console.log("child");
                //this.form1.name='杰克马';
            }
        }

    }
</script>

<style scoped>

</style>