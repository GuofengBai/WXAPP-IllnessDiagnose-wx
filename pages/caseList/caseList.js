// pages/caseList/caseList.js
var myRequest = require('../../utils/myRequest')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    page:1,
    caseList:[
      {
      id:1,
      title:"我肚子非常非常疼",
      time:'2018-12-09',
      content:"再来欣赏一批漫威热门漫画第N次印刷变体封面。以下分别为《神奇蜘蛛侠》第9期、《夜魔侠》第612期、《神奇四侠》第3期、《钢铁之心》第1期、《金刚狼回归》第2期、《蜘蛛灾变》第3期第2次印刷变体封面",
      reply:false
      },
      {
        id:2,
        title: "我脑袋非常非常疼",
        time: '2018-12-09',
        content: "再来欣赏一批漫威热门漫画第N次印刷变体封面。以下分别为《神奇蜘蛛侠》第9期、《夜魔侠》第612期、《神奇四侠》第3期、《钢铁之心》第1期、《金刚狼回归》第2期、《蜘蛛灾变》第3期第2次印刷变体封面",
        reply: true
      },
      {
        id: 3,
        title: "我脖子非常非常疼",
        time: '2018-12-09',
        content: "再来欣赏一批漫威热门漫画第N次印刷变体封面。以下分别为《神奇蜘蛛侠》第9期、《夜魔侠》第612期、《神奇四侠》第3期、《钢铁之心》第1期、《金刚狼回归》第2期、《蜘蛛灾变》第3期第2次印刷变体封面",
        reply: true
      },
      {
        id: 4,
        title: "我耳朵非常非常疼",
        time: '2018-12-09',
        content: "再来欣赏一批漫威热门漫画第N次印刷变体封面。以下分别为《神奇蜘蛛侠》第9期、《夜魔侠》第612期、《神奇四侠》第3期、《钢铁之心》第1期、《金刚狼回归》第2期、《蜘蛛灾变》第3期第2次印刷变体封面",
        reply: true
      },
      {
        id: 5,
        title: "我XXXXXXXXXXXXXXX脑袋非常非常疼",
        time: '2018-12-09',
        content: "再来欣赏一批漫威热门漫画第N次印刷变体封面。以下分别为《神奇蜘蛛侠》第9期、《夜魔侠》第612期、《神奇四侠》第3期、《钢铁之心》第1期、《金刚狼回归》第2期、《蜘蛛灾变》第3期第2次印刷变体封面",
        reply: true
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    myRequest.getCaseList(this.data.page,function(res){
      console.log(res)
      /*
      that.setData({
        caseList:that.data.caseList.concat(res.data)
      })
      that.data.page++
      */
    },function(err){
      console.log(err)
    },function(){

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})