var t = require("../../utils/groupData.js");
// 引入接口地址文件
import { resolveSearch } from './computed/index'
import { requestApi } from '../../api'
import { save } from '../../utils/dataCount'

Page({
  data: {
    grids: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
    inputShowed: !1,
    inputVal: "",
    groupData: t,
    searchKey: "",

    searchCss: false,
    userInfo: '',
    inputShow: false, // input输入框的显示标识
  },
  checkData: function() {
    return "" != this.data.searchKey || (wx.showModal({
      content: "搜索关键词为空",
      showCancel: !1,
      confirmText: "我知道了",
      confirmColor: "#888"
    }), !1);
  },
  searchTap: function() {
    if (this.checkData()) {

      // check输入关键字是否为星座保留字.
      const xingzuoMark = resolveSearch(this.data.searchKey)

      // 解析星座还是解梦
      if (xingzuoMark.mark) {
        const xingzuoEn = xingzuoMark.xingzuo_en || ''

        // 跳转星座详情页.
        wx.navigateTo({
          url: '/pages/constellation/detail_fortune/index?type='+xingzuoEn+''
        })

      } else {
        var t = this.data.searchKey, e = t.indexOf("梦到了");
        -1 != e && (t = t.substr(e + 3));
        var n = t.indexOf("梦到");
        -1 != n && (t = t.substr(n + 2)), wx.navigateTo({
          url: "../detail/detail?key=" + t
        });

      }

      this.setData({
        searchKey: ''
      })
    }
  },
  changeSearchKey: function(t) {
    var e = t.detail.value;
    this.setData({
      searchKey: e
    });
  },
  previewImage: function() {
    wx.previewImage({
      current: "http://r.photo.store.qq.com/psb?/V14TzXDj2u5uJh/ES04HpVqWh2dOXPn5vdNkzoH*chjD2WlCw9ZektX8HM!/r/dFYAAAAAAAAA",
      urls: [ "http://r.photo.store.qq.com/psb?/V14TzXDj2u5uJh/ES04HpVqWh2dOXPn5vdNkzoH*chjD2WlCw9ZektX8HM!/r/dFYAAAAAAAAA" ],
      success: function(t) {
        console.log("success");
      },
      fail: function(t) {
        console.log("fail");
      }
    });
  },
  onLoad: function(t) {

  },
  onReady: function() {},
  onShow: function() {
    // 设置用户基本信息
    const userInfo = wx.getStorageSync('userinfo') || ''
    this.setData({
      userInfo: userInfo
    })

  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},

  searchClick () {
    if (this.data.searchCss) {
      this.searchTap()
    }

    this.setData({
      searchCss: !this.data.searchCss,
      inputShow: true
    })

  },
  backCss () {
    // console.log(123)

    this.setData({
      searchCss: false,
    })

    // 动画结束后，input隐藏.
    setTimeout(() => {
      this.setData({
        inputShow: false
      })
    })

  },

  // 登录相关
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)

    // 用户同意授权，才将数据上传到login接口
    if (e.detail.userInfo) {
      this.stoBaseInfo(e.detail.userInfo)
    }

  },
  // 拼合用户信息和openid等信息，存入storage
  stoBaseInfo(userInfo) {
    // console.log(userInfo)
    const that = this
    let baseInfo = userInfo || {}

    getApp().login((data) => {
      // console.log(data)

      baseInfo.openid = data.original.openid || ''
      baseInfo.session_key = data.original.session_key || ''
      baseInfo.needShare = getApp().data.needShare // 注册成功后，将需要分享解锁的板块存入userinfo中

      // 小程序注册接口
      const url = requestApi.register
      const params = baseInfo

      getApp().ajax({
        url: url,
        type: 'POST',
        para: params,
        login: false,
        success: function (data) {
          // console.log(data)

        },
        fail: function (error) {

        },
        complete: function () {
          that.setData({
            userInfo: baseInfo
          })
          wx.setStorageSync('userinfo', baseInfo)

        }

      })

    })

  },



  onShareAppMessage: function(res) {
    let shareObj = {
      title: "想知道你的梦境预示着什么吗？答案在这里！",
      desc: "想知道你的梦境预示着什么吗？答案在这里！",
      imageUrl: "../../images/share-outimg.jpeg",
      path: "/pages/home/home",
      success: function () {},
      fail: function () {},
      complete: function () {}
    }

    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        const para = {
          type: 1.5 // 该用户是点击分享按钮，分享首页
        }
        save(para) // 统计首页分享数据，存入数据库

      }

    } else if (res.from === 'menu') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        const para = {
          type: 1 // 该用户是点击右上角，分享首页
        }
        save(para) // 统计首页分享数据，存入数据库

      }
    }

    return shareObj;

  }
});