/*
1.输入框绑定，值改变事件，input事件
  1.获取到输入框的值
  2.合法性判断
  3.验证通过，把输入框的值发送到后台
  4.返回的数据打印到页面上
2.防抖(防止抖动) 定时器 节流
  0.防抖 输入框中防止重复输入 重复发送请求
  1.节流 用于页面上拉下拉
  1.定义全局的定时器id
  
 */
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inpValue: '',
  },
  TimdId: -1,
  // 输入框的值改变，就会触发的事件
  handleInput(e) {
    // 1.获取到输入框的值
    const { value } = e.detail
    // 2.检测合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false,
      })
      // 值不合法
      return
    }
    // 3.准备发送请求获取数据
    this.setData({
      isFocus: true,
    })
    clearTimeout(this.TimdId)
    this.TimdId = setTimeout(() => {
      this.qsearch(value)
    }, 1000)
  },
  // 发送请求获取搜索建议数据
  async qsearch(query) {
    const res = await request({
      url: '/goods/qsearch',
      data: {
        query,
      },
    })
    this.setData({
      goods: res,
    })
  },
  // 点击取消按钮
  handleCancel() {
    this.setData({
      inpValue: '',
      isFocus: false,
      goods: [],
    })
  },
})