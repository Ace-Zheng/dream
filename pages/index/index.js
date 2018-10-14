var t = require("../../utils/groupData.js");

// 引入接口地址文件
import { requestApi } from '../../api'
import { save } from '../../utils/dataCount'

Page({
  data: {
    grids: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
    inputShowed: !1,
    inputVal: "",
    groupData: t,
    searchKey: "",

    userInfo: '',
    shareCardId: '', // 分享解锁的卡片id

    mark0: true, // id=0的卡片
    mark1: true, // id=1的卡片
    mark2: true, // id=2的卡片
    mark3: true, // id=3的卡片
    mark4: true, // id=4的卡片
    mark5: true, // id=5的卡片
    mark6: true, // id=6的卡片
    mark7: true, // id=7的卡片
    mark8: true, // id=8的卡片
    mark9: true, // id=9的卡片
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
      var t = this.data.searchKey, e = t.indexOf("梦到了");
      -1 != e && (t = t.substr(e + 3));
      var n = t.indexOf("梦到");
      -1 != n && (t = t.substr(n + 2)), wx.navigateTo({
        url: "../detail/detail?key=" + t
      });
    }
  },
  changeSearchKey: function(t) {
    var e = t.detail.value;
    this.setData({
      searchKey: e
    });
  },
  itemClick: function(t) {
    console.log(t.currentTarget.id);
    var e = t.currentTarget.id;
    10 != e && 11 != e ? wx.navigateTo({
      url: "../titlelist/titlelist?index=" + e + "&title=" + this.data.groupData[e]
    }) : 10 == e ? wx.showModal({
      title: "关于",
      content: "解梦"
    }) : 11 == e && this.previewImage();

    // 统计那种类别的卡片受欢迎，点击次数多.
    const paraStr = t.currentTarget.id
    const para = {
      type: 2.1 + '&' + paraStr // 该用户是点击分享按钮，分享分类主页
    }
    save(para) // 统计首页分享数据，存入数据库



  },
  itemLockClick: function(t) {
    var typeId = t.currentTarget.id;

    // console.log(typeId);
    this.setData({
      shareCardId: typeId
    })

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
  onShow () {
    // 设置用户基本信息
    const userInfo = wx.getStorageSync('userinfo') || ''
    this.setData({
      userInfo: userInfo
    })

    // 设置type卡片的禁止标识
    // this.setMark(1)

  },

  // 设置type卡片的禁止标识（type：1：页面加载刷新；2：分享卡片刷新）
  setMark (type) {
    const userInfo = wx.getStorageSync('userinfo')

    // 只有分享过后才执行重置卡片状态.
    if (type == 2) {
      const str = 'mark' + this.data.shareCardId

      // 执行重置卡片状态，并清空当前选中的卡片
      this.setData({
        [str]: true,
        shareCardId: ''
      })

    }

    if (userInfo.needShare && userInfo.needShare.length) {
      userInfo.needShare.map((item) => {
        const str = 'mark' + item

        this.setData({
          [str]: false
        })

      })

    }

  },

  onReady: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},

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

          // 设置卡片的加锁状态.
          // that.setMark(1)

        }

      })

    })

  },

  onShareAppMessage: function(res) {
    const that = this

    let shareObj = {
      title: "想知道你的梦境预示着什么吗？答案在这里！",
      desc: "想知道你的梦境预示着什么吗？答案在这里！",
      imageUrl: "../../images/share-outimg-2.jpeg",
      path: "/pages/index/index",
      success: function () {},
      fail: function () {},
      complete: function () {}
    }

    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        // 区分不同card分享还是直接页面右下角分享按钮分享.
        // const paraStr = that.data.shareCardId ? '&' + that.data.shareCardId : ''
        const para = {
          type: 2.5 // 该用户是点击分享按钮，分享分类主页
        }
        save(para) // 统计首页分享数据，存入数据库

        // 点击分享解锁，分享成功后，解锁加锁的板块逻辑.
        if (that.data.shareCardId) {
          const shareCardId = that.data.shareCardId
          const userinfo = wx.getStorageSync('userinfo')
          const needShareArr = userinfo.needShare

          if (needShareArr.indexOf(shareCardId) >= 0) {
            needShareArr.splice(needShareArr.indexOf(shareCardId), 1)
            userinfo.needShare = needShareArr

            wx.setStorageSync('userinfo', userinfo)

            that.setData({
              ['userInfo.needShare']: userinfo.needShare, // 改变当前数据的needShare值
            })

            // 设置卡片的展示标识
            // that.setMark(2)
          }

        }

      }

    } else if (res.from === 'menu') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        const para = {
          type: 2 // 该用户是点击右上角，分享分类主页
        }
        save(para) // 统计首页分享数据，存入数据库

      }
    }

    return shareObj;

  }
});