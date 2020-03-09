<template>
  <div class="line-container">
   <UserShare :msg="userInfo" />
    <div class="days">
      <div
        :class="[{'cur':daystatus==index},'days-item']"
        @click="selectDays(index)"
        v-for="(item,index) in days"
        :key="index"
      >{{item}}</div>
    </div>
    <div class="lastnums">
      <div class="lastnums-time">测量时间：{{lastData.datetime}}</div>
      <div class="lastnums-container">
        <div class="lastnums-item">
          <img v-if="lastData.grade == 0" src="@/assets/img/piandi@2x.png" alt>
          <img v-else-if="lastData.grade == 1" src="../../assets/img/zhengchang@2x.png" alt>
          <img v-else-if="lastData.grade == 2" src="../../assets/img/zhengchanggaozhi@2x.png" alt>
          <img v-else-if="lastData.grade == 3" src="../../assets/img/qingdu@2x.png" alt>
          <img v-else-if="lastData.grade == 4" src="../../assets/img/zhongdu@2x.png" alt>
          <img v-else-if="lastData.grade == 5" src="../../assets/img/zhongdu_2@2x.png" alt>
            <img v-else src="" alt="">
        </div>
        <div class="lastnums-item">
            <div class="number" v-if="unit=='mmHg'">{{lastData.s_pressure}}</div>
            <div class="number" v-else>{{(lastData.s_pressure*0.133).toFixed(1)}}</div>
            <div class="number-danwei">{{unit}}</div>
            <div class="number-type">收缩压</div>
        </div>
        <div class="lastnums-item">
            <div class="number" v-if="unit=='mmHg'">{{lastData.d_pressure}}</div>
            <div class="number" v-else>{{(lastData.d_pressure*0.133).toFixed(1)}}</div>
          <div class="number-danwei">{{unit}}</div>
          <div class="number-type">舒张压</div>
        </div>
        <div class="lastnums-item">
          <div class="number">{{lastData.heart_rate}}</div>
          <div class="number-danwei">bpm</div>
          <div class="number-type">心率</div>
        </div>
      </div>
    </div>
    <div id="linechart" class="linechart"></div>
   <ShareFooter :msg="userInfo" />
  </div>
</template>

<script>
  import UserShare from '@/components/common/UserShare.vue';
  import ShareFooter from '@/components/common/ShareFooter.vue';
  import until from '../../common/until'
  import axios from 'axios'
  let echarts = require('echarts')
