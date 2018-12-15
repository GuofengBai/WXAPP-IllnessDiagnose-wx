//app.js
App({
  serverIP: require('utils/config').serverIP,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    var user=wx.getStorageSync('user')
    let that=this
    if(!user){
      wx.login({
        success:res => {
          console.log('login_code:'+res.code)
          wx.request({
            url: this.serverIP+'/basic/login',
            method:'POST',
            data:{
              code:res.code
            },
            success:res => {
              console.log('login_or_register:'+res.data)
              if(!res.data.hasType){
                that.globalData.userInfo={
                  id:res.data.id
                }
                wx.redirectTo({
                  url: '/pages/register/register',
                })
              }else{
                user={
                  id:res.data.id,
                  type:res.data.type
                }
                wx.setStorageSync('user', user)
                that.globalData.userInfo=user
              }
            },
            fail: function (err) {
              
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