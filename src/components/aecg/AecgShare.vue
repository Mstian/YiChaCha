<template>
    <div class="wrapper">
        <UserShare :msg="userInfo" />
        <div class="cg-title">心率趋势图</div>
        <div class="cg-charts" id="cg-charts"></div>
        <div class="cg-count">
            <div class="cg-title">事件统计</div>
        </div>
        <ShareFooter :msg="userInfo" />
    </div>
</template>

<script>
    import UserShare from '@/components/common/UserShare.vue';
    import ShareFooter from '@/components/common/ShareFooter.vue';
    import Highcharts from 'highcharts';
    export default {
        name: "AecgShare",
        components: {
            UserShare,
            ShareFooter,
        },
        data() {
            return {
                userInfo: {
                    avatar:require('@/assets/img/avr.png'),
                    nickname:'张三',
                    download:'http://www.baidu.com',
                    cart:'http://www.baidu.com',
                    devicename:'心电详情'
                }
            }
        },
        mounted() {
            this.getCharts();
        },
        methods: {
            getCharts() {
                Highcharts.chart('cg-charts',{
                    title: {
                        text: null,
                    },
                    xAxis:{

                    },
                    yAxis:{
                        title: {
                            text:null
                        }
                    },
                    credits:{
                        enabled:false
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br/>',
                        pointFormat: '{point.x} km: {point.y}°C'
                    },
                    series: [{
                        name: '心率',
                        data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
                            [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
                    }]
                })
            },
        },
    }
</script>

<style scoped>
    .wrapper{
        font-family: "SF Pro SC","SF Pro Display","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
    }
    .cg-charts{
        width: 750px;
        height:500px;
    }
    .cg-title{
        font-size: 33px;
        font-weight: bold;
        padding: 20px 0 20px 30px;
    }
</style>
