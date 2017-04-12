<template>
    <div id="container">
        <div id="main"></div>
        <div id="tools" class="optionCard left">
            <div class="optionHead">自定义配置</div>
            <div class="optionBody">
                <span class="optionName">查看指定日期数据</span>
                <br>
                <el-date-picker
                        id="ptldPiacker"
                        size="small"
                        v-model="currentDate"
                        type="daterange"
                        format="MM月dd日"
                        :picker-options="DatePickerOptions"
                        placeholder="选择日期范围">
                </el-date-picker>
                <br>
                <span class="optionName">查看指定用户数据</span>
                <el-select :disabled="selectAll" size="small" :multiple="true" v-model="currentUsers" filterable placeholder="选择用户ID">
                    <el-option
                            v-for="item in users"
                            :value="item.value"
                            :label="item.label"
                    >
                    </el-option>
                </el-select>
                <span class="optionName">选择全部数据</span>
                <el-switch
                        v-model="selectAll"
                        on-text=""
                        off-text="">
                </el-switch>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import '../assets/data/usa.js';
    import usdata from '../assets/data/timeline_path_data';

//    得到一个人的路径
    let getOneLine = function (ID, time) {
        let dc = usdata.data_cluster.map((val) => val.slice(0, 2));
        let allpoiArray = usdata.data[ID];
        let filterPoi = allpoiArray.filter((val) => {
            return val[0] >= time[0] && val[0] <= time[1];
        });
        let res = [];
        for (let i = 0; i < filterPoi.length - 1; i++) {
            if (filterPoi[i][1] === filterPoi[i + 1][1]) {
               continue;
            }
            res.push({
                coords: [dc[filterPoi[i][1]], dc[filterPoi[i + 1][1]]],
                fromName: filterPoi[i][1],
                toName: filterPoi[i + 1][1]
            });
        }
        return res
    };
    let allUsers = Object.keys(usdata.data);

    export default {
        data() {
            return {
                option: {
                    backgroundColor: '#404a59',
                    legend: {
                        show: false,
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        data: ['地点', '线路'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        map: 'usa',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#404a59'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        },
                        layoutCenter: ['30%', '20%'],
                        layoutSize: 1500
                    },
                    series: [{
                        name: '线路',
                        type: 'lines',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        large: true,
                        effect: {
                            show: true,
                            constantSpeed: 30,
                            symbol: 'pin',
                            symbolSize: 3,
                            trailLength: 0,
                        },
                        lineStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0, color: '#58B3CC'
                                }, {
                                    offset: 1, color: '#F58158'
                                }], false),
                                width: 1,
                                opacity: 0.2,
                                curveness: 0.1
                            }
                        },
                        data: []
                    }]
                },
                myChart: {},
                users: Object.keys(usdata.data).slice(20,70).map((val) => {
                    return {
                        value: val,
                        label: 'user_' + val
                    }
                }),
                DatePickerOptions:{
                    disabledDate(time) {
                        let d = new Date();
                        return time.getTime() < d.setFullYear(2017, 2, 1) || time.getTime() > d.setFullYear(2017, 2, 7)
                    }
                },
//                currentDate: [new Date().setFullYear(2017, 2, 2), new Date().setFullYear(2017, 2, 7)],
                currentDate: '',
                currentUsers: [],
                selectAll: false,
                tempData: {}
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
            },
            getAllUsersData() {
                let arr = this.currentDate && this.currentDate[0] ? [this.currentDate[0].getDate(), this.currentDate[1].getDate()] : [2, 7];
                let res = [];
                allUsers.slice(0,400).forEach(function (value) {
                    res = res.concat(getOneLine(value, arr));
                });
                return res;
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
            currentUsers: {
                handler: function (val) {
                    let res = [];
                    let arr = this.currentDate && this.currentDate[0] ? [this.currentDate[0].getDate(), this.currentDate[1].getDate()] : [2, 7];
                    val.forEach(function (value) {
                        res = res.concat(getOneLine(value, arr));
                    });
                    this.option.series[0].data = res;
                },
                deep: true
            },
            currentDate: {
                handler: function (val) {
                    let arr = val && val[0] ? [val[0].getDate(), val[1].getDate()] : [2, 7];
                    let res = [];
                    this.currentUsers.forEach(function (value) {
                        res = res.concat(getOneLine(value, arr));
                    });
                    this.option.series[0].data = res;
                }
            },
            selectAll(val) {
                if (val) {
                    this.tempData = this.option.series[0].data;
                    this.option.series[0].data = this.getAllUsersData();
                }
                else {
                    this.option.series[0].data = this.tempData;
                }
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
    #ptldPiacker {
        width: 150px;
        margin-bottom: 12px;
    }
</style>