<template>
    <div id="container">
        <div id="main"></div>
        <div id="tools" class="optionCard left" >
            <div class="optionHead">自定义配置</div>
            <div class="optionBody">
                <span class="optionName">显示人数：</span>
                <el-input-number size="small" :step="100" :max="5670" v-model="number"></el-input-number>
                <br>
                <span class="optionName">颜色模式：</span>
                <el-radio-group class="radioFix" v-model="colorModel" size="small" fill="#324157" text-color="#eff2f7">
                    <el-radio-button label="随机模式"></el-radio-button>
                    <el-radio-button label="层级渐变"></el-radio-button>
                </el-radio-group>
                <br>
                <span class="optionName">底图：</span>
                <br>
                <el-radio-group class="radioFix" v-model="mapModel" size="small" fill="#324157" text-color="#eff2f7">
                    <el-radio-button label="世界地图"></el-radio-button>
                    <el-radio-button label="美国地图"></el-radio-button>
                </el-radio-group>
                <br>
                <span class="optionName">观察范围：</span>
                <br>
                <el-radio-group class="radioFix" v-model="scope" size="small" fill="#324157" text-color="#eff2f7">
                    <el-radio-button label="美国"></el-radio-button>
                    <el-radio-button label="纽约"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import $ from 'jquery';
    import '../assets/data/usa.js';
    import '../assets/data/world.js';
    import usdata from '../assets/data/toolarge';

    let data = usdata.map((bl, index) => {
        let count = bl.length;
        let color = '#5A94DF';
        if (count < 5) {
            color = '#A7FFEF';
        } else if (color < 12) {
            color = '#5BFFE0';
        } else if (color <20) {
            color = '#49CCB4';
        } else {
            color = '#2D7F70';
        }
        return {
            coords: bl,
            lineStyle: {
                normal: {
                    color: color
                }
            }
        }
    });

    let data2 = usdata.map((bl, index) => {
        return {
            coords: bl,
            lineStyle: {
                normal: {
                    color: echarts.color.modifyHSL('#5A94DF', Math.round(index))
                }
            }
        }
    });

    // 基于准备好的dom，初始化echarts实例
    export default {
        data() {
            return {
                option: {
                    backgroundColor: '#003',
                    geo: {
                        map: 'usa',
//                        map: 'world',
                        left: 0,
                        right: 0,
                        center: [-101.248976,36.645199],
                        silent: true,
                        itemStyle: {
                            normal: {
                                borderColor: '#003',
                                color: '#005'
                            }
                        }
                    },
                    series: [{
                        type: 'lines',
                        coordinateSystem: 'geo',
//                    data: [[-97.852375,40.768388]],
                        data: data.slice(0,100),
                        polyline: true,
                        lineStyle: {
                            normal: {
                                width: 0
                            }
                        },
                        effect: {
                            constantSpeed: 20,
                            show: true,
                            trailLength: 0.1,
                            symbolSize: 1.5
                        },
                        zlevel: 1,
                        itemStyle: {
                            normal: {
                                opacity: 1,
                            }
                        },
                        // 设置混合模式为叠加
//                    blendMode: 'lighter'
                    }]
                },
                number: 100,
                colorModel: '层级渐变',
                mapModel: '美国地图',
                scope: '美国',
                myChart: {}
            }
        },
        mounted() {
            this.myChart = echarts.init(document.getElementById('main'));

            this.myChart.showLoading();

            this.myChart.hideLoading();

            this.myChart.setOption(this.option);
        },
        methods: {
            updateData(number, colorModel) {
                if(colorModel === '层级渐变') {
                    this.option.series[0].data = data.slice(0,number);
                }
                else {
                    this.option.series[0].data = data2.slice(0,number);
                }
            }
        },
        watch: {
            option: {
                handler: function (value, oldValue) {
//                    this.myChart.clear();
                    this.myChart.setOption(value);
                },
                deep: true
            },
            number: function (val) {
                this.updateData(val, this.colorModel);
            },
            colorModel: function (val, oldValue) {
                this.updateData(this.number, val);
            },
            mapModel: function (val) {
                this.option.geo.map = val === '世界地图' ? 'world' : 'usa';
            }
        }
    }

</script>

<style lang="sass" rel="stylesheet/scss" scope>
    #container {
        width: 100%;
        height: 100%;
        .number {
            width: 115px;
        }
    }
    #main {
        width: 100%;
        height: 100%;
    }
    .optionCard.left {
        top: 100px;
        left: 40px;
    }
    .optionData {
        width: 100px;
    }
    .optionNumber {
        margin: -7px 0;
    }
</style>