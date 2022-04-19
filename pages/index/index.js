// 引入用来发送请求的方法 文件路径一定要补全
import { request } from '../../request/index.js'
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: [],
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    // 1.发送异步请求获取轮播图数据 优化的手段可以通过es6的promise来解决
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: result => {
    //     this.setData({
    //       swiperList: result.data.message,
    //     })
    //   },
    // })
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },

  // 获取轮播图数据
  getSwiperList() {
    request({ url: '/home/swiperdata' }).then(result => {
      this.setData({
        swiperList: result,
      })
    })
  },
  // 获取导航数据
  getCateList() {
    request({ url: '/home/catitems' }).then(result => {
      this.setData({
        catesList: result,
      })
    })
  },
  // 获取楼层数据
  getFloorList() {
    request({ url: '/home/floordata' }).then(result => {
      this.setData({
        floorList: result,
      })
    })
  },
})
