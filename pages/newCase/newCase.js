// pages/newCase/newCase.js
var myRequest=require('../../utils/myRequest')
import { $init, $digest } from '../../utils/common.util'

Page({
  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: []
  },

  onLoad(options) {
    $init(this)
  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    $digest(this)
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
    $digest(this)
  },

  chooseImage(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },

  submitForm(e) {
    const title = this.data.title
    const content = this.data.content
    const images = this.data.images

    wx.showLoading({
      title: '正在创建...',
      mask: true
    })

    myRequest.newCase(title,content,images,function(res){
      wx.hideLoading()
      wx.navigateBack()
    },function(err){
      wx.hideLoading()
    },function(){
      wx.hideLoading()
    })

  }

})