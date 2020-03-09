<template>
    <div class="Yiyuan" :style="{'height': $store.state.overH}">
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
            <div class="docimg"><img :src="info.image ? info.image :require('../../assets/chacha/154.jpg')" alt=""></div>
            <div class="docinfo">
                <div>
                    <span class="docname">{{info.doctorname}}</span>
                    <span>{{info.jslevel}}</span>
                </div>
                <div>{{info.hname}}</div>
            </div>
        </div>
        <div class="content-all">
            <div class="ctitle">擅长方向</div>
            <div class="content" v-html="info.goodat">
            </div>
        </div>
        <div class="content-all">
            <div class="ctitle">个人简介</div>
            <div class="content" v-html="info.summary">
            </div>
        </div>
  <lookmore/>
    </div>
</template>

<script>
    import Host from '../../common/host.config.js';
    import axios from 'axios';
    export default {
        name: "Yisheng",
        data() {
            return {
                info: ""
            }
        },
        mounted(){
            let sid = this.$route.query.id?this.$route.query.id:96;
            this.getContents(sid);
        },
        methods: {
            getContents:function(sid){
                const cUrl = Host.config.chacha;
                let url = cUrl + "doctor_info/doctorid/" + sid;
                axios.get(url).then(res=>{
                    console.log(res.data.result);
                    this.info = res.data.result;
                    let summary = res.data.result.summary
                    this.info.summary = summary.replace(/(<\/?a.*?>)|(<\/?span.*?>)/g, '');
                    console.log(this.info.summary)
                })
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
        overflow: hidden;
        position: relative
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
        flex-direction: row;
        align-items: center;
        line-height: 2;
        padding: 30px;

    }
    .docimg{
        width: 140px;
        height: 140px;
        background: #999999;
        margin-right: 30px;
    }
    .docimg img{
        width: 100%;
        height: 100%;
    }
    .docinfo{
        font-size: 30px;
    }
    .docname{
        font-family: pingfangblod;
        font-size: 34px;
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
