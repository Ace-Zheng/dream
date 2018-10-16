// var a = require("../../utils/data.js");
// import { save } from '../../../utils/dataCount'
const app = getApp()
import WxParse from '../../../utils/wxParse/wxParse.js';

Page({
  data: {
    fromTitleList: !1,
    fromShare: !1,
    isLoading: true,
    searchKey: "",
    results: [],
    // datas: a.dreamsData

    contentResult: '', // 星座文章详情页内容.

  },
  onLoad: function(a) {
    wx.setNavigationBarTitle({
      title: a.title || ''
    });

    var that = this;
    // 富文本编译(注意content，和wxml中的名称一样)
    const data = wx.getStorageSync('list').find(item => item.id == a.id)
    WxParse.wxParse('content', 'html', data.content, that, 5);

    this.setData({
      isLoading: false,
      searchKey: a.title,
      contentResult: data.content
    })

  },
  getData: function() {
    var a = [], t = this, e = t.data.searchKey, s = t.data.datas;
    wx.showLoading({
      title: "正在查询中",
      mask: !0
    });
    for (var i in s) {
      var r = s[i];
      -1 != r.title.indexOf(e) && a.push(r);
    }
    t.setData({
      isLoading: !1,
      results: a
    }), setTimeout(function() {
      wx.hideLoading();
    }, 300);
  },
  onShareAppMessage: function(res) {
    return app.getShareText('星座');
  },

});