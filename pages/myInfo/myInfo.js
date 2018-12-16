// pages/myInfo/myInfo.js
var myRequest = require('../../utils/myRequest')
import { $init, $digest } from '../../utils/common.util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: [{ id: 0, value: "男" }, { id: 1, value: "女" }],
    genderSelect: 0,
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
    let that=this
    myRequest.getMyInfo(function(data){
      if(data.gender==="男"){
        that.setData({
          genderSelect:0
        })
      }else{
        that.setData({
          genderSelect:1
        })
      }
      that.setData({
        name:data.name,
        nameCount:data.name.length,
        introduction:data.introduction,
        introductionCount: data.introduction.length,
        contact:data.contact,
        contactCount:data.contact.length,
        age:data.age,
        ageCount:data.age.length,
        type:data.type
      })
    },function(res){

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
  handleNameInput(e) {
    const value = e.detail.value
    this.setData({
      name:value,
      nameCount:value.length
    })
  },
  handleIntroductionInput(e) {
    const value = e.detail.value
    this.setData({
      introduction: value,
      introductionCount: value.length
    })
  },
  handleContactInput(e) {
    const value = e.detail.value
    this.setData({
      contact:value,
      contactCount:value.length
    })
  },
  handleAgeInput(e) {
    const value = e.detail.value
    this.setData({
      age: value,
      ageCount: value.length
    })
  },
  genderSel(e) {
    this.setData({
      genderSelect: e.currentTarget.dataset.id
    })
  },
  submitForm(e) {
    var user = {
      name: this.data.name,
      introduction: this.data.introduction,
      contact: this.data.contact,
      age:this.data.age,
      gender: this.data.gender[this.data.genderSelect].value,
      type: this.data.type
    }
    console.log(user)
    myRequest.updateMyInfo(user, function (res) {
     wx.navigateBack({
       
     })
    }, function (err) {
      wx.navigateBack({

      })
    },function(){

    })
  }
})