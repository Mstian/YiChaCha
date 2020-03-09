import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      //头条详情
      // {
      //     path: '/',
      //     name: 'headcontent',
      //     component: resolve => require(['@/components/headline/Index'],resolve)
      // },
      //头条分享
      // {
      //     path: '/',
      //     name: 'share',
      //     component: resolve => require(['@/components/headline/shareHeadline'],resolve)
      // },
      //动态心电
      // {
      //     path: '/',
      //     name: 'share',
      //     component: resolve => require(['@/components/aecg/AecgShare'],resolve)
      // },
      // {
      //     path: '/',
      //     name: 'HelloWorld',
      //     component: resolve => require(['@/components/HelloWorld'],resolve)
      // },
      //查查分享
      {
          path: '/Yiyuan',
          name: 'Yiyuan',
          component: resolve => require(['@/components/chacha/Yiyuan'], resolve)
      },
      {
          path: '/Yisheng',
          name: 'Yisheng',
          component: resolve => require(['@/components/chacha/Yisheng'], resolve)
      },
      {
          path: '/Yaopin',
          name: 'Yaopin',
          component: resolve => require(['@/components/chacha/Yaopin'], resolve)
      },
      {
          path: '/Jibing',
          name: 'Jibing',
          component: resolve => require(['@/components/chacha/Jibing'], resolve)
      },


      //胎心
      // {
      //   path:'/',
      //   name:'HelloWorld',
      //     component: resolve => require(['@/components/HelloWorld'],resolve),
      // },
      // {
      //     path: '/',
      //     name: 'Guide',
      //     component: resolve => require(['@/components/taixin/Guide'],resolve),
      //     meta:{
      //         title:"测量参考分析"
      //     }
      // },
      // {
      //     path: '/Share',
      //     name: 'Share',
      //     component: resolve => require(['@/components/taixin/Share'], resolve),
      //     meta:{
      //         title:"胎心结果分享"
      //     }
      // },


    //血压
    {
        path: '/Count',
        name: 'Count',
        component: resolve => require(['@/components/xueya/Count'],resolve)
    },
    {
        path: '/Line',
        name: 'Line',
        component: resolve => require(['@/components/xueya/Line'],resolve)
    },
    {
        path: '/List',
        name: 'List',
        component: resolve => require(['@/components/xueya/List'],resolve)
    },
    // // //血压单页分享
    // {
    //     path: '/xueya',
    //     name: 'xueya',
    //     component: resolve => require(['@/components/xueya/xueya'],resolve)
    // },
    //血压标准
    // {
    //     path: '/',
    //     name: 'guide',
    //     component: resolve => require(['@/components/xueya/guide'],resolve)
    // },
      //血糖单页分享
      // {
      //     path: '/',
      //     name: 'Resultone',
      //     component: resolve => require(['@/components/xuetang/Resultone'], resolve)
      // },
  ]
})
