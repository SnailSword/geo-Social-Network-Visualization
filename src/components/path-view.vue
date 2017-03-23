<template>
    <div id="container">
        <div id="main"></div>
        <el-slider class="number" v-model="number" :max="1000"></el-slider>
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
    export default {
        data() {
            return {
                option: {
                    title : {
                        text: '百度迁徙图Leaflet版',
                        subtext: '-- Develop By WanderGIS',
                        x:'center',
                        y:'top',
                        textStyle: {
                            color: '#FFC107'
                        }
                    },
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
                        name: "订单流向",
                        type: 'map',
                        mapType: 'none',
                        itemStyle: {
                            normal: {
                                borderColor:'rgba(100,149,237,0.2)',
                                borderWidth:0.5,
                                areaStyle: {
                                    color: '#1b1b1b'
                                }
                            }
                        },
                        data: [{}],
                        hoverable: false,
                        clickable: false,
                        roam: true,
                        markLine: {
                            effect: {
                                color: 'rgba(204, 246, 255, 0.1)',
                                show: true,
                                period: 40
                            },
                            bundling: {
                                enable: true
                            },
                            large: true,
                            smooth: true,
                            smoothness: 0.1,
                            symbol: ['none', 'none'],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(2, 166, 253, 0.2)',
                                        type: 'solid',
                                        width: 0.5,
                                        opacity: 0.2
                                    }
                                }
                            },
                            data: []
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
                number: 20
            }
        },
        mounted() {
            var option = {
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
                            enable: false
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
                        data: []
                    }
                }]
            }
            var map = L.map('main');
            L.tileLayer('https://cartodb-basemaps-b.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2017'
            }).addTo(map);
            map.setView(L.latLng(37.9, -97.8), 5);

            var overlay = new L.echartsLayer(map, echarts);
            var chartsContainer=overlay.getEchartsContainer();
            var myChart=overlay.initECharts(chartsContainer);
            window.onresize = myChart.onresize;
            console.log('u' + usdata.length);
            let data = usdata.slice(0,1000);
            function getGeoCoord (name) {
                var city = name.split('_').pop();
                var coord = geoCoord[city];
                return coord;
            }

            for(var key in data){
                data[key].forEach(function (value, index) {
                    data[key][index].num=Number(value.num);
                })
            }

            data.map(function (array) {
                for (let i = 0;i<array.length-1;i++) {
                    option.series[0].markLine.data.push([{"geoCoord": array[i]}, {"geoCoord": array[i + 1]}]);
                }
            });

//            option.series[0].markPoint.data = data.topCityOut.map(function (point) {
//                return {
//                    geoCoord: getGeoCoord(point.name)
//                }
//            });
            overlay.setOption(option);
        },
        method() {

        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scope>
    #container {
        width: 100%;
        height: 100%;
        .number {
            position: fixed;
            width: 300px;
            left: 10px;
            bottom: 10px;
        }
    }
    #main {
        width: 100%;
        height: 100%;
    }
</style>