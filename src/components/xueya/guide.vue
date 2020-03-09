<template>
    <div class="guide">
        <div class="container">
            <div class="title">低血压</div>
            <div class="content">一般是指成人血压＜ 90 / 60mm</div>
        </div>
        <div class="container">
            <div class="title">高血压</div>
            <div class="content">非同日三次测量上臂血压，收缩压<br />≥140mmHg ，和／或舒张压 ≥ 90mmHg</div>
        </div>
        <div class="container">
            <div class="ntitle">血压水平分类和定义</div>
            <div class="flex-table">
                <div class="nth">
                    <div>级别</div>
                    <div>收缩压<br />(mmHg)</div>
                    <div>/</div>
                    <div>舒张压<br />(mmHg)</div>
                </div>
                <div class="ntr">
                    <div>正常血压</div>
                    
                    <div><120</div>
                    <div>和</div>
                    <div><80</div>
                </div>
                <div class="ntr">
                    <div>正常高值</div>
                    <div>120~139</div>
                    <div>和/或</div>
                    <div>80~89</div>
                </div>
                <div class="ntr">
                    <div>高血压</div>
                    <div>≥140</div>
                    <div>和/或</div>
                    <div>≥90</div>
                </div>
                <div class="ntr">
                    <div>轻度高血压</div>
                    <div>140~159</div>
                    <div>和/或</div>
                    <div>90~99</div>
                </div>
                <div class="ntr">
                    <div>中度高血压</div>
                    <div>160~179</div>
                    <div>和/或</div>
                    <div>100~109</div>
                </div>
                <div class="ntr">
                    <div>重度高血压</div>
                    <div>≥180</div>
                    <div>和/或</div>
                    <div>≥110</div>
                </div>
                <div class="ntr">
                    <div>单纯收缩期<br />高血压</div>
                    <div>≥140</div>
                    <div>和</div>
                    <div><90</div>
                </div>
            </div>
        </div>
        <div class="fonts">注：当收缩压和舒张压分属不同级别时，以较高的分级为准。</div>
        <div class="fonts">参考文献：《中国高血压防治指南（第三版）》</div>
    </div>
</template>

<script>
    export default {
        name: "guide"
    }
</script>

<style scoped>
    .guide{
        padding: 30px;
    }
    .title{
        border-left: solid 5px #68dbed;
        padding-left: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .content{
        padding-left: 25px;
        line-height: 2;
        margin-bottom: 30px;
    }

    .ntitle{
        margin-top: 20px;
        font-size: 36px;
        padding-bottom: 20px;
        text-align: center;
        font-weight: bold;
        border-bottom: solid 1px #000000;
    }
    .flex-table{
        display: table;
        width: 100%;
        border-bottom: solid 1px #000
    }

    .nth{
        display: table-row;

    }
    .nth div{
        display: table-cell;
        line-height: 2;
        padding: 15px 0;
        border-bottom: solid 1px #000;
        text-align: center;
        vertical-align: middle;
    }
    .ntr{
        display: table-row;
    }
    .ntr div{
        display: table-cell;
        line-height: 3;
        vertical-align: middle;
        text-align: center;
    }
    .fonts{
        font-size: 24px;
        color: #999;
        line-height: 2;
    }
</style>