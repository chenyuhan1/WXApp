//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    status: 1,// 任务状态 1 全部 2 未完成 3 已完成
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lists: [{
      text: '周末看电影',
      status: 0
    },{
      text: '跑步5公里',
      status: 0
    },{
      text: '学习MVVM',
      status: 1
    }],
    curLists: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // console.log(this.data.lists);
    this.setData({
      curLists: this.data.lists
    })
    // console.log(this.data.curLists);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    // this.data.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showStatus: function(e) {
    let status =  e.currentTarget.dataset.status

    let lists = this.data.lists;
    lists = lists.filter((item) => {
      if (status == 1 ) return true;
      if (status == 2 && item.status == 0) return true;
      if (status == 3 && item.status == 1) return true;
      return false;
    });
    console.log(lists);

    if (status == this.data.status) return;
    this.setData({
      status: status,
      curLists: lists
    })
  },
  addTodoShow: function() {
    let lists = this.data.lists;
    let status = this.data.status;
    // let curLists = this.data.curLists;
    lists.push({
      text: '跑步5公里',
      status: 1
    });
    this.setData({
      lists: lists,
    })
    let curLists = this.data.lists.filter((item) => {
      if (status == 1 ) return true;
      if (status == 2 && item.status == 0) return true;
      if (status == 3 && item.status == 1) return true;
      return false;
    });
    this.setData({
      curLists: curLists
    })
    // console.log(this.data.lists);
  }

})
