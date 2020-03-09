<template>
    <div class="headLine">
        <div class="public-header">
            <div class="head-item">
                <img src="@/assets/chacha/logo.png" alt="">
                <div class="item-font">亿邦健康</div>
            </div>
            <div class="head-item">
                <span>打开</span>
            </div>
        </div>
        <div class="video" v-show="articleInfo.video!=null&&articleInfo.video!=''">
            <video :src="articleInfo.video" controls="controls" ></video>
        </div>
        <div class="title">{{articleInfo.title}}</div>
        <div class="author">
            <div class="item">
                <div class="avatar"><img :src="articleInfo.userImg" alt=""></div>
                <div>
                    <div class="author-name">{{articleInfo.userUsername}}</div>
                    <div class="utime">{{articleInfo.update_time}}</div>
                </div>

            </div>
        </div>
        <div class="content-all" v-show="articleInfo.content!=null&&articleInfo.content!=''">
            <div class="content" v-html="articleInfo.content"></div>
            <div class="conBottom botBtn tohide" v-show="articleInfo.content!=null">
                <div class="touming" @click="closeBtn()"></div>
                <div class="xiala" @click="closeBtn()"><img src="@/assets/zixun_xiala.png" alt=""></div>
            </div>
            <div class="botopen tohide" v-show="articleInfo.content!=null">
                <div class="openApp">打开app阅读全文</div>
            </div>
        </div>
        <div class="arclist" v-show="articleInfo.content!=null&&articleInfo.content!=''">
            <div class="arlist_title">热门推荐</div>
            <div class="arlist_box">
                <div class="arlist_item" v-for="(item,index) in hotList" :key="index">
                    <div class="itemtitle">{{item.title}}</div>
                    <div class="itembeizhu">
                        <span>{{item.update_time}}</span>
                        <span class="open">打开APP</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="arclist" v-show="articleInfo.video!=null&&articleInfo.video!=''">
            <div class="arlist_title">热门推荐</div>
            <div class="arlist_box">
                <div class="arlist_item item_flex" v-for="(item,index) in hotList" :key="index">
                    <div class="item_fx">
                        <div class="itemtitle">{{item.title}}</div>
                        <div class="itembeizhu">
                            <span>{{item.update_time}}</span>
                            <span class="open">打开APP</span>
                        </div>
                    </div>
                    <img :src="item.image" alt="">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import publicApi from '../../common/api';
    import fomat from '../../common/until'
    export default {
        name: "Index",
        data() {
            return {
                articleInfo: "",
                count:0,
                isfollow:"",
                token:"",
                article_id:"",
                souce_url:"http://qiniu.toutiao.ybhealth.com/",
                hotList:''
            }
        },
        created(){

        },
        mounted(){

            this.token = this.$route.query.token ? this.$route.query.token : '9X8k4FwGhhjIaIO8rB3nbZi0+fEeMx8pywnIlrmTx4kSPKAlkDzUD+c7qposeyA6c9xZaPT/yNZyF/ihtcg';
            this.article_id = this.$route.query.id ? this.$route.query.id : 20234;
            var hotList = publicApi.getXiangguan(this.article_id);
            this.hotList = hotList.data;
            //console.log(publicApi.getXiangguan(20234))
            console.log(this.hotList)
            for(var i=0; i<this.hotList.length; i++){

                this.hotList[i].update_time = fomat.formatTime(new Date(parseInt(this.hotList[i].update_time)*1000))
                console.log(this.hotList[i].update_time)
            }
            this.articleInfo =  publicApi.getArticle(this.token,this.article_id);
            console.log(this.articleInfo)
            this.setImgWidth();
            var video_souce = this.articleInfo.video;

            var havHttp = video_souce.indexOf('http')!= -1;
            if(havHttp == false){
                this.articleInfo.video = this.souce_url + this.articleInfo.video
            }

        },
        methods: {
            fomatTime:function(listtime){
                fomat.formatTime(listtime)
            },
            setImgWidth:function(){
                this.articleInfo.content = this.articleInfo.content.replace(/src=\"..\/image\/loadingImage.png\"/gi,'');
                this.articleInfo.content = this.articleInfo.content.replace(/ffxiang-/gi,'');
                this.articleInfo.content = this.articleInfo.content.replace(/\<img/gi,'<img style="width:100%"');
                this.articleInfo.content = this.articleInfo.content.replace(/height\=\"*\"/gi,'');
            },
            closeBtn:function(){
                $(".content").css("height","auto");
                $(".tohide").hide();
            }
        },
    }
</script>

<style scoped>
    .public-header {
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 3px 7px rgba(119, 119, 119, .35);
        height: 100px;
        position: fixed;
        top: 0;
        left: 0;
        width: 690px;
        background: #fff;
        z-index: 999;
    }

    .head-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .head-item img {
        width: 74px;
        height: 74px;
        margin-right: 13px;
    }

    .head-item span {
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
    .item_flex{
        overflow: hidden;
        margin-top: 20px;
    }
    .item_flex .item_fx,.item_flex img{
        float: left;
    }
    .item_fx{
        width: 460px;
        margin-right: 20px;
    }
    .item_flex img{
        width: 200px;
        height: 120px;
    }
    .title{
        margin-top: 100px;
        padding:30px;
        font-size: 40px;
        font-weight: bold;
        /*font-family: pingfangblod;*/
    }
    .utime{
        color: #666;
        font-size: 24px;
    }
    .video video{
        margin-top: 100px;
        width: 100%;
        height: 500px;
        background: #000;
    }
    .author{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 40px 0;
        padding: 0 30px;
    }
    .author .item{
        display: flex;
        align-items: center;
    }
    .author img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .content-all{
        position: relative;
    }
    .content{
        font-size: 34px;
        padding:30px;
        line-height: 1.5;
        height: 521px;
        overflow: hidden;
    }
    .content p{
        margin-top: 20px;
    }
    .content img{
        width: 100%;
    }
    .conBottom{
        position: absolute;
        top: 520px;
        text-align: center;
        width: 100%;
    }
    .botopen{
        text-align: center;
        margin-top: -50px;
    }
    .touming{
        width: 100%;
        height: 100px;
        background: linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,1));
    }

    .xiala img{
        width: 50px;
        margin: -50px 0 0 -30px;
        position: absolute;
        animation: ghostUpdown 1s infinite alternate;
        -webkit-animation: ghostUpdown 1s infinite alternate;
    }
    @keyframes ghostUpdown {
        from {
            margin-top: -50px;
        }
        to {
            margin-top: -40px;
        }
    }
    @-webkit-keyframes ghostUpdown {
        from {
            margin-top: -50px;
        }
        to {
            margin-top: -40px;
        }
    }
    .openApp{
        margin:100px 30px;
        background: #68dbed;
        color: #fff;
        line-height: 80px;
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        border-radius: 30px;
    }
    .arclist{
        padding: 30px;
        color: #333;
    }
    .arlist_title{
        font-size: 40px;
        line-height: 1.8;
        font-weight: 600;

    }
    .arlist_item{
        margin-top: 10px;
    }
    .itemtitle{
        font-size: 34px;
        line-height: 1.5;
    }
    .itembeizhu{
        font-size: 24px;
        color: #999;
        margin: 10px 0;
    }
    .open{
        color: #68DBED;
    }
</style>
