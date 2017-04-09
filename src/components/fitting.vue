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
        [-84.347749, 33.793111, 23230],
        [-121.825947, 37.980151, 9709],
        [-73.885241, 40.763517, 116888],
        [109.778731, -4.664551, 158],
        [-98.724031, 28.461542, 3324],
        [-117.973544, 33.899142, 25260],
        [-80.722762, 26.760038, 16777],
        [-89.619132, 41.664098, 1001],
        [-76.938687, 39.087558, 24020],
        [-71.591244, 42.092909, 7207],
        [-77.519631, 37.471230, 6129],
        [-90.203380, 30.824023, 5696],
        [-81.565116, 40.851655, 12872],
        [75.256052, 40.248773, 24],
        [-86.787020, 43.120919, 2244],
        [-83.450203, 42.380513, 9395],
        [-90.409716, 38.655581, 2477],
        [-87.745093, 41.733862, 9077],
        [-81.074398, 34.835854, 7348],
        [-83.372526, 30.495031, 4505],
        [-122.381725, 46.884756, 3831],
        [27.917788, -26.216508, 33],
        [-43.182587, -22.906955, 9],
        [-79.150499, 35.723929, 9911],
        [-93.336821, 44.863998, 1703],
        [-99.955508, 48.237045, 127],
        [-95.371336, 29.846787, 10585],
        [-105.192601, 33.805301, 590],
        [-97.034597, 32.713062, 4073],
        [-86.666394, 32.680527, 2346],
        [-111.712989, 32.970829, 4068],
        [46.664736, 24.714047, 45],
        [-76.361311, 36.916211, 7447],
        [-79.308676, 43.456803, 6512],
        [-97.484059, 35.729087, 1500],
        [-86.637623, 35.794645, 3871],
        [-85.185566, 39.379295, 5725],
        [-104.726379, 40.247122, 1092],
        [-106.566477, 27.715186, 197],
        [-75.270782, 40.055162, 10469],
        [19.964870, 52.282661, 5],
        [-115.061862, 37.471974, 2361],
        [-66.099323, 31.186166, 215],
        [-64.040789, 45.484553, 355],
        [74.006596, 18.332785, 13],
        [-94.943572, 39.814028, 1644],
        [-74.573829, 43.958193, 3208],
        [-93.174857, 34.045882, 1692],
        [-81.170466, 32.777892, 4028],
        [-89.844061, 35.003432, 2579]
    ];

//    let a = data_cluster.filter((d) => d[0] > -65)
//    console.log(a);

    let sorted_data = data_cluster.sort((a, b) => b[2] - a[2]);

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
                    title: [{
                        'text': '聚类中心与实际热门城市中心拟合',
                        left: '50%',
                        top: 20,
                        textAlign: 'center',
                        textStyle: {
                            fontSize: 30,
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }],
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
                        data: sorted_data,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: false,
                        symbolSize: function (val) {
                            return val[2] / 3000;
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