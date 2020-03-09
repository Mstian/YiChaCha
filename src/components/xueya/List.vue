<template>
  <div class="list-container">
   <UserShare :msg="userInfo" />
    <div class="list-years">
      <div>
        <img src="../../assets/img/zuo.png" @click="yearMin()">
      </div>
      <div>{{nowyear}}</div>
      <div>
        <img src="../../assets/img/you.png" @click="yearPlus()">
      </div>
    </div>
    <div class="list-months">
      <div >
        <div class="list-months-line" @click="getStatuss()">
          <div class="list-mon-qujian">
            <div>{{nowmonth}}月</div>
            <div class="fontColor999">1-{{today}}日</div>
          </div>
          <div class="list-mon-con">
            <div>
              <div>测量次数：<span style="color: #68dbed;">{{tonometerData.length}}</span>次</div>
              <div>异常次数：<span style="color: #fd5b3f;">{{quesDatas}}</span>次</div>
            </div>
            <div>
              <img src="../../assets/img/xiala@2x.png" style="width: 0.3vw;">
            </div>
          </div>
        </div>
        <div v-show="statuss" v-for="(item,index) in tonometerData" :key="index">
          <div>
            <div class="list-mon-dayscount">
              <div>
                {{item.datetime.substring(8,10)}}日
                <br>{{item.datetime.substring(11,16)}}
              </div>
              <div class="dayscountnums" v-if="unit=='mmHg'">
                <div v-if="item.grade!=1"><span style="color: #fd5b3f; font-size: 4.8vw;">{{item.s_pressure}}/{{item.d_pressure}}</span> {{unit}}</div>
                <div v-else><span class="numColorone">{{item.s_pressure}}/{{item.d_pressure}}</span> {{unit}}</div>
                <div>
                  <span class="numColor">{{item.heart_rate}}</span> bmp
                </div>
              </div>
                <div class="dayscountnums" v-else>
                    <div v-if="item.grade!=1"><span style="color: #fd5b3f; font-size: 4.8vw;">{{(item.s_pressure*0.133).toFixed(1)}}/{{(item.d_pressure*0.133).toFixed(1)}}</span> {{unit}}</div>
                    <div v-else><span class="numColorone">{{(item.s_pressure*0.133).toFixed(1)}}/{{(item.d_pressure*0.133).toFixed(1)}}</span> {{unit}}</div>
                    <div>
                        <span class="numColor">{{item.heart_rate}}</span> bmp
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 全局提示框 -->
      <div v-show="visible" class="tips">
          <div>{{message}}</div>
      </div>
<!--       <ShareFooter :msg="userInfo" />-->
  </div>
</template>

<script>
  import UserShare from '@/components/common/UserShare.vue';
  import ShareFooter from '@/components/common/ShareFooter.vue';
  import axios from 'axios'
