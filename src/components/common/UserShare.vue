<template>
    <div class="usershare">
        <img :src="msg.sharepci ? msg.sharepci : require('../../assets/img/avr.png')" alt="">
        <div>{{msg.sharename}}分享了{{msg.devicename}}</div>
    </div>
</template>

<script>
    export default {
        name: 'UserShare',
        props:['msg']
    }
</script>

<style scoped>
    .usershare{
        padding:10px 15px;
        display: flex;
        flex-direction: row;

    }
    .usershare img{
        margin-right: 15px;
        width:1.5rem;
        height:1.5rem;
    }
</style>
