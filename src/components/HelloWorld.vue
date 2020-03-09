<template>
  <div class="hello">
      <router-link to="/">{{msg}}</router-link>
      <router-link to="/Yibang">亿邦</router-link>
      <router-link to="/guide">加载中</router-link>
      <router-link to="/Yisheng">医生</router-link>
      <router-link to="/Yiyuan">医院</router-link>
      <router-link to="/Yaopin">药物</router-link>
      <router-link to="/Jibing">疾病</router-link>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Home'
    }
  },
  mounted () {
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    a{
      display: block;
      text-decoration: none;
    }
  }
</style>
