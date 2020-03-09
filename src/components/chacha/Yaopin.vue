<template>
    <div class="Yiyuan">
        <div class="public-header">
            <div class="head-item">
                <img src="@/assets/chacha/logo.png" alt="">
                <div class="item-font"></div>
            </div>
            <div class="head-item" @click="openApp()">
                <span>打开</span>
            </div>
        </div>
        <div class="container">
            <div class="title">{{info.drugsname}}</div>
        </div>
        <div class="content-all">
            <div class="ctitle">药品简介</div>
            <div class="content" :style="{'height': $store.state.overH}" v-html="info.drugsdetailall">
            </div>
            <lookmore/>
            <!-- <div class="more" v-show="isshow"><div class="more-btn"  @click="clickHeightAuto()">点击查看详情</div></div> -->
        </div>
        <div class="content-all">
            <div class="ctitle">相关症状</div>
            <div class="content" v-html="info.summary">
            </div>
        </div>
      
    </div>
</template>

<script>

    import Host from '../../common/host.config.js';
    import axios from 'axios';
    export default {
        name: "Yaopin",
        data() {
            return {
                info: "",
                height:'',
                isshow:true,
            }
        },
        mounted(){
            let sid = this.$route.query.id?this.$route.query.id:110;
            this.getContents(sid);
        },
        methods: {
            getContents:function(sid){
                const cUrl = Host.config.chacha;
                let url = cUrl + "drugs_detail/drugsid/"+ sid;
                axios.get(url).then(res=>{
                    console.log(res.data.result);
                    this.info = res.data.result;
                    let summary = res.data.result.summary;
                    let drugsdetailall = res.data.result.drugsdetailall;
                    this.info.summary = summary.replace(/(<\/?a.*?>)|(<\/?span.*?>)/g, '');
                    this.info.drugsdetailall = drugsdetailall.replace(/(<\/?a.*?>)|(<\/?span.*?>)/g, '');
                    console.log(this.info.summary)
                })
            },
            clickHeightAuto:function(){
                this.height = 'auto'
                this.isshow = false
            },
            openApp:function(){
                window.location.href='http://device.ybhealth.com/download/index.html'
            }
        },
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
         /* width: 130px; */
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
        position: relative;
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
        padding-bottom:30px ;
        height: 490px;
        overflow: hidden;
    }
    .more{
        position: absolute;
        width: 100%;
        height: 100px;
        text-align: center;
        background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,1));
        left: 0;
        bottom: 0;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    .more-btn{
        background: #68dbed;
        color: #fff;
        width: 300px;
        border-radius: 50px;
        line-height: 60px;
        font-size: 24px;
        letter-spacing: 1px;
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
    .tel .tel-icon{
        width: 30px;
        height: 30px;
        background: #68dbed;
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
</style>
