import { promisify } from 'promise.util'
const serverIP=require('config').serverIP
const wxUploadFile = promisify(wx.uploadFile)

const app=getApp()

function myRequest(url,data,methed,success,fail,complete){
  wx.request({
    url: url,
    data:data,
    method:method,
    success:success,
    fail:fail,
    complete:complete,
    header:{
      userId:app.globalData.userInfo.id,
      userType: app.globalData.userInfo.type
    }
  })
}

function getCaseList(page,success,fail,complete){
  page=arguments[0]?arguments[0]:1;
  wx.request({
    url: serverIP+'/api/case/?page='+page,
    success:success,
    fail:fail,
    complete:complete
  })
}

function searchCaseList(word,page,success,fail,complete){
  page=arguments[0]?arguments[0]:1;
  wx.request({
    url: serverIP+'/api/case/?query='+word+'&page='+page,
    success:success,
    fail:fail,
    complete:complete
  })
}

function getCaseDetail(caseId,success,fail,complete){
  wx.request({
    url: serverIP+'/api/case/'+caseId,
    success: success,
    fail: fail,
    complete: complete
  })
}

function getMyCaseList(success,fail,complete){
  wx.request({
    url: serverIP+'/api/user/'+app.globalData.userInfo.id+'/case',
    success: success,
    fail: fail,
    complete: complete
  })
}

function getMyInfo(success,fail,complete){
  var user={
    name:"guofengbai",
    introduction:"what!!!!",
    gender:"男",
    type:"用户",
    contact:"guofengbai"
  }
  success(user)
  /*
  wx.request({
    url: serverIP+'/api/user/' + app.globalData.userInfo.id,
    success: function(res){
      success(res.data)
    },
    fail: fail,
    complete: complete
  })
  */
}

function updateMyInfo(data,success,fail,complete){
  console.log(data)
  wx.request({
    url: serverIP+'/api/user/' + app.globalData.userInfo.id+'/info',
    method:'POST',
    data:data,
    success: success,
    fail: fail,
    complete: complete
  })
}

function updateMyAccount(data,success,fail,complete){
  wx.request({
    url: serverIP+'/api/user/' + app.globalData.userInfo.id+'account',
    success: success,
    fail: fail,
    complete: complete
  })
}

function newCase(title,content,images,success,fail,complete){
  wx.request({
    url: serverIP+'/api/case/',
    method: 'POST',
    data: {
      title: title,
      content: content,
      userId: app.globalData.userInfo.id
    },
    success: function(res){
      var caseId=res.id
      const arr = []

      for(var i=0;i<images.length;i++){
        arr.push(wxUploadFile({
          url: 'localhost:3000/api/case/'+caseId+'/images/'+'i',
          filePath: images[i],
          name: caseId+'-'+i,
        }))
      }

      Promise.all(arr).then(res => {
        success(res)
      }).catch(err => {
        fail(err)
      })

    },
    fail: fail,
    complete: complete
  })
}

function newDiagnosis(content,success,fail,complete){
  
  wx.request({
    url: serverIP+'/api/',
    method: 'POST',
    data:{
      userId: app.globalData.userInfo.id,
      content: content,
      date:new Date(),
    },
    success:success,
    fail:fail,
    complete:complete,
  })
}

function register(user,success,fail){
  var id = app.globalData.userInfo.id
  wx.request({
    url: serverIP+'/api/user/'+id,
    method: 'POST',
    data: user,
    success:function(res){
      app.globalData.userInfo={
        id:id,
        type:user.type
      };
      success(res)
    },
    fail:fail
  })
}

module.exports={
  myRequest:myRequest,
  getCaseList:getCaseList,
  searchCaseList:searchCaseList,
  getCaseDetail:getCaseDetail,
  getMyCaseList:getMyCaseList,
  getMyInfo:getMyInfo,
  updateMyInfo:updateMyInfo,
  updateMyAccount:updateMyAccount,
  newCase:newCase,
  newDiagnosis:newDiagnosis,
  register:register,
}