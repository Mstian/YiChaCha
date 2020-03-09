<template>
    <div class="onShare">
        <div class="userShare">
            <div class="user-vat"></div>
            <div class="user-fonts">{{userInfo.userMsg}}</div>
        </div>
        <div class="timeShare">
            <div class="icon"><img src="@/assets/taixin/time.png" alt=""></div>
            <div class="fonts">{{nowtime}}</div>
        </div>
        <div class="dataResult">
            <div class="result-num"><div>139</div><span>bpm</span></div>
            <div class="result-type">
                <img src="@/assets/taixin/xin2.png" alt="">
                <div class="fonts">胎心平均心率</div>
            </div>
        </div>
        <div id="heartLine" class="heartLine"></div>
    </div>
</template>

<script>
    import untils from "../../common/until";
    export default {
        name: "oneShare",
        data() {
            return {
                userInfo: {
                    uservar:"",
                    userMsg:"刘雪给您分享了胎心平均心率结果详情"
                },
                nowtime:untils.formatTime(new Date())
            }
        },
        mounted(){
          this.drawLine();
        },
        methods:{
            drawLine:function(){
                let myChart = this.$echarts.init(document.getElementById("heartLine"));
                let date = [];
                let randomData = [];

                // for(let i = 0; i<30; i++){
                //     randomData.push([i,Math.floor(Math.random()*100)]);
                // }
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption({
                    xAxis: {
                        type: 'category',
                        position:'top',
                        axisLine:{
                            show:false,
                        },
                        axisTick:{
                            //show:false,
                            length:130,
                            alignWithLabel:true,
                            lineStyle:{
                                color:'#999'
                            }
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },

                    yAxis: {
                        type: 'value',
                        scale:true,

                        axisLine:{
                            show:false,
                        },
                        axisTick:{
                            show:false
                        },
                        splitLine:{
                            show:true,
                        }
                    },
                    series: [{
                        data: [[0,80],[1,120],[2,160],[3,14],[4,60],[5,17],[6,150],[7,50],[8,160],[9,100]],
                        type: 'line'
                    }]
                });

                // let len = date.length;

                // setInterval(function(){
                //     randomData.push(Math.floor(Math.random()*100));
                //     randomData.shift();
                //     date.push(len++);
                //     date.shift();
                //     myChart.setOption({
                //         xAxis: {
                //             data: date
                //         },
                //         series: [{
                //             data: randomData
                //         }]
                //     });
                // }, 2000)
            }
        }
    }
</script>

<style scoped>
    .onShare{
        padding:30px;
        color: #333;
    }
    .userShare{
        display: flex;
        align-items: center;
    }
    .user-vat{
        width: 35px;
        height: 35px;
        background: #000000;
        margin-right: 10px;
    }
    .user-fonts{
        font-size: 35px;
    }
    .timeShare{
        margin-top: 20px;
        font-size: 25px;
        color: #999;
        display: flex;
        align-items: center;
    }
    .timeShare .icon{
        width: 29px;
        height: 29px;
        margin-right: 10px;
    }
    .timeShare .icon img{
        width: 29px;
        height: 29px;
    }
    .dataResult{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
    .result-num{
        margin-top: 80px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: solid 6px #f1f1f1;
        text-align: center;

    }
    .result-num div{
        margin-top: 30px;
        font-size: 63px;
        color: #F76C93;
    }
    .result-num span{
        font-size: 38px;
        color: #ccc;
    }
    .result-type{
        display: flex;
        align-items: center;
        margin-top: 30px;
        font-size: 38px;
    }
    .result-type img{
        width: 40px;
        margin-right: 10px;
    }
    .heartLine{
        margin-top: 10px;
        width: 92vw;
        height: 30vh;
    }
</style>
