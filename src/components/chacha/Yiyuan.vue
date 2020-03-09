<template>
    <div class="Yiyuan">
        <div class="public-header">
            <div class="head-item">
                <img src="@/assets/chacha/logo.png" alt="">
                <div class="item-font"></div>
            </div>
<!--            <div class="head-item" @click="openApp(appUrl,downLoad)">-->
            <div class="head-item" @click="openApp()">
                <span>打开</span>
            </div>
        </div>
        <div class="container">
            <div class="title">{{info.hname}}</div>
            <div class="stitle">({{info.hospitallevel}}) (综合医院)</div>
            <div class="count">{{info.depart_count}} 个科室 | {{info.doctor_count}} 名医生</div>
        </div>
        <div class="content-all">
            <div class="ctitle">医院简介</div>
            <div class="content" v-html="info.summary" :style="{'height': $store.state.overH}">
                简介：创建于1949年2月的北京市公安医院，隶属于北京市公安局，并按受北京市卫生局的业务指导，是一所集医、教、研为一体的三级综合医院。
            </div>
              <lookmore/>
        </div>
        <div class="tel">
            <div class="tel-font">电话：<a :href="'tel:' + info.phonenumber">{{info.phonenumber}}</a></div>
            <div class="tel-icon"><a :href="'tel:' + info.phonenumber"><img src="@/assets/chacha/dianhua@2x.png" alt=""></a></div>
        </div>
        <div class="address" @click="openMapApp()">
            <div class="address-font">地址：{{info.address}}</div>
            <div class="map" id="baiduMap"></div>
        </div>
        <div class="openAppBg" v-show="isshow">
            <div class="selectApp">
                <div v-for="(item,index) in mapApps" :key="index" @click="selectApp(index)">{{item}}</div>
            </div>
            <div class="close" @click="openMapApp()">取消</div>
        </div>
    </div>
</template>

<script>
    import Host from '../../common/host.config.js';
    import until from '../../common/until.js';
    import axios from 'axios'
    export default {
        name: "Yiyuan",
        data() {
            return {
                info: "",
                isshow:false,
                systype:until.systemType(),
                mapApps:['高德地图','百度地图','腾讯地图'],
                appUrl:Host.config.openIosAppUrl,
                downLoad:Host.config.downLoadUrl,
            }
        },
        mounted(){
            let sid = this.$route.query.id?this.$route.query.id:180;
            this.getContents(sid);
            console.log(until.formatTime(new Date()))
            if(this.systype == 'ios'){
                this.mapApps = ['苹果地图','高德地图','百度地图','腾讯地图']
            }else{
                this.mapApps = ['高德地图','百度地图','腾讯地图']
            }
        },
        methods: {
            getContents:function(sid){
                const cUrl = Host.config.chacha;
                let url = cUrl + 'hospital_info/hid/' + sid
                axios.get(url).then(res=>{
                    console.log(res.data.result);
                    this.info = res.data.result;
                    let address = res.data.result.address;
                    let summary = res.data.result.summary
                    this.info.summary = summary.replace(/(<\/?a.*?>)|(<\/?span.*?>)/g, '');
                    console.log(this.info.summary)
                    this.baiduMap(address);
                })
            },
            baiduMap:function(address){
                const map = new BMap.Map("baiduMap");
                const point = new BMap.Point(116.404, 39.915);
                map.centerAndZoom(point, 16);
                // 创建地址解析器实例
                let myGeo = new BMap.Geocoder();
                myGeo.getPoint(address, function(point){
                    if (point) {
                        map.centerAndZoom(point, 16);
                        map.addOverlay(new BMap.Marker(point));
                    }else{
                        alert("您选择地址没有解析到结果!");
                    }
                });
            },

            openMapApp:function(){
                this.isshow = !this.isshow
            },
            selectApp:function(index){
                if(this.systype == 'ios'){
                    if(index==0){
                        console.log('苹果地图')
                    }else if(index==1){
                        console.log('高德地图')
                    }else if(index==2){
                        console.log('百度地图')

                    }else{
                        console.log('腾讯地图')
                    }
                }else{
                    if(index==0){
                        console.log('高德地图')
                    }else if(index==1){
                        console.log('百度地图')
                    }else{
                        console.log('腾讯地图')
                    }
                }
            },
            openApp:function(){
                window.location.href='http://device.ybhealth.com/download/index.html'
            }
        }
    }
</script>

<style scoped>
    .Yiyuan{
        background: #ffffff;
        color: #333333;
    }
    .public-header{
        padding:  0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 3px 7px  rgba(119,119,119,.35);
        height: 100px;
        position: fixed;
        top: 0;
        left: 0;
        width:690px;
        background: #fff;
        z-index: 999;
    }
    .head-item{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .head-item img{
        /* width: 120px; */
        height: 74px;
        margin-right: 13px;
    }
    .head-item span{
        display: block;
        width: 156px;
        height: 56px;
        background: #68dbed;
        border-radius: 28px;
        text-align: center;
        line-height: 56px;
        color: #fff;
        font-size: 28px;

    }
    .container{
        margin-top: 130px;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 2;
    }
    .title{
        font-size: 40px;
        font-family: pingfangblod;
    }
    .stitle{
        font-size: 24px;
    }
    .count{
        font-size: 28px;
    }
    .content-all{
        padding: 0 30px;
        position: relative
    }
    .ctitle{
        margin-top: 71px;
        font-family: pingfangblod;
        display: flex;
        align-items: center;
        font-size: 34px;
    }
    .borderLeft{
        border-left: solid 6px #68dbed;
        height: 30px;
        padding-left: 20px;
    }
    .content{
        margin-top: 20px;
        font-size: 30px;
        line-height: 1.5;
        border-bottom: solid 1px #eeeeee;
        padding-bottom:30px ;
        overflow: hidden;
    }
    .tel{
        padding-bottom:30px ;
        font-size: 30px;
        margin: 30px 30px 10px 30px;
        border-bottom: solid 1px #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tel a{
        color: #333333;
    }
    .tel .tel-icon img{
        width: 30px;
        height: 30px;
    }
    .address{
        padding: 30px;
        font-size: 30px;
    }
    .map{
        margin-top: 20px;
        width: 100%;
        height: 240px;
    }
    .openAppBg{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.6);
        color: #68DBED;
    }
    .selectApp{
        position: absolute;
        bottom: 110px;
        background: #fefefe;
        width: 96vw;
        margin: 2vw;
        border-radius: 30px;
    }
    .close{
        position: absolute;
        bottom: 0px;
        background: #fefefe;
        width: 96vw;
        margin: 2vw;
        border-radius: 30px;
        text-align: center;
        line-height: 100px;
    }
    .selectApp div{
        width: 100%;
        text-align: center;
        line-height: 100px;
        border-bottom: solid 1px #cccccc;
    }
    .selectApp div:last-child{
        border-bottom: none;
    }
</style>
