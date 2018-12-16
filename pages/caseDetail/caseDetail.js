// pages/caseDetail/caseDetail.js
var myRequest = require('../../utils/myRequest')
import { $init, $digest } from '../../utils/common.util'
const app=getApp();

Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    imagesPath: require('../../utils/config').serverIP + '/images/',
    contentCount: 0,
    content: '',
    id:1,
    /**
     * 这是当前用户的Info
     */
    userInfo:app.globalData.userInfo,
    caseDetail:{
    },
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    $init(this)
    this.setData({
      id:options.id,
    })
    myRequest.getCaseDetail(options.id,function(res){
      that.setData({
        caseDetail:res.data
      })
      console.log(that.data.caseDetail.pictures)
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

  },

  submitForm(e) {
    /*wx.redirectTo({
      url: '../caseDetail/caseDetail?id=' + this.data.id,
    })*/

    let that=this
    
    const content = this.data.content

    wx.showLoading({
      title: '正在创建...',
      mask: true
    })

    myRequest.newDiagnosis(this.data.id,content,function (res) {
      wx.hideLoading()
      wx.redirectTo({
        url: '/pages/caseDetail/caseDetail?id='+that.data.id,
      })
    }, function (err) {
      wx.hideLoading()
      wx.redirectTo({
        url: '/pages/caseDetail/caseDetail?id=' + that.data.id,
      })
    }, function () {
      wx.hideLoading()
    })

  },
  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
    $digest(this)
  },


})