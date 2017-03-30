// This is our App Service.
// This is our data.
// 可以将先定义一个对象，然后再将 该对象赋值给 page中的data ; 
// var helloData = {
//   name: 'WeChat'
// }

// //index.js
// //获取应用实例
// var app = getApp()
// Page({
//   // data: {
//   //   motto: 'Hello World wechat',
//   //   userInfo: {}
//   // },
//   // Register a Page.
//   data: helloData,
//   changeName: function (e) {
//     // sent data change to view
//     wx.request({
//       url: 'index.json', //仅为示例，并非真实的接口地址
//       // data: {
//       //   x: '',
//       //   y: ''
//       // },
//       // header: {
//       //   'content-type': 'application/json'
//       // },
//       success: function (res) {
//         console.log(res.data)


//       }
//     })
//     this.setData({
//       name: 'MINA'
//     })

//   },
//   handleTap1: function (event) {
//     console.log(event)
//     this.setData({
//       name: 'handleTap1'
//     })
//   },
//   handleTap2: function (event) {
//     console.log(event)
//     this.setData({
//       name: 'handleTap2'
//     })
//   },
//   handleTap3: function (event) {
//     this.setData({
//       name: 'handleTap3'
//     })
//   },
//   tapName: function (event) {
//     console.log(event)
//     this.setData({
//       name: 'hehe'
//     })
//   },
//   //事件处理函数
//   bindViewTap: function () {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     console.log('onLoad')
//     var that = this
//     //调用应用实例的方法获取全局数据
//     app.getUserInfo(function (userInfo) {
//       //更新数据
//       that.setData({
//         userInfo: userInfo
//       })
//       that.update()
//     })
//   }
// })



// Page({
//   data: {
//     objectArray: [
//       {id: 5, unique: 'unique_5'},
//       {id: 4, unique: 'unique_4'},
//       {id: 3, unique: 'unique_3'},
//       {id: 2, unique: 'unique_2'},
//       {id: 1, unique: 'unique_1'},
//       {id: 0, unique: 'unique_0'},
//     ],
//     numberArray: [1, 2, 3, 4]
//   },
//   switch: function(e) {
//     const length = this.data.objectArray.length
//     for (let i = 0; i < length; ++i) {
//       const x = Math.floor(Math.random() * length)
//       const y = Math.floor(Math.random() * length)
//       const temp = this.data.objectArray[x]
//       this.data.objectArray[x] = this.data.objectArray[y]
//       this.data.objectArray[y] = temp
//     }
//     this.setData({
//       objectArray: this.data.objectArray
//     })
//   },
//   addToFront: function(e) {
//     const length = this.data.objectArray.length
//     this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
//     this.setData({
//       objectArray: this.data.objectArray
//     })
//   },
//   addNumberToFront: function(e){
//     this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
//     this.setData({
//       numberArray: this.data.numberArray
//     })
//   }
// })




// Page({
//   data: {
//     imgUrls: [
//       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
//       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
//       'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
//     ],
//     indicatorDots: false,
//     autoplay: false,
//     interval: 5000,
//     duration: 1000
//   },
//   changeIndicatorDots: function(e) {
//     this.setData({
//       indicatorDots: !this.data.indicatorDots
//     })
//   },
//   changeAutoplay: function(e) {
//     this.setData({
//       autoplay: !this.data.autoplay
//     })
//   },
//   intervalChange: function(e) {
//     this.setData({
//       interval: e.detail.value
//     })
//   },
//   durationChange: function(e) {
//     this.setData({
//       duration: e.detail.value
//     })
//   }
// })

// icon
// Page({
//   data: {
//     iconSize: [20, 30, 40, 50, 60, 70],
//     iconColor: [
//       'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
//     ],
//     iconType: [
//       'success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
//       'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
//       'info_circle', 'cancel', 'search', 'clear'
//     ]
//   }
// })



// 
var initData = 'this is first line\nthis is second line'
var extraLine = [];
Page({
  data: {
    text: initData
  },

  add: function (e) {
    extraLine.push('other line')
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },
  remove: function (e) {
    if (extraLine.length > 0) {
      extraLine.pop();
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  },

  icon: function (e) {

    //一般在首页不适用redirectTo这个函数，因为会关闭首页，返回不了首页，一般在首页使用navigateTo
    //跳转到icon页面
    // wx.redirectTo({
    //   url: "/pages/icon/icon"
    // })
    wx.navigateTo({
      url: "/pages/icon/icon"
    })
  },

  text: function (e) {
    //跳转到text页面
    wx.navigateTo({
      url: "/pages/text/text"
    })

  }


})





