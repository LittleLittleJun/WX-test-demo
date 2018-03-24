//引入文件，此处只能用相对路径
var postsData = require('../../data/post-data.js');

// pages/posts/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 小程序中是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 这个动作A的执行，是在onload事件之后发生（特殊情况除外：异步操作）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postList: postsData.postList
    })
    // this.data.postList = postsData.postList
  },
  toDetail: function (event){
    var postId = event.currentTarget.dataset.postid;
    // console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  onSwiperTap:function(e){
    var postId = e.target.dataset.postid;
    console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
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