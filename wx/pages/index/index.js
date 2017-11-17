//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    current:2,
    indicatorDots: false,
    autoplay: false,
    interval: 1000,
    duration: 1000,
    imgUrls: [ 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
  },
  //事件处理函数
  changeIndex:function(event){
    console.log(1);
    this.setData({
      current:event.target.dataset.index
    })
    console.log(this.data.current);
  },
  slideChange:function(event){
    this.setData({
      current:event.detail.current
    })
  },
  onLoad: function () {
   
  }
})
