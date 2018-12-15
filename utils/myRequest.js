import { promisify } from 'promise.util'
const serverIP=require('config').serverIP
const wxUploadFile = promisify(wx.uploadFile)

const app=getApp()

function getCaseList(page,success,fail,complete){
  wx.request({
    url: serverIP+'/api/case/',
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
  wx.request({
    url: serverIP+'/api/user/' + app.globalData.userInfo.id,
    success: function(res){
      console.log(res)
      success(res.data)
    },
    fail: fail,
    complete: complete
  })
}

function updateMyInfo(data,success,fail,complete){
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
    url: serverIP+'/api/user/' + app.globalData.userInfo.id+'/account',
    method: 'POST',
    data: data,
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
      userId: app.globalData.userInfo.id,
      date: new Date(),
    },
    success: function(res){
      if(res.data.status=='OK'){
        var caseId = res.data.caseId
        console.log(caseId)
        const arr = []

        for (var i = 0; i < images.length; i++) {
          arr.push(wxUploadFile({
            url: serverIP+'/api/case/' + caseId + '/images/' + i,
            filePath: images[i],
            name: caseId + '-' + i,
            header: {
              "Content-Type": "multipart/form-data"
            },
          }))
        }

        Promise.all(arr).then(res => {
          success(res)
        }).catch(err => {
          fail(err)
        })
      }else{
        fail('creat new case failed!')
      }
    },
    fail: fail,
    complete: complete
  })
}

function newDiagnosis(caseId,content,success,fail,complete){
  
  wx.request({
    url: serverIP+'/api/diagnosis/case/'+caseId,
    method: 'POST',
    data:{
      doctorId: app.globalData.userInfo.id,
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
    url: serverIP+'/api/user/'+id+'/info',
    method: 'POST',
    data: user,
    success:function(res){
      wx.setStorageSync('user', {
        id:id,
        type:user.type
      })
      app.globalData.userInfo={
        id:id,
        type:user.type
      };
      success(res)
    },
    fail:fail
  })
}

function getDoctorInfo(id,success,fail){
  wx.request({
    url: serverIP+'/api/user/'+id,
    success: success,
    fail: fail
  })
}

module.exports={
  getCaseList:getCaseList,
  getCaseDetail:getCaseDetail,
  getMyCaseList:getMyCaseList,
  getMyInfo:getMyInfo,
  updateMyInfo:updateMyInfo,
  updateMyAccount:updateMyAccount,
  newCase:newCase,
  newDiagnosis:newDiagnosis,
  register:register,
  getDoctorInfo:getDoctorInfo
}