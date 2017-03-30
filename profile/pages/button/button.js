// 按钮的 一些逻辑 
var types = ['default', 'primary', 'warn']
var pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },
  onShareAppMessage: function () {
    //  return {
    //   title: '自定义分享标题',
    //   path: '/page/user?id=123'
    // }

    //关闭当前页面，跳转到应用内的某个页面。
    wx.redirectTo({
      url: '/pages/index/index'
    })

    //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    // wx.switchTab({
    //   url: '/pages/index/index'
    // })

    //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
    // wx.navigateTo({
    //   url: '/pages/index/index'
    // })
    //返回上一界面或多级页面
    // wx.navigateBack({
    //   delta:1
    // })

    //跳转页面需要传递参数 那就不能使用 wx.switchTan方法 跳转页面了
    //


    // 什么是tabBar页面 app.json文件中tabBar中注册过的tab页，即为“tabBar页面”，
    //非tabBar中注册占用的页面即为“应用内的页面” 

  },
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
  },
  setDisabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function (e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    })
  }
}

for (var i = 0; i < types.length; ++i) {
  (function (type) {
    pageObject[type] = function (e) {
      var key = type + 'Size'
      var changedData = {}
      changedData[key] =
        this.data[key] === 'default' ? 'mini' : 'default'
      this.setData(changedData)
    }
  })(types[i])
}

Page(pageObject)