export default {
  components: {
    UserShare,
    ShareFooter
  },
  data() {
    return {
      userInfo:'',
        chartWidth:window.screen.width,
      days: ["1天", "7天", "14天", "30天"],
      daystatus: 3,
      start:0,
      shareInfo:'',
      tonometerData:'',
      today: new Date().getDate() + 1,
      lastData:'',
      allArr:'',
      nowyear: new Date().getFullYear(),
      nowmonth: new Date().getMonth() + 1,
      startTime:'',
      unit:''
    };
  },
  mounted() {
    this.userid = this.$route.query.user_id?this.$route.query.user_id:'669';//用户id
    this.typeid = this.$route.query.type_id?this.$route.query.type_id:'YBWS010000'; //设备型号
    this.deviceType = this.$route.query.tonometer_type?this.$route.query.tonometer_type:'0'; //设备类型
    this.unit = this.$route.query.unit?this.$route.query.unit:'mmHg';
    console.log(this.userid)
    this.api(this.nowmonth,this.nowyear,this.userid,this.typeid,this.deviceType,this.unit);
  },
  methods: {
    selectDays: function(index) {
      let date = new Date();
      let dayone = new Date(date.getTime() - 24*60*60*1000);
      let daytwo = new Date(date.getTime() - 24*60*60*1000*7);
      let daythree = new Date(date.getTime() - 24*60*60*1000*14);
      let dayfour = new Date(date.getTime() - 24*60*60*1000*30);
      if(index==0){
          this.daystatus = index;
          this.lineCharts(this.allArr,dayone);
      }
      if(index==1){
          this.daystatus = index;
          this.lineCharts(this.allArr,daytwo);
      }
      if(index==2){
          this.daystatus = index;
          this.lineCharts(this.allArr,daythree);
      }
      if(index==3){
          this.daystatus = index;
          this.lineCharts(this.allArr,dayfour);
      }

    },
    api:function(month,year,userid,typeid,deviceType,unit){
      let url = 'http://device.ybhealth.com/index.php/api/device/tonometer/month_data?user_id='+ userid+'&type_id='+ typeid +'&month='+ month +'&year='+ year + '&tonometer_type='+ deviceType + '&unit=' + unit;
      console.log(url)
        axios.get(url).then(res => {

        let allDatas = res.data.data;
        this.userInfo = allDatas.share_info;
        this.userInfo.devicename = '血压折线图';
            this.userInfo.sharename = this.$route.query.username?this.$route.query.username: allDatas.share_info.nickname;
            this.userInfo.sharepci = this.$route.query.userpci?this.$route.query.userpci: allDatas.share_info.avatar;
        this.startTime = res.data.data.start_data;
        // if(JSON.stringify(allDatas) == "{}"){
        //   return
        // }
        let lastMonth = allDatas.tonometer_data.last_month;
        let currMonth = allDatas.tonometer_data.curr_month;
        let allMonth = [];
        let lastMonthLength = Object.keys(lastMonth);
        let currMonthLength = Object.keys(currMonth)
        console.log(lastMonthLength.length);  //3
        for(let i=1; i<=lastMonthLength.length; i++){
          allMonth.push(lastMonth[i])
        }
        for(let i=1; i<this.today; i++){
          allMonth.push(currMonth[i])
        }
        //合并两个月的数据
        console.log(allMonth)

        // this.shareInfo = allDatas.share_info
        // this.tonometerData = allDatas.tonometer_data
        let a = [];
        let s = ['2019-06-01',0];
        let d = ['2019-06-01',0];
        let h = ['2019-06-01',0];
        for(let i=0; i< allMonth.length; i++){
          if(allMonth[i].length > 0){
            for(let j=0; j<allMonth[i].length; j++){
              a.push(allMonth[i][j])
                if(this.unit=="mmHg"){
                    s.push([allMonth[i][j].datetime,allMonth[i][j].s_pressure])
                    d.push([allMonth[i][j].datetime,allMonth[i][j].d_pressure])
                    h.push([allMonth[i][j].datetime,allMonth[i][j].heart_rate])
                }else{
                    s.push([allMonth[i][j].datetime,(allMonth[i][j].s_pressure*0.133).toFixed(1)])
                    d.push([allMonth[i][j].datetime,(allMonth[i][j].d_pressure*0.133).toFixed(1)])
                    h.push([allMonth[i][j].datetime,allMonth[i][j].heart_rate])
                }

            }
          }
        }
        let allArr = {
          s:s,
          d:d,
          h:h
        }
        console.log(a);
        this.lastData = a.pop();
          this.lastData.datetime = this.lastData.datetime.replace(/\-/g,"/");
          this.lastData.datetime = until.formatTime(new Date(this.lastData.datetime))
        this.allArr = allArr;
        this.lineCharts(allArr, this.startTime);
      });
    },
    lineCharts: function(allArr,start) {
      let myChart = echarts.init(document.getElementById("linechart"));
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["收缩压", "舒张压", "心率"],
          left: "10%",
          top: 18
        },
        xAxis: {
          type:'time',
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#cccccc"],
              type: "dotted"
            }
          },
          lineStyle: {
            color: "#cccccc"
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#cccccc"],
              type: "dotted"
            }
          },
          lineStyle: {
            color: "#cccccc"
          }
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            filterMode: "empty",
            startValue:start,
            show: false
          },
          {
            type: "inside",
            xAxisIndex: 0,
            startValue:start,
            filterMode: "empty"
          }
        ],
        series: [
          {
            name: "收缩压",
            type: "line",
            symbol: "circle", //折线点设置为实心点
            symbolSize: 6, //折线点的大小
            data: allArr.s,
            lineStyle:{
              color:'#06b2ff'
            },
            itemStyle:{
              color:'#06b2ff'
            }
          },
          {
            name: "舒张压",
            type: "line",
            symbol: "circle", //折线点设置为实心点
            symbolSize: 8, //折线点的大小
            data: allArr.d,
            lineStyle:{
              color:'#34dbdc'
            },
            itemStyle:{
              color:'#34dbdc'
            }
          },
          {
            name: "心率",
            type: "line",
            symbol: "circle", //折线点设置为实心点
            symbolSize: 8, //折线点的大小
            data: allArr.h,
            lineStyle:{
              color:'#ec4b55'
            },
            itemStyle:{
              color:'#ec4b55'
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.line-container {
    width: 94vw;
    padding: 3vw;
    overflow: hidden;
}
    .linechart{
        width:101vw;
        height:600px;
        font-size:26px
    }
  .days {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: solid 1px #68dbed;
    border-radius: 10px;
    overflow: hidden;

  }
.days .days-item {
    width: 100%;
    height: 60px;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
    color: #999999;
    border-right: solid 1px #68dbed;
}
.days .days-item:last-child {
    border: none;
}
.days .cur {
    background: #68dbed;
    color: #fff;
}
  .lastnums {
    margin-top: 20px;
    border: solid 1px #eeeeee;
    border-radius: 10px;
    padding: 20px;
  }
.lastnums .lastnums-time {
    font-size: 20px;
    color: #999999;
}
.lastnums .lastnums-container {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.lastnums-item {
    width: 100%;
    text-align: center;
}
.number{
    font-size: 50px;
    color: rgb(104, 219, 239)
}
.number-danwei{
    font-size:24px;
    color: rgb(153, 153, 153)
}
.number-type{
    font-size:26px;
    color: rgb(51, 51, 51)
}
.lastnums-item img {
    width: 150px;
    height: 150px;
}
</style>
