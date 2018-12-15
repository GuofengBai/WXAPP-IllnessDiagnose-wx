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
    ],
    hide:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    myRequest.getCaseList(this.data.page,function(res){
      that.setData({
        caseList:res.data
      })
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
    if(this.data.hide){
      var that = this
      myRequest.getCaseList(this.data.page, function (res) {
        that.setData({
          caseList: res.data
        })
      }, function (err) {
        console.log(err)
      }, function () {

      })
      this.setData({
        hide:false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      hide:true
    })
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