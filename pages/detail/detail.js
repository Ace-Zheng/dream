var a = require("../../utils/data.js");
import { save } from '../../utils/dataCount'

Page({
    data: {
        fromTitleList: !1,
        fromShare: !1,
        isLoading: !0,
        searchKey: "",
        results: [],
        datas: a.dreamsData
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
      let shareObj = {
        title: "想知道你的梦境预示着什么吗？答案在这里！",
        desc: "想知道你的梦境预示着什么吗？答案在这里！",
        // imageUrl: "../../images/share-outimg.jpeg",
        path: "/pages/detail/detail?key="+this.data.searchKey+"",
        success: function () {},
        fail: function () {},
        complete: function () {}
      }

      if (res.from === 'button') {
        // 来自页面内转发按钮
        // console.log(res.target)

        shareObj.success = function () {
          const para = {
            type: 3.5 // 该用户是点击分享按钮，分享详情页
          }
          save(para) // 统计首页分享数据，存入数据库

        }

      } else if (res.from === 'menu') {
        // 来自页面内转发按钮
        // console.log(res.target)

        shareObj.success = function () {
          const para = {
            type: 3 // 该用户是点击右上角，分享分类主页
          }
          save(para) // 统计首页分享数据，存入数据库

        }
      }

      return shareObj;
    },
    onLoad: function(a) {
        this.setData({
            searchKey: a.key || "大风"
        }), a.fromTitleList && this.setData({
            fromTitleList: !0
        }), a.fromShare && this.setData({
            fromShare: !0
        }), this.getData(), wx.setNavigationBarTitle({
            title: this.data.searchKey
        });
    }
});