import { promisify } from 'promise.util'
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
    url: 'localhost:3000/api/case/?page='+page,
    success:success,
    fail:fail,
    complete:complete
  })
}

function searchCaseList(word,page,success,fail,complete){
  page=arguments[0]?arguments[0]:1;
  wx.request({
    url: 'localhost:3000/api/case/?query='+word+'&page='+page,
    success:success,
    fail:fail,
    complete:complete
  })
}

function getCaseDetail(caseId,success,fail,complete){
  wx.request({
    url: 'localhost:3000/api/case/'+caseId,
    success: success,
    fail: fail,
    complete: complete
  })
}

function getMyCaseList(success,fail,complete){
  wx.request({
    url: 'localhost:3000/api/user/'+app.globalData.userInfo.id+'/case',
    success: success,
    fail: fail,
    complete: complete
  })
}

function getMyInfo(success,fail,complete){
  wx.request({
    url: 'localhost:3000/api/user/' + app.globalData.userInfo.id,
    success: success,
    fail: fail,
    complete: complete
  })
}

function updateMyInfo(data,success,fail,complete){
  wx.request({
    url: 'localhost:3000/api/user/' + app.globalData.userInfo.id,
    method:'POST',
    data:data,
    success: success,
    fail: fail,
    complete: complete
  })
}

function updateMyAccount(data,success,fail,complete){
  wx.request({
    url: 'localhost:3000/api/user/' + app.globalData.userInfo.id,
    success: success,
    fail: fail,
    complete: complete
  })
}

function newCase(title,content,images,success,fail,complete){
  wx.request({
    url: 'http://localhost:3000/api/case/',
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

function newDiagnosis(){

}

module.exports={
  myRequest:myRequest,
  getCaseList:getCaseList,
  searchCaseList:searchCaseList,
  getCaseDetail:getCaseDetail,
  getMyCaseList:getMyCaseList,
  getMyInfo:getMyInfo,
  updateMyIndo:updateMyInfo,
  updateMyAccount:updateMyAccount,
  newCase:newCase,
  newDiagnosis:newDiagnosis
}