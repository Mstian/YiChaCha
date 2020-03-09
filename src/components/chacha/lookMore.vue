<template>
  <div>
    <div ref="cover" class="cover">
      <div class="down" @click="showMore()">
        <img src="../../assets/down.png" alt />
      </div>
      <div @click="openApp()" class="article_openApp">打开APP阅读全文</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showMore() {
      this.$store.state.overH = 'auto';
      this.$refs.cover.style.display='none';
    },
    openApp() {
      window.location.href = "http://download.ybhealth.com/app/index.html";
    }
  }
};
</script>

<style>
.cover {
  width: 100%;
  height: 214px;
  background-image: linear-gradient(to bottom, transparent, #fff 60%);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99999999999999999999999999;
}
.article_openApp {
  width: 690px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -345px;
  height: 74px;
  line-height: 74px;
  color: #fff;
  background: #66cbe6;
  border-radius: 999999px;
  text-align: center;
  font-size: 32px;
}
.down {
  width: 50px;
  height: 58px;
  position: absolute;
  left: 50%;
  margin-left: -25px;
  top: 80px;
  animation: updown 1s infinite alternate;
  -webkit-animation: updown 1s infinite alternate;
  z-index: 99;
}
.down img {
  width: 100%;
  height: 100%;
}
@keyframes updown {
  from {
    margin-top: -50px;
  }

  to {
    margin-top: -40px;
  }
}
@-webkit-keyframes updown {
  from {
    margin-top: -50px;
  }

  to {
    margin-top: -40px;
  }
}
</style>