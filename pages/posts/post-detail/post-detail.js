// pages/posts/post-detail/post-detail.js
var poData = require("../../../data/post-data.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: '',
    collecked: false,
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.golableData.currentPlayMusic)
    
    var postId = options.id;
    this.setData({
      postId: postId
    })
    console.log(this.data.postId)
    var postData2 = poData.postList[postId];
    this.setData({
      postData: postData2
    })
    var postsCollected = wx.getStorageSync("posts_Collected");
    if (postsCollected) {
      var postsCol = postsCollected[this.data.postId];
      this.setData({
        collected: postsCol
      })
    } else {
      var postsCollected = {};
      postsCollected[this.data.postId] = false;
      wx.setStorageSync('posts_Collected', postsCollected)
    }
    if (app.golableData.g_isPlayingMusic && app.golableData.currentPlayMusic === this.data.postId){
      this.setData({
        isPlayMusic:true
      })
    }else{
      this.setData({
        isPlayMusic: false
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayMusic: true
      })
      app.golableData.g_isPlayingMusic=true;
      app.golableData.currentPlayMusic = that.data.postId
      console.log(app.golableData.currentPlayMusic + "//" + that.data.postId)
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayMusic: false
      })
      app.golableData.g_isPlayingMusic = false;
      app.golableData.currentPlayMusic = null 
      console.log(app.golableData.currentPlayMusic + "//" + that.data.postId)
    })
  },
  onCollectionTap: function (e) {
    var postsCollected = wx.getStorageSync('posts_Collected');
    var postColl = postsCollected[this.data.postId];
    postColl = !postColl;
    postsCollected[this.data.postId] = postColl;
    wx.setStorageSync('posts_Collected', postsCollected);
    this.setData({
      collecked: postColl
    })
    wx.showToast({
      title: postColl ? '收藏成功' : '取消成功',
      icon: 'success',
      duration: 1000
    })
  },
  showModal: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          // that.        
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShareTap: function () {
    var itemList = ['分享给微信好友', '分享到微博', '分享到QQ'];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        // res.cancel 用户点击了取消按钮
        // console.log(res.tapIndex)
        wx.showModal({
          title: '用户分享到' + itemList[res.tapIndex],
          content: '微信分享功能期待开通',
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onMusicTap: function () {
    var isPlay = this.data.isPlayMusic;
    if (isPlay){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayMusic:false
      })
    }else{
      var postData3 = poData.postList[this.data.postId];
      wx.playBackgroundAudio({
        dataUrl: postData3.music.url,
        title: postData3.music.title,
        coverImgUrl:postData3.music.coverImg
      })
      this.setData({
        isPlayMusic: true
      })
    }
  },
  toTest: function () {
    wx.navigateTo({
      url: '/pages/test/test',
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

  }
})