<template>
    <div id="container">
        <div id="main"></div>
        <div id="tools" class="optionCard">
            <div class="optionHead">自定义配置</div>
            <div class="optionBody">
                <span class="optionName">显示路径数：</span>
                <el-input-number size="small" :step="100" v-model="number" max="40000"></el-input-number>
                <br>
                <span class="optionName">边绑定开关</span>
                <el-switch
                        v-model="option.series[0].markLine.bundling.enable"
                        on-text=""
                        off-text="">
                </el-switch>
            </div>
        </div>
    </div>
</template>

<script>
    import 'leaflet/dist/leaflet.css';
    import $ from 'jquery';
    import factory from '../dep/leaflet-echarts.js';
    import '../dep/echarts.source';
    let L = require('../dep/leaflet.js');
    require('../dep/leaflet-echarts.js');
    import srcmig from '../assets/data/srcmigration';
    //    import usdata from '../assets/data/foo';
    import usdata from '../assets/data/toolarge';
    L.echartsLayer = factory(L);
    // total path : 49xxx
    const defaultOption = {
        NUMBER: 100,
        BUNDLE: false
    };

    let pathResult = [];
    let data = usdata;

    for(var key in data){
        data[key].forEach(function (value, index) {
            data[key][index].num=Number(value.num);
        })
    }

    data.map(function (array) {
        for (let i = 0;i<array.length-1;i++) {
//                    option.series[0].markLine.data.push([{"geoCoord": array[i]}, {"geoCoord": array[i + 1]}]);
            pathResult.push([
                {"geoCoord": array[i]},
                {"geoCoord": array[i + 1]}
            ]);
        }
    });

    export default {
        data() {
            return {
                option: {
                    legend: {
                        show: true,
                        x: 'right',
                        orient: 'vertical',
                        textStyle: {
                            color: 'red'
                        },
                        data: []
                    },
                    series : [{
                        name: "pathview",
                        type: 'map',
                        mapType: 'none',
                        data: [{}],
                        hoverable: false,
                        clickable: false,
                        roam: true,
                        markLine: {
                            effect: {
                                color: 'rgba(204, 246, 255, 0.1)',
                                show: false,
                                period: 20
                            },
                            bundling: {
                                enable: defaultOption.BUNDLE
                            },
                            large: true,
                            smooth: true,
                            smoothness: 1,
                            symbol: ['none', 'none'],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(2, 166, 253, 0.06)',
                                        type: 'solid',
                                        width: 0.5,
                                        opacity: 0.8
                                    }
                                }
                            },
                            data: pathResult.slice(0, defaultOption.NUMBER)
                        },
                        markPoint: {
                            symbol: 'circle',
                            symbolSize: 1.5,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(255, 0, 0, 0.5)'
                                }
                            },
                            data: []
                        }
                    }]
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                value1: '',
                number: 100,
                lineData: [],
                overlay: {},
                myChart: {}
            }
        },
        mounted() {
            var map = L.map('main');
            L.tileLayer('https://cartodb-basemaps-b.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2017'
            }).addTo(map);
            map.setView(L.latLng(38.567941, 50.554019), 2);
            this.overlay = new L.echartsLayer(map, echarts);
            var chartsContainer=this.overlay.getEchartsContainer();
            this.myChart = this.overlay.initECharts(chartsContainer);
            window.onresize = this.myChart.onresize;
            this.overlay.setOption(this.option);
//            overlay.setOption(option);
        },
        methods:{
            renderLines(num, time){
                console.log('a' + pathResult.length);
                console.log(this.overlay);
                this.overlay.setOption(this.option);
            }
        },
        watch: {
            option: {
                handler: function (value, oldValue) {
                    this.myChart.clear();
                    this.overlay.setOption(value);
                },
                deep: true
            },
            number: function (val) {
                this.option.series[0].markLine.data = pathResult.slice(0, val);
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
    .optionData {
        width: 100px;
    }
    .optionNumber {
        margin: -7px 0;
    }
    .optionCard {
        top: 100px;
        right: 40px;
    }
</style>