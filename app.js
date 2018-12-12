//app.js
App({
  serverIP: require('utils/config').serverIP,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('user',{
      name:'ascasc',
      type:'user',
      id:'123'
    })
    var user=wx.getStorageSync('user')
    if(!user){
      wx.login({
        success:res => {
          console.log(res)
          wx.request({
            url: this.serverIP,
            method:'GET',
            data:{
              res_code:res.code
            },
            success:res => {
              console.log(res)
              if(!res.data.hasConfiguredType){
                wx.redirectTo({
                  url: '/pages/register/register',
                })
              }else{
                user={
                  id:res.data.id,
                  type:res.data.type
                }
                wx.setStorageSync('user', user)
              }
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
      })
    }else{
      this.globalData.userInfo=user;
    }
  },
  globalData: {
    userInfo: {
      id:"111",
      name:"ascasc",
      type:"user"
    }
  }
})