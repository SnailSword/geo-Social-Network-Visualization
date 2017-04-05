<template>
    <div id="container">
        <div id="main"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import $ from 'jquery';
    import '../assets/data/usa.js';
    import '../assets/data/world.js';
    import usdata from '../assets/data/toolarge';

    let data_cluster = [
        {
            value: [-74.018677,40.818637,130]
        },{
            value: [-118.226806,34.091255,50]
        },{
            value: [-116.681433,33.968711,40]
        },{
            value: [-122.127033,37.448917,20]
        },{
            value: [-121.023195,38.149646,10]
        },{
            value: [-111.971725,33.538403,15]
        },{
            value: [-97.548245,30.274764,30]
        },{
            value: [-80.328375,26.368621,30]
        },{
            value: [-84.449369,33.78456,50]
        },{
            value: [-77.090451,38.958662,48]
        },{
            value: [-76.575326,39.473886,40]
        },{
            value: [-81.65298,41.551795,29]
        },{
            value: [-87.687294,41.937595,27]
        },{
            value: [-76.575326,36.918983,25]
        },{
            value: [-79.430932,43.707749,25]
        }
    ];

    let data_center = [
        {
            name: '纽约',
            value: [-74.0059731, 40.7143528]
        },
        {
            name: '洛杉矶',
            value: [-118.24361, 34.05222]
        },
        {
            name: '芝加哥',
            value: [-87.62778, 41.88194]
        },
        {
            name: '休士顿',
            value: [-95.367, 29.750]
        },
        {
            name: '费城',
            value: [-73.985708, 40.75773]
        },
        {
            name: '底特律',
            value: [-83.04583, 42.33139]
        },
        {
            name: '圣法兰西斯科',
            value: [-122.417, 37.783]
        },
        {
            name: '波士顿',
            value: [-71.06167, 42.35778]
        },
        {
            name: '匹兹堡',
            value: [-80.00000, 40.44167]
        },
        {
            name: '亚特兰大',
            value: [-84.39, 33.771666]
        }
    ];

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
                        name: '聚类中心',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: data_cluster,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: false,
                        symbolSize: function (val) {
                            return val[2] / 6;
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926',
                                shadowBlur: 10,
                                shadowColor: '#ddb926'
                            }
                        }
                    }, {
                        name: '经济中心',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: data_center,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        symbolSize: 4,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#e74c3c'
                            }
                        }
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