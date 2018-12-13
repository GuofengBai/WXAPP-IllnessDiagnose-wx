//app.js
App({
  serverIP: require('utils/config').serverIP,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    /*
    wx.setStorageSync('user',{
      name:'ascasc',
      type:'user',
      id:'123'
    })
    */
    var user=wx.getStorageSync('user')
    let that=this
    if(!user){
      wx.login({
        success:res => {
          console.log(res)
          wx.request({
            url: this.serverIP+'/api/user',
            method:'POST',
            data:{
              res_code:res.code
            },
            success:res => {
              console.log(res)
              if(!res.data.hasConfiguredType){
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
              wx.redirectTo({
                url: '/pages/register/register',
              })
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