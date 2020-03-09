<template>
    <div class="footer">
            <div class="footer-title">下载亿邦健康，开启智慧健康新生活</div>
            <div class="btn-container">
                <a :href="msg.download">
                    <img src="@/assets/img/download.png" alt="">
                    <div>即刻下载</div>
                </a>
                <a :href="msg.cart">
                    <img src="@/assets/img/cart.png" alt="">
                    <div>立即抢购</div>
                </a>
            </div>
        </div>
</template>

<script>
    export default {
        name: 'UserShare',
        props:['msg']
    }
</script>

<style scoped>
    
.footer{
    margin-top: 50px;
    border-top: solid 1px #cccccc;
    padding: 20px;
}
.footer-title{
    font-size: 1rem;
    text-align: center;
}
.btn-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:0 10px;
    margin-top: 30px;

}
.btn-container a{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 45%;
    height:3rem;
    font-size: 1rem;
    color: #666;
    border: solid 1px #cccccc;
    text-decoration: none;
}
.btn-container a img{
    margin-right: 5px;
    width: 1.5rem;
}
</style>
