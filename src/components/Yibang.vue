<template>
  <div>
    <div class="abc" @click="loading()">1111111111111111</div>
    <ve-line :data="chartData" :settings="chartsSettings"></ve-line>
    <div class="box2"></div>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line'
  export default {
    data() {
      this.chartsSettings = {
        xAxisType: 'time'
      }

      return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '2018-01-01', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '2018-01-02', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '2018-01-03', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '2018-01-05', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '2018-01-10', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '2018-01-20', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
    },
    created () {

    },

    mounted(){
    },
    components: { VeLine },
    methods: {
      loading() {
        this.bus.$emit('tips', {
          title: '加载中',
          show: true
        })
      }
    },
  }
</script>

<style>
  #id{
    width: 100vw;
    height: 300px;
  }

  .box2{
    position: relative;
    width: 100px;
    border-top: 20px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 40px solid #000;
  }
</style>
