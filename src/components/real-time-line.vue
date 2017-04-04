<template>
    <div id="container">
        <div id="main"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import $ from 'jquery';
    import '../assets/data/usa.js';
    import data from '../assets/data/tlData_4';

    let tlOptions = data.map((val, idx) => {
        return {
            title: {
                show: true,
                'text': idx + ':00'
            },
            series: [{
                data: val
            }]
        }
    });
    let temp = {
    0 : 4401,
    1 : 3613,
    2 : 2493,
    3 : 1323,
    4 : 768,
    5 : 460,
    6 : 538,
    7 : 883,
    8 : 1645,
    9 : 2365,
    10 : 3043,
    11 : 3596,
    12 : 3885,
    13 : 4129,
    14 : 4043,
    15 : 3987,
    16 : 3759,
    17 : 3864,
    18 : 4219,
    19 : 4154,
    20 : 4507,
    21 : 5057,
    22 : 5594,
    23 : 4885
    }
    export default {
        data() {
            return {
                option:{
                    baseOption: {
                        timeline: {
                            data: Array.from(new Array(24), (v,i) => i),
                            show: true,
                            axisType: 'value',
                            autoPlay: true,
                            playInterval: 4000,
                            bottom: 70,
                            right: 80,
                            width: 900,
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#999'
                                    }
                                },
                                emphasis: {
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            symbol: 'none',
                            lineStyle: {
                                color: '#555'
                            },
                            checkpointStyle: {
                                color: '#bbb',
                                borderColor: '#777',
                                borderWidth: 2
                            },
                            controlStyle: {
                                showNextBtn: false,
                                showPrevBtn: false,
                                normal: {
                                    color: '#666',
                                    borderColor: '#666'
                                },
                                emphasis: {
                                    color: '#aaa',
                                    borderColor: '#aaa'
                                }
                            },
                        },
                        title: [{
                            'text': 'aaa',
                            textAlign: 'center',
                            left: '36%',
                            top: '55%',
                            textStyle: {
                                fontSize: 100,
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        }],
                        backgroundColor: '#003',
                        geo: {
                            map: 'usa',
//                            left: 0,
//                            right: 0,
                            silent: true,
                            itemStyle: {
                                normal: {
                                    borderColor: '#003',
                                    color: '#005'
                                }
                            },
//                            left: 0, top: 0, right: 0, bottom: 0,
//                            boundingCoords: [
//                                [-130.554145,49.539076],
//                                [-61.674666,29.752886]
//                            ],
                            layoutCenter: ['30%', '20%'],
                            layoutSize: 1500
                        },
                        series: [
                            {
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                symbolSize: 5,
//                                large: true,
//                                largeThreshold: 100,
                                itemStyle: {
                                    normal: {
                                        opacity: 0.45
                                    }
                                },
                                // 设置混合模式为叠加
                                blendMode: 'lighter'
                            }
                        ]
                    },
                    options: tlOptions.slice(0,24)
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