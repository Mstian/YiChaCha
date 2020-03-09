<template>
    <div class="guide">
        <div class="item">
            <div class="item-icon"><img src="@/assets/taixin/xin.png" alt=""></div>
            <div class="item-font">胎心是指胎儿的心跳，于妊娠12周用多普勒胎心听诊仪能够探测到胎心音;妊娠1 8~20周用一般听诊器经孕妇腹壁能够听到胎心音。</div>
        </div>
        <div class="item">
            <div class="item-icon"><img src="@/assets/taixin/xin.png" alt=""></div>
            <div class="item-font">胎心率范围<br />
                正常胎心率为每分钟110-160次;<br />
                若胎心率大于160次/分，历时10分钟，称为心动过速;<br />
                若胎心率小于110次/分，历时10分钟，称为心动过缓;<br />
                胎儿心动过速或过缓，均需及时治疗。
            </div>
        </div>
        <div class="item">
            <div class="item-icon"><img src="@/assets/taixin/xin.png" alt=""></div>
            <div class="item-font">胎心与其他声音的区别<br />
                胎心音:呈双音、似钟表"滴答"声;<br />
                脐带杂音:与胎心一致，但声音呈吹风样;<br />
                子宫杂音:吹风样低音响;<br />
                腹主动脉音:与孕妇脉搏相一致，呈咚咚样强音响。
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Guide"
    }
</script>

<style scoped>
    .guide{
        display: flex;
        flex-direction: column;
        padding: 30px;
    }
    .item{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-bottom: 40px;
    }
    .item-icon img{
        width: 42px;
        height: 38px;
        padding-right: 10px;
        padding-top: 8px;
    }
    .item-font{
        font-size: 33px;
        line-height: 1.5;
        letter-spacing: 1px;
    }
</style>
