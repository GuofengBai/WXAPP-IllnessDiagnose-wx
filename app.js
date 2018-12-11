//app.js
App({
  serverIP: require('utils/config').serverIP,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var user=wx.getStorageSync('user')
    if(!user){
      wx.login({
        success:res => {
          wx.request({
            url: this.serverIP+'/api/user',
            method:'POST',
            data:{
              res_code:res.code
            },
            success:res => {
              if(!res.data.hasConfiguredType){
                wx.navigateTo({
                  url: 'pages/register/register',
                })
              }else{
                user={
                  id:res.data.id,
                  type:res.data.type
                }
                wx.setStorageSync('user', user)
              }
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