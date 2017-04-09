<template>
    <div id="container">
        <div id="main"></div>
        <div id="tools" class="optionCard">
            <div class="optionHead">自定义配置</div>
            <div class="optionBody">
                <span class="optionName">显示路径数：</span>
                <span>{{number}}</span>
                <el-slider class="optionNumber" v-model="number" :max="1000"></el-slider>
                <span class="optionName">边绑定开关</span>
                <el-switch
                        v-model="option.series[0].markLine.bundling.enable"
                        on-text=""
                        off-text="">
                </el-switch>
                <br>
                <span class="optionName">查看指定日期数据</span>
                <br>
                <el-date-picker class="optionData"
                        size="small"
                        v-model="value1"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                </el-date-picker>
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
    import usdata from '../assets/data/cluster_path_data';
    L.echartsLayer = factory(L);

    const defaultOption = {
        NUMBER: 100,
        BUNDLE: false
    };

    let pathResult = [];
    let data = Object.values(usdata.data);
    let clusterCenter = usdata.data_cluster;

//    for(var key in data){
//        data[key].forEach(function (value, index) {
//            data[key][index].num=Number(value.num);
//        })
//    }

    data.map(function (array) {
        for (let i = 0;i<array.length-1;i++) {
//                    option.series[0].markLine.data.push([{"geoCoord": array[i]}, {"geoCoord": array[i + 1]}]);
            if (array[i] in [3, 13, 21, 31, 39, 43]){
                continue
            }
            if (array[i + 1] in [3, 13, 21, 31, 39, 43]){
                continue
            }
            pathResult.push([
                    {"geoCoord": clusterCenter[array[i]]},
                    {"geoCoord": clusterCenter[array[i + 1]]}
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
                                show: true,
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
                                        color: 'rgba(2, 166, 253, 0.1)',
                                        type: 'solid',
                                        width: 0.5,
                                        opacity: 0.8
                                    }
                                }
                            },
                            data: pathResult.slice(0, defaultOption.NUMBER)
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
            map.setView(L.latLng(37.9, -97.8), 5);
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
                    if (value <= oldValue){
                        this.myChart.clear();
                    }
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
    .optionCard {
        top: 100px;
        right: 40px;
    }
    .optionData {
        width: 100px;
    }
    .optionNumber {
        margin: -7px 0;
    }
</style>