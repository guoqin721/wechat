//index.js 
//获取应用实例 
var app = getApp() 
Page({ 
 data: { 
 words: [], 
 windowHeight: 0,//获取屏幕高度 
 refreshHeight: 0,//获取高度 
 refreshing: false,//是否在刷新中 
 refreshAnimation: {}, //加载更多旋转动画数据 
 clientY: 0,//触摸时Y轴坐标 
 }, 
 onLoad: function () { 
 var _this = this; 
 //获取屏幕高度 
 wxgetSystemInfo({ 
  success: function (res) { 
  _thissetData({ 
   windowHeight: reswindowHeight 
  }) 
  consolelog("屏幕高度: " + reswindowHeight) 
  } 
 }) 
 //获取words 
 wxrequest({ 
  url: 'http://apiavatardatacn/ChengYu/Search?key=77f072d28eb141c8b6dda145ca364b92&keyWord=好', 
  complete: function (res) { 
  if (resdatareason == 'Succes') { 
   _thissetData({ 
   words: resdataresult 
   }) 
  } 
  } 
 }) 
 }, 
 scroll: function () { 
 consolelog("滑动了") 
 }, 
 lower: function () { 
 var start = 0; 
 start += 1; 
 consolelog("加载了") 
 var _this = this; 
 wxrequest({ 
  url: 'http://apiavatardatacn/ChengYu/Search', 
  data: { 
  key: '77f072d28eb141c8b6dda145ca364b92', keyWord: '好', page: start 
  }, 
  complete: function (res) { 
  if (resdatareason == 'Succes') { 
   var words = _thisdatawordsconcat(resdataresult); 
   _thissetData({ 
   words: words 
   }) 
  } 
  } 
 }) 
 }, 
 upper: function () { 
 consolelog("下拉了") 
 //获取用户Y轴下拉的位移 
 
 if (thisdatarefreshing) return; 
 thissetData({ refreshing: true }); 
 updateRefreshIconcall(this); 
 var _this = this; 
 var i = Mathrandom() //获得0-1的随机数 
 i = Mathceil(i * 10) //乘以10并向上去整 
 var words = ['龙', '一', '万', '千', '浩', '金', '得', '而', '可', '人']; 
 var word = words[i]; 
 wxrequest({ 
  url: 'http://apiavatardatacn/ChengYu/Search?key=77f072d28eb141c8b6dda145ca364b92&keyWord=' + word, 
 
  complete: function (res) { 
  if (resdatareason == 'Succes') { 
   setTimeout(function () { 
   _thissetData({ 
    words: resdataresult 
   }) 
   }, 2000) 
  } 
  setTimeout(function () { 
   _thissetData({ 
   refreshing: false 
   }) 
  }, 2500) 
  } 
 }) 
 }, 
 start: function (e) { 
 var startPoint = etouches[0] 
 var clientY = startPointclientY; 
 thissetData({ 
  clientY: clientY, 
  refreshHeight: 0 
 }) 
 }, 
 end: function (e) { 
 var endPoint = echangedTouches[0] 
 var y = (endPointclientY - thisdataclientY) * 6; 
 if (y > 50) { 
  y = 50; 
 } 
 thissetData({ 
  refreshHeight: y 
 }) 
 }, 
 move: function (e) { 
 consolelog("下拉滑动了") 
 } 
}) 
 
/** 
 * 旋转上拉加载图标 
 */ 
function updateRefreshIcon() { 
 var deg = 0; 
 var _this = this; 
 consolelog('旋转开始了') 
 var animation = wxcreateAnimation({ 
 duration: 1000 
 }); 
 
 var timer = setInterval(function () { 
 if (!_thisdatarefreshing) 
  clearInterval(timer); 
 animationrotateZ(deg);
 step();//在Z轴旋转一个deg角度 
 deg += 360; 
 _thissetData({ 
  refreshAnimation: animationexport() 
 }) 
 }, 1000); 
} 