Page({
  onTap: function() {
    wx.switchTab({
      url: '../posts/post',
    })

    // wx.redirectTo({
    //   url:'../posts/post',
    // })

  },
  onUnload:function(){
    // console.log("unload");
  },
  onHide:function(){
    // console.log("hide");
  }
})