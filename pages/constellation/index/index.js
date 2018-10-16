import { requestApi } from '../../../api'
import { save } from '../../../utils/dataCount'

var app = getApp();
Page({
  data: {
    list: app.data.constellationList,
    userInfo: '', // 用户的登录信息
  },
  onLoad: function(t) {},
  onShow () {
    // 设置用户基本信息
    const userInfo = wx.getStorageSync('userinfo') || ''
    this.setData({
      userInfo: userInfo
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

    app.login((data) => {
      // console.log(data)

      baseInfo.openid = data.original.openid || ''
      baseInfo.session_key = data.original.session_key || ''
      baseInfo.needShare = getApp().data.needShare // 注册成功后，将需要分享解锁的板块存入userinfo中

      // 小程序注册接口
      const url = requestApi.register
      const params = baseInfo

      app.ajax({
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
      title: "水逆？不能够！最全的星座运势分析请点我🙃",
      desc: "水逆？不能够！最全的星座运势分析请点我🙃",
      path: "/pages/constellation/index/index",
      success: function () {},
      fail: function () {},
      complete: function () {}
    }

    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        const para = {
          type: 4.5 // 该用户是点击分享按钮，分享首页
        }
        save(para) // 统计首页分享数据，存入数据库

      }

    } else if (res.from === 'menu') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        const para = {
          type: 4 // 该用户是点击右上角，分享首页
        }
        save(para) // 统计首页分享数据，存入数据库

      }
    }

    return shareObj;
  }
});