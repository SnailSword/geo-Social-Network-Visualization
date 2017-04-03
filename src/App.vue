<template>
  <div id="app">
      <el-menu theme="dark" :router="true" :default-active="activeIndex" class="menu" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/cluster">地点聚类</el-menu-item>
          <el-submenu index="2">
              <template slot="title">路径聚类</template>
              <el-menu-item index="/pathview">原始数据</el-menu-item>
              <el-menu-item index="/clusterpath">聚类后数据</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
              <template slot="title">时间轴</template>
              <el-menu-item index="/timeline">伪时间轴</el-menu-item>
              <el-menu-item index="/realtimeline">真·时间轴</el-menu-item>
          </el-submenu>
      </el-menu>
      <router-view></router-view>
    <!--<el-button @click.native="startHacking">Let's do it</el-button>-->
  </div>
</template>

<script>
    import Header from './components/header.vue';
    import Cards from './components/cards.vue';
//    import MultiPath from './components/multi-path.vue';
    import 'leaflet/dist/leaflet.js';
    import 'leaflet/dist/leaflet.css';
    import $ from 'jquery';
    export default {
        data () {
            return {
              msg: 'Use Vue 2.0 Today!',
                activeIndex: '/cluster',
            }
        },

        methods: {
            startHacking () {
                this.$notify({
                    title: 'It Works',
                    message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
                    duration: 6000
                })
            },
            handleSelect(key, keyPath) {
              console.log(key, keyPath);
            }
        },
        components: {
          "s-header": Header,
          "s-cards" : Cards
        },
        mounted() {
//            var map = L.map('main');
//            L.tileLayer('https://cartodb-basemaps-b.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
//                maxZoom: 18,
//                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2017'
//            }).addTo(map);
//            map.setView(L.latLng(37.9, -97.8), 5);
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss">
    @import "./css/font";
    body {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        height: 100%;
        width: 100%;
        a {
            text-decoration: none;
        }
    }
    #map, #main {
        position: fixed;
        top: 0px;
        left: 0px;
        margin-top: 60px;
        height: auto;
        width: 100%;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .menu {
        border-radius: 0px;
    }

    .optionCard {
        position: fixed;
        width: 230px;
        height: 60%;
        border-radius: 4px;
        overflow: hidden;
        .optionHead {
            height: 35px;
            width: 100%;
            color: #eff2f7;
            vertical-align: middle;
            line-height: 35px;
            padding-left: 20px;
            background-color: #324157;
            cursor: pointer;
        }
        .optionBody {
            padding: 20px;
            height: 100%;
            font-size: 14px;
            background-color: #EFF2F7;
            .optionName {
                margin-right: 10px;
                line-height: 35px;
            }
            .radioFix {
                span:hover {
                    color: #324157;
                }
                span {
                    box-shadow: -1px 0 0 0 #324157;
                }
            }
        }
    }
</style>
