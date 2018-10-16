// var n = require("../../../utils/titleData.js");
import { requestApi } from '../../../api'


var app = getApp();
Page({
  data: {
    // index: null,
    // titleData: n
    dataList: '', // 列表数据
  },
  onLoad: function(t) {
    app.showLoading()

    this.get_list(t);
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},

  get_list (t) {
    var a = "", n = "", e = "";
    "character" == t.type ? (a = 21, n = 12, e = "星座性格") : (a = 22, n = 20, e = "星座排行")

      wx.setNavigationBarTitle({
        title: e
      });

    var that = this;

    // 获取数据接口
    const url = requestApi.get_data_12
    const params = {
      cid: a,
      start: 1,
      count: n,
    }

    app.ajax({
      url: url,
      type: 'get',
      para: params,
      login: false,
      success: function (t) {
        // console.log(t)

        wx.setStorageSync("list", t.original.data);
        that.setData({
          dataList: t.original.data
        })

      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        app.hideLoading()
      }

    })

    // wx.request({
    //   url: "https://aliyun.zhanxingfang.com/zxf/appclient/constellation.php?act=get",
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   method: "POST",
    //   data: {
    //     cid: a,
    //     page: 1,
    //     page_num: 352
    //   },
    //   success: function(t) {
    //     console.log(t)
    //
    //     // 爬虫存储数据
    //     t.data.data.map((item, key) => {
    //
    //           const url = 'http://127.0.0.1/work-myProject/topay_api_new/api/dream_page/in_data'
    //
    //           getApp().ajax({
    //             url: url,
    //             type: 'POST',
    //             para: item,
    //             login: false,
    //             success: function (t) {
    //               console.log(t)
    //
    //
    //             },
    //             fail: function (error) {
    //               console.log(error)
    //             },
    //             complete: function () {}
    //
    //           })
    //
    //     })
    //
    //   }
    // });

  },



  onShareAppMessage: function() {
    return t.getShareText('星座')
  }
});