// pages/register/register.js
var myRequest = require('../../utils/myRequest')
import { $init, $digest } from '../../utils/common.util'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    gender: [{id:0,value:"男"},{id:1,value:"女"}],
    genderSelect:0,
    type: [{ id: 0, value: "用户" }, { id: 1, value: "医生" }],
    typeSelect:0,
    name: "",
    nameCount: 0,
    introduction: "",
    introductionCount: 0,
    contact: "",
    contactCount: 0,
    age:'',
    ageCount:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this)
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
  handleNameInput(e) {
    const value = e.detail.value
    this.data.name = value
    this.data.nameCount = value.length
    $digest(this)
  },
  handleIntroductionInput(e) {
    const value = e.detail.value
    this.data.introduction = value
    this.data.introductionCount = value.length
    $digest(this)
  },
  handleContactInput(e) {
    const value = e.detail.value
    this.data.contact = value
    this.data.contactCount = value.length
    $digest(this)
  },
  handleAgeInput(e) {
    const value = e.detail.value
    this.data.age = value
    this.data.ageCount = value.length
    $digest(this)
  },
  genderSel(e){
    this.setData({
      genderSelect: e.currentTarget.dataset.id
    })
  },
  typeSel(e){
    this.setData({
      typeSelect: e.currentTarget.dataset.id
    })
  },
  submitForm(e){
    var user={
      name:this.data.name,
      introduction:this.data.introduction,
      contact:this.data.contact,
      age:this.data.age,
      gender:this.data.gender[this.data.genderSelect].value,
      type: this.data.type[this.data.typeSelect].value
    }
    myRequest.register(user,function(res){
      wx.switchTab({
        url: '/pages/caseList/caseList',
      })
    },function(err){
      wx.switchTab({
        url: '/pages/caseList/caseList',
      })
    })
  }
})