export default {
  name: "list",
  components: {
    UserShare,
    ShareFooter
  },
  data() {
    return {
      userid:'',
      typeid:'',
      msg:'',
      userInfo:'',
      visible:false,
      message:'无任何数据',
	    status:0,
      statuss: false,
      nowyear: new Date().getFullYear(),
      nowmonth: new Date().getMonth() + 1,
      today: new Date().getDate(),
      tonometerData:'',
      quesDatas:'',
      deviceType:'',
      unit:''
    };
  },
  mounted(){

     this.userid = this.$route.query.user_id?this.$route.query.user_id:'478';//用户id
     this.typeid = this.$route.query.type_id?this.$route.query.type_id:'YBBS010000'; //设备型号
     this.deviceType = this.$route.query.tonometer_type?this.$route.query.tonometer_type:'1'; //设备类型
     this.unit = this.$route.query.unit?this.$route.query.unit:'mmHg';
     console.log(this.userid)
     this.api(this.nowmonth,this.nowyear,this.userid,this.typeid,this.deviceType,this.unit);
  },
  methods: {
    getStatuss: function() {
  	  this.statuss = !this.statuss;
    },
    yearMin:function(){
      let _this = this
      var year = _this.nowyear;
      year --;
      _this.api(_this.nowmonth,year,_this.userid,_this.typeid)
      if(_this.msg==0){
        _this.message = '此前无任何数据'
        _this.visible = true;
        setTimeout(function () {
          _this.visible = false;
        }, 1500)

      }
    },
    yearPlus:function(){
      let _this = this
      var year = _this.nowyear;
      year ++;
      _this.api(_this.nowmonth,year,_this.userid,_this.typeid)
      if(_this.msg==0){
        _this.message = '此后无任何数据'
        _this.visible = true;
        setTimeout(function () {
          _this.visible = false;
        }, 1500)

      }
    },

    api:function(month,year,userid,typeid,deviceType,unit){
      let url = 'http://device.ybhealth.com/index.php/api/device/tonometer/month_data?user_id='+ userid+'&type_id='+ typeid +'&month='+ month +'&year='+ year + '&tonometer_type='+ deviceType + '&unit=' + unit;
      console.log(url)
        axios.get(url).then((res)=>{
        console.log(res)
        let allDatas = res.data.data;

        this.userInfo = allDatas.share_info;
        this.userInfo.devicename = '';
        console.log(allDatas);
        this.startTime = res.data.data.start_data;
        // if(JSON.stringify(allDatas) == "{}"){
        //   return
        // }
        let lastMonth = allDatas.tonometer_data.last_month;
        let currMonth = allDatas.tonometer_data.curr_month;
        // console.log("curr"+ currMonth)
        let allMonth = [];
        let lastMonthLength = Object.keys(lastMonth);
        let currMonthLength = Object.keys(currMonth)
        // console.log(lastMonthLength.length);  //3
        for(let i=1; i<=lastMonthLength.length; i++){
          allMonth.push(lastMonth[i])
        }
        for(let i=1; i<= this.today; i++){
          allMonth.push(currMonth[i])
        }
        //合并两个月的数据
        // console.log("----"+ allMonth)
        let allDatass = []
        let quesDatas = []
        for(let i=0; i< allMonth.length; i++){
          if(allMonth[i].length > 0){
            for(let j=0; j<allMonth[i].length; j++){
              console.log(allMonth[i][j])
              allDatass.push(allMonth[i][j])
              quesDatas.push(allMonth[i][j].grade)
            }
          }
        }
        console.log(quesDatas)
        this.tonometerData = allDatass.reverse()
        this.quesDatas = quesDatas.filter(function(a){return a!==1}).length
      })
    }
  }
};
</script>

<style scoped>
.list-years{
	line-height: 100px;
	font-size: 36px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	border-bottom: solid 1px #eeeeee;
	padding: 0 20px;
	align-items: center;
}
.list-years img{
	width: 20px;
}
.list-months-line{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 120px;
	border-bottom: solid 1px #eeeeee;
	padding: 0 20px;
	align-items: center;
}
.list-mon-qujian div:first-child{
	font-size: 36px;
}

.fontColor999{
	color: #999999;
	font-size: 30px
}
.list-mon-con{
	display: flex;
	flex-direction: row;
	font-size: 30px;
	align-items: center;
	color: #999999;
}
.list-mon-con div{
	margin-left: 10px;
}
.list-mon-dayscount{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: #f5f5f5;
	height: 120px;
	align-items: center;
	padding: 0 20px;
	font-size: 28px;
	border-bottom: solid 1px #cccccc;
	color: #999999;
}
.dayscountnums{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 60%;
	font-size: 26px;
}
.numColorone{
  color: #68dbed;
  font-size: 36px;
}
.numColor{
	color: #68dbed;
	font-size: 36px;
}
.tips{
  position: fixed;
  left: 40%;
  top: 20%;
  padding: 5px 8px;
  background: rgba(0,0,0,0.5);
  color: #fff;
}

</style>
