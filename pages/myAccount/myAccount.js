// pages/myAccount/myAccount.js
var myRequest = require('../../utils/myRequest')
import { $init, $digest } from '../../utils/common.util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    password: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    

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
  handlePhoneNumberInput(e){
    const value = e.detail.value
    this.setData({
      phoneNumber:value
    })

  },
  handlePasswordInput(e){
    const value = e.detail.value
    this.setData({
      password:value
    })

  },
  submitForm(e){
    
    var data={
      phoneNumber: this.data.phoneNumber,
      password: this.data.password,
    }
    wx.showLoading({
      title: '正在更新...',
      mask: true
    })

    myRequest.updateMyAccount(data,function(res){
      wx.hideLoading()
      wx.navigateBack()
    }, function (err) {
      wx.hideLoading()
    }, function () {
      wx.hideLoading()  
    })
  }

})