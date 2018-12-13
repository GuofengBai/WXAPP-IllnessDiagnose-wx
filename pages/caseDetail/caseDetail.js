// pages/caseDetail/caseDetail.js
var myRequest = require('../../utils/myRequest')
import { $init, $digest } from '../../utils/common.util'
const app=getApp();

Page({
  

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    contentCount: 0,
    content: '',
=======

    contentCount:0,

>>>>>>> b6a6176f91734f35ace7f44dcbcd0b76bd860cbc
    id:1,
    /**
     * 这是当前用户的Info
     */
    userInfo:app.globalData.userInfo,
    caseDetail:{
      id:1,
      title:"我肚子非常非常疼",
      time: '2018-12-09',
      content: "再来欣赏一批漫威热门漫画第N次印刷变体封面。以下分别为《神奇蜘蛛侠》第9期、《夜魔侠》第612期、《神奇四侠》第3期、《钢铁之心》第1期、《金刚狼回归》第2期、《蜘蛛灾变》第3期第2次印刷变体封面",
      reply: false,
      pictures: ["https://imgsa.baidu.com/forum/w%3D580%3B/sign=8df65c5aaecc7cd9fa2d34d1093a203f/5fdf8db1cb134954287aafd35b4e9258d1094a24.jpg","https://imgsa.baidu.com/forum/w%3D580%3B/sign=b812c8d6fedeb48ffb69a1d6c0243829/314e251f95cad1c8e26eae90723e6709c83d51ab.jpg"],
      /**
       * 这是问诊用户的Info
       */
      userInfo: {
        id:1,
        gender:'女',
        age:50,
        contact:'13769617325',
      },
      diagnosisList: [
        {
          id: 1,
          caseId: 1,
          doctorId: 1,
          date: '2018-12-10',
          content: "另一方面，1938年英国所地方的德军毒气轰炸最终没有到来，原因也比较尴尬：因为德国的橡胶资源紧缺，能够提供的防毒面具相当有限，一旦英军的轰炸机进行报复性毒气轰炸后果不堪设想，所以两边也就默契的都不提这一茬",

        },
        {
          id: 2,
          caseId: 1,
          doctorId: 2,
          date: '2018-12-11',
          content: "因为德国的橡胶资源紧缺，能够提供的防毒面具相当有限，一旦英军的轰炸机进行报复性毒气轰炸后果不堪设想，所以两边也就默契的都不提这一茬",
        }]
    },
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this)
    this.setData({
      id:options.id,
    })
    myRequest.getCaseDetail(options.id,function(res){
      console.log(res)
      /*
      this.setData({
        caseDetail:res.data
      })
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

    myRequest.newDiagnosis(content,function (res) {
      wx.hideLoading()
      wx.redirectTo({
        url: '.../caseDetail/caseDetail?id='+that.data.id,
      })
    }, function (err) {
      wx.hideLoading()
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