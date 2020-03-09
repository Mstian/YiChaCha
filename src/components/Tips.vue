<template>
  <div class="loading" v-show="tips.show">{{tips.title}}</div>
</template>

<script>
    export default {
        name: "Tips",
      data() {
        return {
          tips: {
            title:'加载中',
            show:false
          }
        }
      },
      created() {
          this.bus.$on('tips',data=>{
            this.tips = data;
          })
      },
      watch:{
          tips:function(){
            if(this.tips.show){
              setTimeout( ()=>{
                this.tips.show = false
              },1500)
            }
          }
      }
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
