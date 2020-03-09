<template>
    <div class="loading">{{msg}}</div>
</template>

<script>
    export default {
        name: "Loading",
      data() {
        return {
          msg: '加载中。。。'
        }
      },
    }
</script>

<style scoped>
    .loading{
      background: rgba(0,0,0,0.5);
      color: #fff;
      width: 300px;
      height: 150px;
      line-height: 150px;
      text-align: center;
      position: fixed;
      top: 40%;
      left: 30%;
    }
</style>
