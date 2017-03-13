<template>
        <div id="map"></div>
</template>

<script>
    import 'leaflet/dist/leaflet.js';
    import 'leaflet/dist/leaflet.css';
    import 'leaflet.markercluster/dist/leaflet.markercluster.js';
    import 'leaflet.markercluster/dist/MarkerCluster.css';
    import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
//    import addressPoints from '../assets/data/realworld.10000';
    import addressPoints from '../assets/data/sichuandata';
    import icon from '../assets/data/icon';

    export default {
        data() {
            return {
                title: "Welcome to Shhhhhh"
            }
        },
        mounted() {
            // 不知道为啥默认的icon格式不对 这里fix一下
            var dIcon = L.icon({
                iconUrl: icon.defaultIcon,
                shadowUrl: icon.defaultIconShadow
            });

            var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        maxZoom: 18,
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2017'
                    }),
                    latlng = L.latLng(30.647,103.972);

            var map = L.map('map', {center: latlng, zoom: 13, layers: [tiles]});

            var markers = L.markerClusterGroup({ chunkedLoading: true });

            for (var i = 0; i < addressPoints.length; i++) {
                var a = addressPoints[i];
                var title = a[2];
                var marker = L.marker(L.latLng(a[0], a[1]), { title: title, icon: dIcon});
                marker.bindPopup(title);
                markers.addLayer(marker);
            }

            map.addLayer(markers);
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scope>
    .el-dialog__header{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 999;
    }

    .el-dialog__body {
        height: 100%;
        width: 100%;
        padding: 0;
    }
    #map {
        width: 100%;
        height: 100%;
    }

    #progress {
        display: none;
        position: absolute;
        z-index: 1000;
        left: 400px;
        top: 300px;
        width: 200px;
        height: 20px;
        margin-top: -20px;
        margin-left: -100px;
        background-color: #fff;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 4px;
        padding: 2px;
    }

    #progress-bar {
        width: 0;
        height: 100%;
        background-color: #76A6FC;
        border-radius: 4px;
    }
</style>