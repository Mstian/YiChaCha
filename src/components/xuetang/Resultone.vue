<template>
    <div class="resultone">
        <div class="shareinfo flexrow">
          <div class="touxiang"><img :src="userInfo.uservar" alt=""></div>
          <div class="fenxiang">{{userInfo.username}}给您分享了{{nums.mname}}血糖单次测量结果详情</div>
        </div>
        <div class="sharetime flexrow">
          <div class="shareicon"><img src="@/assets/img/time.png" alt=""></div>
          <div class="sharedate">{{userInfo.sharetime}}</div>
        </div>
        <div class="guide"><img :src="nums.guideimg" alt=""></div>
        <div class="guidenums flexrow">
            <div class="num"><span>{{nums.datas}}</span> mmol/L</div>
            <div class="tims">{{times[nums.times]}}</div>
        </div>
        <div class="tags" v-if="tags!=''">
            <div class="tags-item" v-for="(item,index) in tags" :key="index">{{item}}</div>
        </div>
        <div class="beizhu">
            {{nums.remarks}}
        </div>
      <div class="line"></div>
      <div class="cankao flexrow" @click="openWin()">
          <div class="left flexrow">
            <div class="icon"><img src="@/assets/img/celiangfenxi@2x.png" alt=""></div>
            <div class="fonts"><a href="http://device.ybhealth.com/index.php/api/device/glucose/page/info">测量分析参考</a></div>
          </div>
          <div class="right"><img src="@/assets/img/you.png" alt=""></div>
      </div>
      <div class="footer flexcol">
         <div class="footer-fonts">下载亿邦健康，开启只会健康新生活</div>
        <div class="foot-btns flexrow">
          <div class="left-btn"><img src="@/assets/img/download.png" alt="">即刻下载</div>
          <div class="right-btn"><img src="@/assets/img/cart.png" alt="">立即抢购</div>
        </div>
      </div>
    </div>
</template>

<script>
    import until from '../../common/until';
    export default {
        name: "Resultone",
      data() {
        return {
          userInfo: {
            uservar:"",
            username:'张三',
            sharetime: new Date().toLocaleString('chinese',{hour12:false}),
          },
          times:['凌晨','早餐前','早餐后','午餐前','午餐后','晚餐前','晚餐后','睡前'],
          nums:{
            guide:'3',
            datas:'5.0',
            time:'1',
            guideimg:require('../../assets/img/zhengchang@2x.png')
          },
        }
      },
      mounted() {

          this.userInfo.uservar = this.$route.query.userpci?unescape(this.$route.query.userpci):'http://device.ybhealth.com/static/avatar/nvshengtouxiang@2x.png';
          this.userInfo.username = this.$route.query.username?this.$route.query.username:"张三";
          let sharetime = this.$route.query.time?this.$route.query.time:"2019-09-03 12:58:13";
          sharetime = sharetime.replace(/\-/g, "/");
          let timeDate = new Date(sharetime);
          this.userInfo.sharetime = until.formatTime(timeDate);
          this.nums.guide = this.$route.query.guide ? this.$route.query.guide : 3;
          this.nums.times = this.$route.query.times?this.$route.query.times:1;
          this.nums.mname = this.$route.query.mname?this.$route.query.mname:"zhangsan";
          let a = this.$route.query.datas?this.$route.query.datas:60;
          this.nums.remarks = this.$route.query.remarks?this.$route.query.remarks:'';
          let tags = this.$route.query.tags?this.$route.query.tags:'';
          let tagsArr = tags.split(',');
          console.log(tagsArr)
          this.tags = tagsArr;
          this.nums.datas = parseFloat(a/10).toFixed(1);
          switch (this.nums.guide) {
            case "0":
              this.nums.guideimg = require('../../assets/img/jidi@2x.png');
              break;
            case "1":
              this.nums.guideimg = require('../../assets/img/dixuetang@2x.png');
              break;
            case "2":
              this.nums.guideimg = require('../../assets/img/piandi@2x.png');
              break;
            case "3":
              this.nums.guideimg = require('../../assets/img/zhengchang@2x.png');
              break;
            case "4":
              this.nums.guideimg = require('../../assets/img/piangao@2x.png');
              break;
            case "5":
              this.nums.guideimg = require('../../assets/img/guogao@2x.png');
              break;
            case "6":
              this.nums.guideimg = require('../../assets/img/jigao@2x.png');
              break;
          }
      },
      methods:{
          openWin:function(){
              window.location.href="http://device.ybhealth.com/index.php/api/device/glucose/page/info"
          }
      }
    }
</script>

<style scoped>
    .resultone{
        background: #fff;
    }
    .beizhu{
        width: 92vw;
        height: 30vw;
        background: #f9f9f9;
        border: solid 1px #eeeeee;
        margin: 3vw 4vw;
        border-radius: 10px;
        color: #666;
        line-height: 2;
        font-size: 24px;
        text-indent: 1em;
        overflow-y: scroll;
    }
  .flexrow{
    display: flex;
    flex-direction: row;
  }
  .flexcol{
    display: flex;
    flex-direction: column;
  }
  .shareinfo{
    padding: 20px;
    align-items: center;
  }
  .touxiang img{
    width:45px;
    height: 45px;
    margin-right:10px;
  }
  .fenxiang{
    font-size: 32px;
    line-height: 32px;
  }
  .sharetime{
    padding: 0 20px;
    font-size: 24px;
    line-height: 24px;
    justify-content: flex-start;
    align-items: flex-start;
    color: #999;
  }
  .shareicon img{
    width: 22px;
    height: 24px;
    margin-right: 10px;
  }
  .guide{
    display: flex;
    justify-content: center;
  }
  .guide img{
    margin-top: 50px;
    width: 400px;
    height: 400px;
  }
  .guidenums{
    margin: 50px 30px;
    border: solid 1px #eeeeee;
    border-radius: 10px;
    line-height: 140px;
    justify-content: space-between;
    padding: 0 50px;
    font-size: 40px;
    color: #666;
  }
  .guidenums span{
    font-size: 60px;
    color: #333;
  }
  .cankao{
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 20px 30px ;
    border-bottom: solid 1px #eee;
  }
  .cankao .left{
    align-items: center;
    font-size: 28px;
    color: #666;
  }
  .cankao .left a{
    font-size: 32px;
    color: #666;
    text-decoration: none;
  }
  .cankao .left img{
    width: 26px;
    padding-top: 15px;
    margin-right: 10px;
  }
  .cankao .right img{
    width: 17px;
  }
    .tags{
        display: flex;
        padding: 0 30px;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .tags-item{
        margin-bottom: 20px;
        margin-right: 3vw;
        width: 20vw;
        height: 8vw;
        line-height: 8vw;
        color: #fff;
        background: #68dbed;
        border-radius: 40px;
        text-align: center;
    }
  .line{
    background: #f2f2f2;
    height: 10px;
  }
  .footer{
    font-size: 32px;
    align-items: center;
    padding: 50px 0;
  }
  .foot-btns{
    margin-top: 50px;
    justify-content: space-between;
  }
  .foot-btns div{
    margin: 0 20px;
    border: solid 1px #cccccc;
    width: 266px;
    height: 76px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #999;
  }
  .foot-btns div img{
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
</style>
