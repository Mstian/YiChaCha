<template>
    <div class="headLine">
        <div class="video" v-show="articleInfo.video!=null">
            <video :src="articleInfo.video" controls="controls" ></video>
        </div>
        <div class="title">{{articleInfo.title}}</div>
        <div class="author">
            <div class="item">
                <div class="avatar"><img :src="articleInfo.userImg" alt=""></div>
                <div class="author-name">{{articleInfo.userUsername}}</div>
            </div>
            <div class="isfollow" v-if="isfollow==1" @click="clickFollow()">已关注</div>
            <div class="isfollow" v-else @click="clickFollow()">关注</div>
        </div>
        <div class="content" v-show="articleInfo.content!=null" v-html="articleInfo.content"></div>
        <!--        <div class="point-good">-->
        <!--            <div class="item" data-count="articleInfo.good"  @click="countPlus($event)">赞（{{articleInfo.zan}}）</div>-->
        <!--            <div class="item" data-count="articleInfo.ungood" @click="countPlus($event)">踩（{{articleInfo.cai}}）</div>-->
        <!--        </div>-->

    </div>
</template>

<script>
    import publicApi from '../../common/api';
    export default {
        name: "Index",
        data() {
            return {
                articleInfo: "",
                count:0,
                isfollow:"",
                token:"",
                article_id:"",
                souce_url:"http://qiniu.toutiao.ybhealth.com/"
            }
        },
        created(){

        },
        mounted(){

            this.token = this.$route.query.token ? this.$route.query.token : '9X8k4FwGhhjIaIO8rB3nbZi0+fEeMx8pywnIlrmTx4kSPKAlkDzUD+c7qposeyA6c9xZaPT/yNZyF/ihtcg';
            this.article_id = this.$route.query.id ? this.$route.query.id : 20234;
            console.log(publicApi.getArticle(this.token,this.article_id));
            this.articleInfo =  publicApi.getArticle(this.token,this.article_id);
            this.setImgWidth();
            if(this.articleInfo.userGuanzhu){

                this.isfollow = 1
            }else{
                this.isfollow = 0
            }
            console.log(this.isfollow )
            //console.log(this.articleInfo.video);
            //console.log(this.articleInfo.video.indexOf('http')!= -1)
            var video_souce = this.articleInfo.video;
            var havHttp = video_souce.indexOf('http')!= -1;
            if(havHttp == false){
                this.articleInfo.video = this.souce_url + this.articleInfo.video
            }
        },
        methods: {
            clickFollow:function() {
                this.isfollow = !this.isfollow;
                console.log(this.isfollow);
                if(this.isfollow==0){
                    $.ajax({
                        url: 'http://toutiao.ybhealth.com/index.php/api/member/guanzhuDel',
                        type: 'post',
                        dataType: 'json',
                        data: {token: this.token, gz_uid: this.articleInfo.userUid},
                        async:false,
                        success:function(res){
                            console.log(res)
                        }
                    })
                }else{
                    $.ajax({
                        url: 'http://toutiao.ybhealth.com/index.php/api/member/guanzhu',
                        type: 'post',
                        dataType: 'json',
                        data: {token: this.token, gz_uid: this.articleInfo.userUid},
                        async:false,
                        success:function(res){
                            console.log(res)
                        }
                    })
                }
            },
            setImgWidth:function(){
                this.articleInfo.content = this.articleInfo.content.replace(/src=\"..\/image\/loadingImage.png\"/gi,'');
                this.articleInfo.content = this.articleInfo.content.replace(/ffxiang-/gi,'');
                this.articleInfo.content = this.articleInfo.content.replace(/\<img/gi,'<img style="width:100%"');
            },
        },
    }
</script>

<style scoped>
    .title{
        padding:30px;
        font-size: 40px;
        font-family: pingfangblod;
    }
    .video video{
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
    .isfollow{
        background: #68DBED;
        width: 120px;
        height: 60px;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 60px;
        border-radius: 10px;
    }
    .content{
        font-size: 34px;
        padding:30px;
        line-height: 1.5;
    }
    .content p{
        margin-top: 20px;
    }
    .content img{
        width: 100%;
    }
</style>
