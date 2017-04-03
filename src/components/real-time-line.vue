<template>
    <div id="container">
        <div id="main"></div>
        <div id="tools" class="optionCard left" >
            <div class="optionHead">自定义配置</div>
            <div class="optionBody">

            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import $ from 'jquery';
    import '../assets/data/usa.js';

    export default {
        data() {
            return {
                option:{
                    baseOption: {
                        timeline: {
                            data: ['2002-01-01', '2003-01-01', '2004-01-01'],
                            show: true,
                            axisType: 'time',
                            autoPlay: true
                        },
                        backgroundColor: '#003',
                        geo: {
                            map: 'usa',
                            left: 0,
                            right: 0,
                            silent: true,
                            itemStyle: {
                                normal: {
                                    borderColor: '#003',
                                    color: '#005'
                                }
                            }
                        },
                        series: [
                            {
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                symbolSize: 30,
                                // large: true,
                                largeThreshold: 100,
                                itemStyle: {
                                    normal: {
                                        opacity: 0.4
                                    }
                                },
                                // 设置混合模式为叠加
                                blendMode: 'lighter'
                            }
                        ]
                    },
                    options: [
                        {series: [{
                            data: [[-107.065971,41.995521],[-116.779744,39.988388]]
                        }]},
                        {series: [{
                            data: [[-106.065971,41.995521],[-117.779744,39.988388]]
                        }]},
                        {series: [{
                            data: [[-105.065971,41.995521],[-115.779744,39.988388]]
                        }]}
                    ]
                },
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