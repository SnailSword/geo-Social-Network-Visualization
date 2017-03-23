<template>
    <div id="main"></div>
</template>

<script>
    import 'leaflet/dist/leaflet.css';
    import $ from 'jquery';
    import factory from '../dep/leaflet-echarts.js';
    import '../dep/echarts.source';
    let L = require('../dep/leaflet.js');
    require('../dep/leaflet-echarts.js');
    import srcmig from '../assets/data/srcmigration';
    import usdata from '../assets/data/foo';
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
                }
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
            }
            var map = L.map('main');
            var baseLayers = {
//                "高德地图": L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
//                    subdomains: "1234"
//                }),
//                '高德影像': L.layerGroup([L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
//                    subdomains: "1234"
//                }), L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}', {
//                    subdomains: "1234"
//                })]),
//                "立体地图": L.tileLayer('https://a.tiles.mapbox.com/v3/examples.c7d2024a/{z}/{x}/{y}.png', {
//                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
//                    key: 'BC9A493B41014CAABB98F0471D759707',
//                    styleId: 22677
//                }),
//                "Foursquare": L.tileLayer('https://a.tiles.mapbox.com/v3/foursquare.map-0y1jh28j/{z}/{x}/{y}.png', {
//                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
//                    key: 'BC9A493B41014CAABB98F0471D759707',
//                    styleId: 22677
//                }),
//                'GeoQ灰色底图': L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}').addTo(map),
                'osm': L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2017'
            })
            };
//            L.tileLayer('https://a.tiles.mapbox.com/v3/foursquare.map-0y1jh28j/{z}/{x}/{y}.png', {
//                attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
//                key: 'BC9A493B41014CAABB98F0471D759707',
//                styleId: 22677
//            });
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2017'
            }).addTo(map);
//            var layercontrol = L.control.layers(baseLayers, {
//                position: "topleft"
//            }).addTo(map);
            map.setView(L.latLng(25.980263, -80.298851), 4);

            var overlay = new L.echartsLayer(map, echarts);
            var chartsContainer=overlay.getEchartsContainer();
            var myChart=overlay.initECharts(chartsContainer);
            window.onresize = myChart.onresize;

            let data = usdata.splice(0,20);

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
    #main {
        width: 100%;
        height: 100%;
    }
</style>