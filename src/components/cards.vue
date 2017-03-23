<template>
    <div>
        <el-row>
            <el-col :span="6"  v-for="(o, index) in cards" :offset="index > 0 ? 1 : 2">
                <el-card :body-style="{ padding: '0px' }">
                    <img v-if="index==0" src="../assets/img/01.jpg" class="image">
                    <img v-if="index==1" src="../assets/img/03.jpg" class="image">
                    <img v-if="index==2" src="../assets/img/05.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>{{o.title}}</span>
                            <el-button type="text" class="button" @click="o.dialogVisible = true">点击查看</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog v-for="(card,index) in cards" v-model="card.dialogVisible" size="full">
            <cluster-map v-if="index==0"></cluster-map>
            <path-view v-if="index==1"></path-view>
            <multi-path v-if="index==2"></multi-path>
        </el-dialog>

    </div>
</template>
<script>
    import PathView from './path-view.vue';
    import ClusterMap from './cluster-map.vue';
    import MultiPath from './multi-path.vue';

    export default {
        data() {
            return {
                dialogVisible: false,
                cards: [
                    {
                        title: "活动范围聚类展示",
                        img: "cluster.png",
                        dialogVisible: false
                    },
                    {
                        title: "活动路径展示",
                        img: "./assets/img/cluster.png",
                        dialogVisible: false
                    },
                    {
                        title: "时间轴",
                        img: "/img/cluster.png",
                        dialogVisible: false
                    }
                ]
            };
        },
        components: {
            "cluster-map": ClusterMap,
            "path-view": PathView,
            "multi-path": MultiPath
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scope>

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


    .el-card__body {
        background-color: #111111;
        span {
            color: white;
        }
    }
</style>
