<template>
    <div>
        <el-row>
            <el-col :span="6"  v-for="(o, index) in 3" :offset="index > 0 ? 1 : 2">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../assets/img/cluster.png" class="image">
                    <div style="padding: 14px;">
                        <span>活动范围聚类展示</span>
                            <el-button type="text" class="button" @click="dialogVisible = true">点击查看</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog v-model="dialogVisible" size="full">
            <cluster-map></cluster-map>
        </el-dialog>

    </div>
</template>
<script>
    import ClusterMap from './cluster-map.vue'
    export default {
        data() {
            return {
                currentDate: new Date(),
                dialogVisible: false
            };
        },
        components: {
            "cluster-map": ClusterMap
        }
    }
</script>

<style>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        margin-top: 4px;
        padding: 0px;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

</style>
