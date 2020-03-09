<template>
    <div class="count-container">
     <UserShare :msg="userInfo" />
        <div class="title">近7天</div>
        <div class="countDatas" v-if="sevenLength==0">
            <div style="text-align: center; line-height: 10vh; color: #bbb;">最近7天您还没有测量血压数据哦</div>
        </div>
        <div class="countDatas" v-else>
            <div class="countDatas-zong">
                <div>总测量次数 <span style="color: rgb(104,219,237);"> {{weekgradeArr?weekgradeArr:0}}</span></div>
                <div>异常次数 <span style="color: rgb(253,91,63);"> {{weekqueArr?weekqueArr:0}}</span></div>
            </div>
            <div id="sevenbar" :style="{'width':'100%','height':'220px'}"></div>
            <div class="maxandmin" v-if="unit=='kPa'">
                <div class="max">
                    <div class="max-title">最高值：</div>
                    <div class="max-time">{{weekMax.t?weekMax.t:'0000-00-00'}}</div>
                    <div class="max-value">
                        <div>{{(weekMax.s*0.133).toFixed(1)}}/{{(weekMax.d*0.133).toFixed(1)}} <span>{{unit}}</span> </div>
                        <div>{{weekMax.h?weekMax.h:0}} <span>bpm</span></div>
                    </div>
                </div>
                <div class="max">
                    <div class="max-title">最低值：</div>
                    <div class="max-time">{{weekMin.t?weekMin.t:"0000-00-00"}}</div>
                    <div class="max-value">
                        <div>{{(weekMin.s*0.133).toFixed(1)}}/{{(weekMin.d*0.133).toFixed(1)}} <span>{{unit}}</span></div>
                        <div>{{weekMin.h?weekMin.h:0}} <span>bpm</span></div>
                    </div>
                </div>
            </div>
            <div class="maxandmin" v-else>
                <div class="max">
                    <div class="max-title">最高值：</div>
                    <div class="max-time">{{weekMax.t?weekMax.t:'0000-00-00'}}</div>
                    <div class="max-value">
                        <div>{{weekMax.s?weekMax.s:0}}/{{weekMax.d?weekMax.d:0}} <span>{{unit}}</span> </div>
                        <div>{{weekMax.h?weekMax.h:0}} <span>bpm</span></div>
                    </div>
                </div>
                <div class="max">
                    <div class="max-title">最低值：</div>
                    <div class="max-time">{{weekMin.t?weekMin.t:"0000-00-00"}}</div>
                    <div class="max-value">
                        <div>{{weekMin.s?weekMin.s:0}}/{{weekMin.d?weekMin.d:0}} <span>{{unit}}</span></div>
                        <div>{{weekMin.h?weekMin.h:0}} <span>bpm</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title">近30天</div>
        <div class="countDatas">
            <div class="countDatas-zong">
                <div>总测量次数 <span style="color: rgb(104,219,237);"> {{monthgradeArr}}</span></div>
                <div>异常次数 <span style="color: rgb(253,91,63);"> {{monthqueArr}}</span></div>
            </div>
            <div id="monthbar" :style="{'width':'100%','height':'220px'}"></div>
            <div class="maxandmin" v-if="unit=='kPa'">
                <div class="max">
                    <div class="max-title">最高值：</div>
                    <div class="max-time">{{monthMax.t}}</div>
                    <div class="max-value">
                        <div>{{(monthMax.s*0.133).toFixed(1)}}/{{(monthMax.d*0.133).toFixed(1)}} <span>{{unit}}</span></div>
                        <div>{{monthMax.h}} <span>bpm</span></div>
                    </div>
                </div>
                <div class="max">
                    <div class="max-title">最低值：</div>
                    <div class="max-time">{{monthMin.t}}</div>
                    <div class="max-value">
                        <div>{{(monthMin.s*0.133).toFixed(1)}}/{{(monthMin.d*0.133).toFixed(1)}} <span>{{unit}}</span></div>
                        <div>{{monthMin.h}} <span>bpm</span></div>
                    </div>
                </div>
            </div>
            <div class="maxandmin" v-else>
                <div class="max">
                    <div class="max-title">最高值：</div>
                    <div class="max-time">{{monthMax.t}}</div>
                    <div class="max-value">
                        <div>{{monthMax.s}}/{{monthMax.d}} <span>{{unit}}</span></div>
                        <div>{{monthMax.h}} <span>bpm</span></div>
                    </div>
                </div>
                <div class="max">
                    <div class="max-title">最低值：</div>
                    <div class="max-time">{{monthMin.t}}</div>
                    <div class="max-value">
                        <div>{{monthMin.s}}/{{monthMin.d}} <span>{{unit}}</span></div>
                        <div>{{monthMin.h}} <span>bpm</span></div>
                    </div>
                </div>
            </div>
        </div>
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
  name: "count",
  components: {
    UserShare,
    ShareFooter
  },
  data() {
    return {
        userInfo:'',
        tonometerData:'',
        today: new Date().getDate() + 1,
        sevenLength:1,
        pieData:'',
        weekgradeArr:'',
        weekqueArr:'',
        monthgradeArr:'',
        monthqueArr:'',
        monthMax:'',
        monthMin:'',
        weekMax:'',
        weekMin:'',
        weekall:'',
        unit:'',
      nowyear: new Date().getFullYear(),
      nowmonth: new Date().getMonth() + 1,
    };
  },
  mounted() {
    this.userid = this.$route.query.user_id?this.$route.query.user_id:'669';//用户id
    this.typeid = this.$route.query.type_id?this.$route.query.type_id:'YBWS010000'; //设备型号
    this.deviceType = this.$route.query.tonometer_type?this.$route.query.tonometer_type:'0'; //设备类型
    this.unit = this.$route.query.unit?this.$route.query.unit:'mmHg';
    this.api(this.nowmonth,this.nowyear,this.userid,this.typeid,this.deviceType,this.unit);

  },
  methods: {
    api:function(month,year,userid,typeid,deviceType,unit){
      let url = 'http://device.ybhealth.com/index.php/api/device/tonometer/month_data?user_id='+ userid+'&type_id='+ typeid +'&month='+ month +'&year='+ year + '&tonometer_type='+ deviceType + '&unit=' + unit;
      //console.log(url)
        axios.get(url).then(res => {
          let allDatas = res.data.data;
          this.userInfo = allDatas.share_info;
          this.userInfo.devicename = '血压统计图';
            this.userInfo.sharename = this.$route.query.username?this.$route.query.username: allDatas.share_info.nickname;
            this.userInfo.sharepci = this.$route.query.userpci?this.$route.query.userpci: allDatas.share_info.avatar;
          //console.log(allDatas);
          let lastMonth = allDatas.tonometer_data.last_month;
          let currMonth = allDatas.tonometer_data.curr_month;
          // if(JSON.stringify(allDatas) == "{}"){
          //   return
          // }

          let allMonth = [];
          let lastMonthLength = Object.keys(lastMonth);
          let currMonthLength = Object.keys(currMonth)
          //console.log(lastMonthLength.length);  //3
          for(let i=1; i<=lastMonthLength.length; i++){
            allMonth.push(lastMonth[i])
          }
          for(let i=1; i<this.today; i++){
            allMonth.push(currMonth[i])
          }
          //合并两个月的数据
          //console.log(allMonth)
          //图表数据
          let sevenGradeArr = [];
          let sevenQu = [];
          let monthGradeArr = [];
          let monthQu = [];
          //数据
          let sevenAll = [];
          let monthAll = [];

          for(let i=0; i<allMonth.length; i++){
            //近7天
            if(i>allMonth.length - 7){
              if(allMonth[i].length!==0){
               // console.log(allMonth[i])
                for(let j=0; j<allMonth[i].length; j++){
                  let sevenDatas = {
                    s:allMonth[i][j].s_pressure ? allMonth[i][j].s_pressure :'暂无数据',
                    d:allMonth[i][j].d_pressure ? allMonth[i][j].d_pressure :'暂无数据',
                    t:allMonth[i][j].datetime ? allMonth[i][j].datetime :'暂无数据',
                    h:allMonth[i][j].heart_rate ? allMonth[i][j].heart_rate :'暂无数据',
                  }
                  sevenAll.push(sevenDatas)
                  sevenGradeArr.push(allMonth[i][j].grade)
                  if(allMonth[i][j].grade!=1){
                    sevenQu.push(allMonth[i][j].grade)
                  }
                }
              }
            }
            //近30天
            if(i>allMonth.length - 30){
              if(allMonth[i].length!==0){
                // console.log(allMonth[i])
                for(let j=0; j<allMonth[i].length; j++){
                  let monthDatas = {
                    s:allMonth[i][j].s_pressure?allMonth[i][j].s_pressure:"暂无数据",
                    d:allMonth[i][j].d_pressure?allMonth[i][j].d_pressure:"暂无数据",
                    t:allMonth[i][j].datetime?allMonth[i][j].datetime:"暂无数据",
                    h:allMonth[i][j].heart_rate?allMonth[i][j].heart_rate:"暂无数据"
                  }
                  monthAll.push(monthDatas)
                  monthGradeArr.push(allMonth[i][j].grade)
                  if(allMonth[i][j].grade!=1){
                    monthQu.push(allMonth[i][j].grade)
                  }
                }
              }
            }
          }
         // console.log(monthAll);
          let paixu = function(a,b){
            return a.s-b.s
          };
          //console.log(monthAll.sort(paixu))
           //let monthData = monthAll.sort(paixu);

            //月数据


            if(monthAll.length == 0){
                this.monthLength = 0
            }else if(monthAll.length==1){
                this.monthMax = monthAll[0]
                this.monthMax.t = this.monthMax.t.replace(/\-/g,"/");
                this.monthMax.t = until.formatTime(new Date(this.monthMax.t))
                this.monthMin = monthAll[0]
                this.monthgradeArr = monthGradeArr.length;
                this.monthqueArr = monthQu.length;
            }else{
                let  monthData = monthAll.sort(paixu)
                this.monthMax = monthData.pop();
                this.monthMax.t = this.monthMax.t.replace(/\-/g,"/");
                this.monthMax.t = until.formatTime(new Date(this.monthMax.t))
                this.monthMin = monthData.shift();
                this.monthMin.t = this.monthMin.t.replace(/\-/g,"/");
                this.monthMin.t = until.formatTime(new Date(this.monthMin.t))
                this.weekgradeArr = sevenGradeArr.length;
                this.weekqueArr = sevenQu.length;
            }

            // console.log(this.monthMax)
            // if(this.monthMax.lenght == 0){
            //     this.monthMax = 0
            // }else if(this.monthMax.lenght == 1){
            //     this.monthMin = monthData;
            //     this.monthMax = monthData;
            // }else{
            //     // this.monthMax = monthData.pop();
            //     // this.monthMax.t = this.monthMax.t.replace(/\-/g,"/");
            //     // //console.log(this.monthMax.t )
            //     // this.monthMax.t = until.formatTime(new Date(this.monthMax.t))
            //     // this.monthMin = monthData.shift();
            //     // this.monthMin.t = this.monthMin.t.replace(/\-/g,"/");
            //     // this.monthMin.t = until.formatTime(new Date(this.monthMin.t))
            // }

            //console.log(monthAll)
            //近7天

            if(sevenAll.length == 0){
                this.sevenLength = 0
            }else if(sevenAll.length==1){
                this.weekMax = sevenAll[0]
                this.weekMax.t = this.weekMax.t.replace(/\-/g,"/");
                this.weekMax.t = until.formatTime(new Date(this.weekMax.t))
                this.weekMin = sevenAll[0]
                this.weekgradeArr = sevenGradeArr.length;
                this.weekqueArr = sevenQu.length;
            }else{
                let  sevenData = sevenAll.sort(paixu)
                this.weekMax = sevenData.pop();
                this.weekMax.t = this.weekMax.t.replace(/\-/g,"/");
                this.weekMax.t = until.formatTime(new Date(this.weekMax.t))
                this.weekMin = sevenData.shift();
                this.weekMin.t = this.weekMin.t.replace(/\-/g,"/");
                this.weekMin.t = until.formatTime(new Date(this.weekMin.t))
                this.weekgradeArr = sevenGradeArr.length;
                this.weekqueArr = sevenQu.length;
            }
          // this.monthMax = monthAll.pop();
          // //console.log(this.monthMax)
          // this.monthMin = monthAll.shift();

          // this.monthgradeArr = monthGradeArr.length;
          // this.monthqueArr = monthQu.length
          // console.log(this.weekMax)
          this.drawPie(sevenGradeArr);
          this.drawPiee(monthGradeArr);
        })
      },
      drawPie:function(gradeArr){
          let myPie = echarts.init(document.getElementById("sevenbar"));
          myPie.setOption({
			  legend: {
				orient: 'vertical',
				right:'13%',
				top:'15%',
				icon: "circle",
				data: ['偏低','正常','正常高值','轻度','中度','重度']
			},
			color:['#7a98ec', '#82e3b3','#bae389','#ffd66d','#feb268','#f47a58'],
			  series : [{
					name: '血压、心率',
					type: 'pie',
					radius : '80%',
					center: ['30%', '50%'],
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '30',
								fontWeight: 'bold'
							}
						}
					},
					data:[
						{value:gradeArr.filter(function(a){return a==0}).length, name:'偏低',},
						{value:gradeArr.filter(function(a){return a==1}).length, name:'正常'},
						{value:gradeArr.filter(function(a){return a==2}).length, name:'正常高值'},
						{value:gradeArr.filter(function(a){return a==3}).length, name:'轻度'},
						{value:gradeArr.filter(function(a){return a==4}).length, name:'中度'},
						{value:gradeArr.filter(function(a){return a==5}).length, name:'重度'}
					]
				}
			]
		  })
      },

      drawPiee:function(gradeArr){
          let myPie = echarts.init(document.getElementById("monthbar"));
          myPie.setOption({
			  legend: {
				orient: 'vertical',
				right:'13%',
				top:'15%',
				icon: "circle",
				data: ['偏低','正常','正常高值','轻度','中度','重度']
			},
			color:['#7a98ec', '#82e3b3','#bae389','#ffd66d','#feb268','#f47a58'],
			  series : [{
					name: '血压、心率',
					type: 'pie',
					radius : '80%',
					center: ['30%', '50%'],
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '30',
								fontWeight: 'bold'
							}
						}
					},
					data:[
						{value:gradeArr.filter(function(a){return a==0}).length, name:'偏低',},
						{value:gradeArr.filter(function(a){return a==1}).length, name:'正常'},
						{value:gradeArr.filter(function(a){return a==2}).length, name:'正常高值'},
						{value:gradeArr.filter(function(a){return a==3}).length, name:'轻度'},
						{value:gradeArr.filter(function(a){return a==4}).length, name:'中度'},
						{value:gradeArr.filter(function(a){return a==5}).length, name:'重度'}
					]
				}
			]
		  })
      }
  }
};
</script>

<style scoped>
.count-container{
    color: #333333
}
    .title{
        background: #f5f5f5;
        padding: 0 15px;
        font-size: 32px;
        line-height: 80px;
    }
    .countDatas-zong{
        display: flex;
        flex-direction: row;
        padding: 20px 15px;
    }
    .countDatas-zong div{
        width: 100%;
        font-size: 28px;
    }
    .countDatas-zong div span{
        font-size: 50px;
    }
    .maxandmin{
        display: flex;
        flex-direction: row;
        padding: 10px 15px;
        border-top: solid 1px #ccc;
        line-height: 2;

    }
.maxandmin .max{
    width: 100%;
}
.maxandmin .max .max-title{
    font-size: 28px;
}
.max-time{
    font-size: 24px;
    color: rgb(153,153,153);
}
.max-value{
    width:90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size:28px;
}
.max-value span{
    font-size: 24px;
    color: rgb(153,153,153);
}
.max:last-child{
    border-left: solid 1px #ccc;
    padding-left: 20px;
}
</style>
